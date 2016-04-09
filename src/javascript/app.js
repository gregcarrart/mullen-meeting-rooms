import Fluxible from 'fluxible';
import { PropTypes } from 'react';
import Routes from 'components/Routes.jsx';
import ApplicationStore from 'stores/ApplicationStore';
import RoomStore from 'stores/RoomStore';
import FooterStore from 'stores/FooterStore';

import assetUrl from 'libs/assetUrl';

const app = new Fluxible({
    component: Routes,
});

app.plug(assetUrl);

app.customContexts = {
    assetUrl: PropTypes.func.isRequired,
    siteUrl: PropTypes.func.isRequired,
};

app.registerStore(ApplicationStore);
app.registerStore(RoomStore);
app.registerStore(FooterStore);

export default app;
