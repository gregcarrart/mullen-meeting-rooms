import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { connectToStores } from 'fluxible-addons-react';

import AddBookingActions from 'actions/AddBookingActions';
import ChangeTimeActions from 'actions/ChangeTimeActions';
import ChangeDurationActions from 'actions/ChangeDurationActions';
import ResetTimeActions from 'actions/ResetTimeActions';
import ResetDateActions from 'actions/ResetDateActions';
import ResetDurationActions from 'actions/ResetDurationActions';
import AddBookingStore from 'stores/AddBookingStore';
import DateTime from 'components/DateTime';
import TimePicker from 'react-time-picker';

class AddBooking extends React.Component {

    constructor (props) {
        super(props);
        this.onChange = ((value) => {
            this.context.executeAction(ChangeTimeActions, {time: value});
        });
        this.onChangeDuration = ((value) => {
            this.context.executeAction(ChangeDurationActions, {duration: value});
        });
        this.handleSubmit = ((event) => {
            event.preventDefault();
            let contact = this.refs.emailTextField.value;
            this.context.executeAction(AddBookingActions,
                {
                    contact: contact,
                    currentRoom: this.props.params.roomName,
                    duration: this.props.bookingState.currentDuration,
                    time: this.props.bookingState.currentTime,
                    date: this.props.bookingState.momentDate
                });
        });
        this.value = null;
    }

    componentDidMount () {

    }

    componentWillUnmount () {
        this.context.executeAction(ResetTimeActions, {});
        this.context.executeAction(ResetDateActions, {});
        this.context.executeAction(ResetDurationActions, {});
    }

    render () {
        this.value = this.props.bookingState.currentTime;
        this.duration = this.props.bookingState.currentDuration;

        return (
            <div className='container'>
                <div className='row'>
                    On:
                    <DateTime />
                    At:
                    <TimePicker
                        value={this.value}
                        onChange={this.onChange}
                    />
                    For:
                    <TimePicker
                        value={this.duration}
                        onChange={this.onChangeDuration}
                    />
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className='form-group'>
                        <label className='control-label'>Leader Email</label>
                        <input type='email' className='form-control' ref='emailTextField' required/>
                      </div>
                      <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

AddBooking.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
};

AddBooking = connectToStores(AddBooking, ['AddBookingStore'], (context) => ({
    bookingState: context.getStore('AddBookingStore').getState(),
}));

export default AddBooking;
