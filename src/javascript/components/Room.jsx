import React from 'react';
import RoomActions from 'actions/RoomActions';
import BookingActions from 'actions/BookingActions';
import RoomStore from 'stores/RoomStore';
import { Link, IndexLink } from 'react-router';
import { connectToStores } from 'fluxible-addons-react';

class Room extends React.Component {

    componentDidMount () {
        this.context.executeAction(RoomActions, {});
        this.context.executeAction(BookingActions, {});
    }

    render() {
        let room = null;
        let bookingsArray = [];
        let bookings = null;
        let roomName = null;

        if (this.props.roomState.rooms && this.props.roomState.bookings) {
            room = this.props.roomState.rooms.map((room) => {
                if (this.props.params.roomName === room.room.toLowerCase()) {
                    roomName = room.room.toLowerCase();
                    this.props.roomState.bookings.map((booking) => {
                        if (booking.roomId === room.id) {
                            bookingsArray.push(booking);
                        }
                    });
                    return (
                        <div key={room.id}>
                            <h1>{room.room}</h1>
                            <div>{room.location}</div>
                            <div>{room.size}</div>
                            <div>
                                <Link to={`/rooms/${roomName}/add`}>New Booking</Link>
                            </div>
                        </div>
                    )
                }
            });
        }

        if (bookingsArray.length > 0) {
            bookings = bookingsArray.map((booking, i) => {
                return (
                    <div key={i}>
                        <div>{booking.date}</div>
                        <div>{booking.time}</div>
                        <div>{booking.contact}</div>
                    </div>
                );
            });
        }

        return (
            <div>
                <div>
                    {room}
                </div>
                <h3>Upcoming Bookings</h3>
                <div>
                    {bookings}
                </div>
            </div>
        );

    }
}

Room.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
};

Room = connectToStores(Room, ['RoomStore'], (context) => ({
    roomState: context.getStore('RoomStore').getState(),
}));

export default Room;
