
export default function getBookings(actionContext, payload, done) {
    actionContext.dispatch('GET_BOOKINGS', payload);
    done();
}
