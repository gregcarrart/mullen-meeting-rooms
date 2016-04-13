
export default function getRoom(actionContext, payload, done) {
    actionContext.dispatch('GET_ROOM', payload);
    done();
}
