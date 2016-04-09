
export default function getTopRooms(actionContext, payload, done) {
    actionContext.dispatch('GET_TOP_ROOMS', payload);
    done();
}
