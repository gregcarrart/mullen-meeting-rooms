import BaseStore from 'fluxible/addons/BaseStore';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';

class AddBookingStore extends BaseStore {
    static storeName = 'AddBookingStore';

    static handlers = {
        ADD_BOOKING: 'onAddBooking',
        CHANGE_DATE: 'onChangeDate',
        CHANGE_TIME: 'onChangeTime',
        CHANGE_DURATION: 'onDurationChange',
        RESET_TIME: 'onResetTime',
        RESET_DATE: 'onResetDate',
        RESET_DURATION: 'onResetDuration'
    }

    constructor (dispatcher) {
        super(dispatcher);
        this.currentTime = '9:00 AM';
        this.currentDuration = '1:00';
        this.momentDate = this.getMomentDate();
    }

    onAddBooking (data) {
        $.ajax({
            type: 'POST',
            url: '/api/bookings',
            data: {
                room: data.currentRoom,
                contact: data.contact
            }
        })
        .done((data) => {
            console.log(data.message);
        })
        .fail((jqXhr) => {
            console.log('FAIL');
        });
    }

    getMomentDate () {
        return moment();
    }

    onChangeTime (time) {
        this.currentTime = time.time;
        this.emitChange();
    }

    onDurationChange (duration) {
        this.currentDuration = duration.duration;
        this.emitChange();
    }

    onResetDate () {
        this.momentDate = this.getMomentDate();
        this.emitChange
    }

    onResetTime () {
        this.currentTime = '9:00 AM';
        this.emitChange();
    }

    onResetDuration () {
        this.currentDuration = '1:00';
        this.emitChange();
    }

    onChangeDate (date) {
        this.momentDate = date.date;
        this.emitChange();
    }

    getState () {
        return {
            currentTime: this.currentTime,
            currentDuration: this.currentDuration,
            momentDate: this.momentDate
        }
    }

    dehydrate () {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate (state) {
        this.currentTime = state.currentTime;
        this.currentDuration = state.currentDuration;
        this.momentDate = state.momentDate;
    }
}

export default AddBookingStore;
