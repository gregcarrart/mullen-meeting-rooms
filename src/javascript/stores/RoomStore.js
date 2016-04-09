import BaseStore from 'fluxible/addons/BaseStore';
import $ from 'jquery';

class RoomStore extends BaseStore {
    static storeName = 'RoomStore';

    static handlers = {
        GET_ROOMS: 'onGetRooms',
        UDPATE_DATE: 'onUpdateDate'
    }

    constructor (dispatcher) {
        super(dispatcher);
        this.rooms = null;
    }

    onGetRooms () {
        $.ajax({url: '../json/data.json'})
            .done((data) => {
                this.rooms = data;
                this.emitChange();
            });
    }

    onUpdateRooms () {
        $.ajax({url: '../json/data.json'})
            .done((data) => {
                this.rooms = data;
                this.emitChange();
            });
    }

    getState () {
        return {
            rooms: this.rooms
        }
    }

    dehydrate () {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate (state) {
        this.rooms = state.rooms;
    }
}

export default RoomStore;
