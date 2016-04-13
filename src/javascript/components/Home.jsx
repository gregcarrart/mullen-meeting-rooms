import React from 'react';
import RoomDashboard from 'components/RoomDashboard';

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Rooms</h1>
                <RoomDashboard />
            </div>
        );
    }
}
