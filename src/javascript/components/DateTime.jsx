import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import DateTimeActions from 'actions/DateTimeActions';
import ApplicationStore from 'stores/ApplicationStore';
import { connectToStores } from 'fluxible-addons-react';

class DateTime extends React.Component {

    constructor () {
        super();
        this.handleChange = (date) => {
            this.context.executeAction(DateTimeActions, {date: date});
        }
    }

    render () {
        return (
            <div className='date-container'>
                <div className='date-picker'>
                    <DatePicker
                        selected={this.props.appState.momentDate}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

DateTime.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
};

DateTime = connectToStores(DateTime, ['AddBookingStore'], (context) => ({
    appState: context.getStore('AddBookingStore').getState(),
}));

export default DateTime;
