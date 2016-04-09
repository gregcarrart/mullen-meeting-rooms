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
                <div className='date-format'>
                    {this.props.appState.formatDate}
                </div>
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

DateTime = connectToStores(DateTime, ['ApplicationStore'], (context) => ({
    appState: context.getStore('ApplicationStore').getState(),
}));

export default DateTime;
