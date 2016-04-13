import React from 'react';
import { Link } from 'react-router';
import FooterActions from 'actions/FooterActions';
import FooterStore from 'stores/FooterStore';
import { connectToStores } from 'fluxible-addons-react';

class Footer extends React.Component {
    componentDidMount () {
        this.context.executeAction(FooterActions, {});
    }

    render () {
        let leaderboardRooms = null;

        if (this.props.footerState.topRooms) {
            leaderboardRooms = this.props.footerState.topRooms.map((room) => {

                let roomName = (room.room).replace(' ', '-').toLowerCase();
                return (
                    <li key={room.id}>
                        <Link to={`/rooms/${roomName}`}>
                            {room.room}
                        </Link>
                    </li>
                );
            });
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-5'>
                        <div className='lead'><strong>Information</strong></div>
                    </div>
                    <div className='col-sm-7 hidden-xs'>
                        <h3 className='lead'><strong>Top 5 Rooms</strong></h3>
                        <ul className='list-inline'>
                            {leaderboardRooms}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

Footer.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
};

Footer = connectToStores(Footer, ['FooterStore'], (context) => ({
    footerState: context.getStore('FooterStore').getState(),
}));

export default Footer;
