import BaseStore from 'fluxible/addons/BaseStore';
import _ from 'lodash';
import $ from 'jquery';

class CurrentRoomStore extends BaseStore {
    static storeName = 'CurrentRoomStore';

    static handlers = {
        GET_ROOM: 'onGetRoom',
        UDPATE_DATE: 'onUpdateDate',
    }

    constructor (dispatcher) {
        super(dispatcher);
        this.currentRoom = null;
    }

    onGetRoom (room) {
        $.ajax({url: '../json/data.json'})
            .done((data) => {
                data.map((item) => {
                    if (item.room.toLowerCase() == room.roomName) {
                        this.currentRoom = item;
                        this.emitChange();
                    }
                });
            });
    }

    onUpdateDate () {
        $.ajax({url: '../json/data.json'})
            .done((data) => {
                this.rooms = data;
                this.emitChange();
            });
    }

    getState () {
        return {
            currentRoom: this.currentRoom
        }
    }

    dehydrate () {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate (state) {
        this.currentRoom = state.currentRoom;
    }
}

export default CurrentRoomStore;
