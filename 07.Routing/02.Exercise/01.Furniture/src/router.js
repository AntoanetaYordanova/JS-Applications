const registry = {};

function registerHandler(url, ...handlers) {
    registry[url] = handlers;
}

function handleRequest(handlers) {
    const ctx = {};

    callNext()

    function callNext() {
        const handler = handlers.shift();

        if(typeof handler == 'function') {
            handler(ctx, callNext);
        }
    }
}