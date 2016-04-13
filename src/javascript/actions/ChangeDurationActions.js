
export default function changeDuration(actionContext, payload, done) {
    actionContext.dispatch('CHANGE_DURATION', payload);
    done();
}
