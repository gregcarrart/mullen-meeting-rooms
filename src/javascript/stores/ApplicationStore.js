import BaseStore from 'fluxible/addons/BaseStore';
import $ from 'jquery';
import moment from 'moment';

class ApplicationStore extends BaseStore {

    static storeName = 'ApplicationStore';

    static handlers = {
        DO_STUFF: 'onDoStuff',
        UPDATE_DATE: 'onUpdateDate'
    };

    constructor (dispatcher) {
        super(dispatcher);
        this.stuff = null;
        this.formatDate = this.getFormatDate();
        this.momentDate = this.getMomentDate();
    }

    onDoStuff (stuff) {
        this.stuff = stuff;
        this.emitChange();
    }

    onUpdateDate (date) {
        this.momentDate = date.date;
        this.formatDate = date.date.format("MMM Do YY");
        this.emitChange();
    }

    getFormatDate () {
        return moment().format("MMM Do YY");
    }

    getMomentDate () {
        return moment();
    }

    getState () {
        return {
            stuff: this.stuff,
            formatDate: this.formatDate,
            momentDate: this.momentDate
        };
    }

    dehydrate () {
        return this.getState();
    }

    rehydrate (state) {
        this.stuff = state.stuff;
        this.formatDate = state.formatDate;
        this.momentDate = state.momentDate;
    }

}

export default ApplicationStore;
