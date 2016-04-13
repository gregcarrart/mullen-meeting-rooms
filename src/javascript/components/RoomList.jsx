import React from 'react';
import { Link } from 'react-router';
import RoomActions from 'actions/RoomActions';
import RoomStore from 'stores/RoomStore';
import { connectToStores } from 'fluxible-addons-react';
import $ from 'jquery';

class RoomList extends React.Component {

    componentDidMount () {
        this.context.executeAction(RoomActions, {});
    }

    render () {
        let allRooms = null;
        if (this.props.roomState.rooms) {
            allRooms = this.props.roomState.rooms.map((room) => {
                let roomName = (room.room).replace(' ', '-').toLowerCase();
                return (
                    <li className='room-list' key={room.id}>
                        <Link to={'/rooms/' + roomName}>
                            <img className='thumb-md' src={room.image} />
                            <div className='room-meta'>
                                <div className='room-title'>{room.room}</div>
                                <div className='room-location'>{room.location}</div>
                            </div>
                        </Link>
                    </li>
                );
            });
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div>
                        <ul className='list-inline'>
                            {allRooms}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

RoomList.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
};

RoomList = connectToStores(RoomList, ['RoomStore'], (context) => ({
    roomState: context.getStore('RoomStore').getState(),
}));

export default RoomList;
