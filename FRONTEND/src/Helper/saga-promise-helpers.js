
export const startActionWithPromise = (action, params, dispatch) => {
    return withPromiseAndDispath(action, { ...params }, dispatch);
}

export const withPromiseAndDispath = (func, params, dispacth) =>
    new Promise((resolve, reject) =>
        dispacth(func({ ...params, resolve, reject }))
    );

function resoveResult(action, result) {
    if (action?.resolve && typeof action.resolve === 'function') {
        action.resolve(result);
    }
}

function rejectResult(action, result) {
    if (action?.reject && typeof action.resolve === 'function') {
        action.resolve(result)
    }
}

export function sagaPromise(handler) {
    return function* (action) {
        try {
            const newAction = {
                ...action,
                payload: Object.keys(action.payload).filter(key => (key != "resolve") && (key != "reject"))
                    .reduce((obj, key) => {
                        obj[key] = action.payload[key];
                        return obj;
                    }, {})
            };
            const result = yield* handler(newAction);
            resoveResult(action?.payload, result);
        } catch (error) {
            rejectResult(action?.payload, error);
        }
    }
}