import React, { PropTypes } from 'react';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import { connectToStores } from 'fluxible-addons-react';

class Application extends React.Component {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

    render () {
        return (
            <div>
                <nav>
                    <Navigation />
                </nav>
                <main>
                    {React.cloneElement(this.props.children, { appState: this.props.appState })}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }

}

Application = connectToStores(Application, ['ApplicationStore'], (context) => ({
    appState: context.getStore('ApplicationStore').getState(),
}));

export default Application;
