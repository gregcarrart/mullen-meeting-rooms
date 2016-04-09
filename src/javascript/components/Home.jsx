import React from 'react';
import RoomDashboard from 'components/RoomDashboard';
import DateTime from 'components/DateTime';

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Rooms</h1>
                <DateTime />
                <RoomDashboard />
            </div>
        );
    }
}
