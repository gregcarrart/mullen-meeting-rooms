
export default function changeTime(actionContext, payload, done) {
    actionContext.dispatch('CHANGE_TIME', payload);
    done();
}
