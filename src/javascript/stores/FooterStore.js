import BaseStore from 'fluxible/addons/BaseStore';
import $ from 'jquery';
import _ from 'lodash';

class FooterStore extends BaseStore {
    static storeName = 'FooterStore';

    static handlers = {
        GET_TOP_ROOMS: 'onGetTopRooms',
    }

    constructor (dispatcher) {
        super(dispatcher);
        this.topRooms = null;
    }

    onGetTopRooms () {
        $.ajax({url: '../json/data.json'})
            .done((data) => {
                let sortedData = _.sortBy(data, function(o) { return o.bookingsCount * -1; });
                this.topRooms = sortedData.slice(0, 5);
                this.emitChange();
            });
    }

    getState () {
        return {
            topRooms: this.topRooms
        }
    }

    dehydrate () {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate (state) {
        this.topRooms = state.topRooms;
    }
}

export default FooterStore;
