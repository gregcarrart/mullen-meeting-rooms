
export default function updateDate(actionContext, payload, done) {
    actionContext.dispatch('UPDATE_DATE', payload);
    done();
}
