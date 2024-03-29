import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Application from 'components/Application';
import Home from 'components/Home';
import About from 'components/About';
import Room from 'components/Room';
import AddBooking from 'components/AddBooking';
import NotFound from 'components/NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="rooms/:roomName" component={Room}/>
        <Route path="rooms/:roomName/add" component={AddBooking} />
        <Route path="*" component={NotFound}/>
    </Route>
);
