
export default function resetTime(actionContext, payload, done) {
    actionContext.dispatch('RESET_TIME', payload);

    done();
}
