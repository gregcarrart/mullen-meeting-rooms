
export default function resetDate(actionContext, payload, done) {
    actionContext.dispatch('RESET_DATE', payload);

    done();
}
