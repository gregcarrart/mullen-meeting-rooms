import BaseStore from 'fluxible/addons/BaseStore';
import $ from 'jquery';

class RoomStore extends BaseStore {
    static storeName = 'RoomStore';

    static handlers = {
        GET_ROOMS: 'onGetRooms',
        UDPATE_DATE: 'onUpdateDate',
        GET_BOOKINGS: 'onGetBookings'
    }

    constructor (dispatcher) {
        super(dispatcher);
        this.rooms = null;
        this.bookings = null;
    }

    onGetRooms () {
        $.ajax({url: 'https://api.myjson.com/bins/5ckj1'})
            .done((data) => {
                this.rooms = data;
                this.emitChange();
            });
    }

    onUpdateDate () {
        $.ajax({url: 'https://api.myjson.com/bins/5ckj1'})
            .done((data) => {
                this.rooms = data;
                this.emitChange();
            });
    }

    onGetBookings () {
        $.ajax({url: '/api/bookings'})
            .done((data) => {
                this.bookings = data;
                this.emitChange();
            })
    }

    getState () {
        return {
            rooms: this.rooms,
            bookings: this.bookings
        }
    }

    dehydrate () {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate (state) {
        this.rooms = state.rooms;
        this.bookings = state.bookings;
    }
}

export default RoomStore;
