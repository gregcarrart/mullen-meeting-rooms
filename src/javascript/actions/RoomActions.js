
export default function getRooms(actionContext, payload, done) {
    actionContext.dispatch('GET_ROOMS', payload);
    done();
}
