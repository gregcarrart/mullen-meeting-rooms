
export default function resetDuration(actionContext, payload, done) {
    actionContext.dispatch('RESET_DURATION', payload);

    done();
}
