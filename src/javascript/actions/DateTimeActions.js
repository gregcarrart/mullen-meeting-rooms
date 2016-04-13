
export default function updateDate(actionContext, payload, done) {
    actionContext.dispatch('CHANGE_DATE', payload);
    done();
}
