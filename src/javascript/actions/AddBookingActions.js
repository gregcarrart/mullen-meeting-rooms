
export default function addBooking(actionContext, payload, done) {
    actionContext.dispatch('ADD_BOOKING', payload);
    done();
}
