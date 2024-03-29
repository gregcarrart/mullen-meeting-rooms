import path from 'path';
import d from 'debug';
import express from 'express';
//import config from 'config';
import expressState from 'express-state';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import request from 'request';
import mongoose from 'mongoose';
import async from 'async';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { provideContext } from 'fluxible-addons-react';
import app from './app';
import Html from 'components/Html.jsx';

// Models
import Room from '../../server/models/Room.js';
import Booking from '../../server/models/Booking.js';

// Routing
import { RouterContext, match } from 'react-router';
import routes from 'components/Routes.jsx';
import { createMemoryHistory } from 'react-router';

// config
import config from '../../config/dev';


import fetchRouteData from 'utils/fetchRouteData';

const debug = d('Server');
const server = express();

// //Detect NODE_ENV
// switch(config.util.getEnv('NODE_ENV')){
//     case 'dev':
//         console.log('yo');
//         let configDB = config.get('dev');
//         mongoose.connect(configDB.url);
//
//         break;
//
//     case 'production':
//
//         mongoose.connect(process.env.MONGO_DB);
//
//         break;
//
//     default:
//         console.log('env error');
// }

if (process.env.MONGO_DB) {
    mongoose.connect(process.env.MONGO_DB);
} else {
    //let configDB = config.get('dev');
    mongoose.connect(config.dev.url);
}

// mongoose.connect(config.dev.url);
// mongoose.connection.on('error', function() {
//   console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
// });

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', express.static(path.resolve('./build')));

server.get('/api/bookings', function(req, res) {
    Booking.find({}, function(err, bookings) {
        res.send(bookings);
    });
});

server.post('/api/bookings', function(req, res) {
    var booking = new Booking({
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        contact: req.body.contact,
        room: req.body.room
    });

    booking.save(function(err) {
        if (err) {
            console.log(err);
            return;
        };
        res.send({message: 'Booking has been created!'});
    });
});

expressState.extend(server);

server.use((req, res) => {
    const location = createMemoryHistory().createLocation(req.url);
    const context = app.createContext({
        env: process.env.NODE_ENV || 'local',
        siteUrl: process.env.SITE_URL || `${req.protocol}://${req.hostname}`,
        // Uncomment this code to specify where on S3 remote assets are stored
        // aws: {
        //     bucket: process.env.S3_BUCKET || 'madeinhaus',
        //     prefix: process.env.S3_PREFIX || 'react-flux-gulp-starter',
        //     folder: process.env.S3_PATH || process.env.NODE_ENV || false,
        //     urlHash: process.env.URL_HASH || false,
        //     cloudfront: process.env.CLOUDFRONT_URL || false,
        //     bypassCdn: req.query.bypass || false
        // }
    });

    match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps === null) {
            res.status(404).send('Not found');
        } else {
            fetchRouteData(context, renderProps)
                .then(() => {
                    const appState = app.dehydrate(context);
                    appState.env = process.env.NODE_ENV || 'local';
                    res.expose(appState, 'App');

                    const props = Object.assign(
                                        {},
                                        renderProps,
                                        { context: context.getComponentContext() }
                                    );

                    const RouterComponent = provideContext(RouterContext, app.customContexts);
                    const HtmlComponent = provideContext(Html, app.customContexts);

                    const markup = ReactDOMServer.renderToString(
                                        React.createElement(RouterComponent, props)
                                    );

                    const html =
                        ReactDOMServer.renderToStaticMarkup(
                            React.createElement(HtmlComponent, {
                                title: 'mullenlowe rooms',
                                context: context.getComponentContext(),
                                state: res.locals.state,
                                markup,
                                location,
                            }
                        ));

                    res.send(`<!DOCTYPE html>${html}`);
                })
                .catch(err => {
                    res.status(500).send(err.stack);
                });
        }
    });
});

const port = process.env.PORT || 3000;
const instance = server.listen(port, () => {
    debug(`Listening on port ${port}`);

    process.on('SIGTERM', () => {
        debug('Received SIGTERM, shutting down');

        instance.close(() => {
            debug('Server stopped successfully');
            process.exit(0);
        });

        setTimeout(() => {
            debug('Server didn\'t stop in top, terminating');
            process.exit(0);
        }, 9.9 * 1000);
    });
});
