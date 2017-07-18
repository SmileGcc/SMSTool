exports.__esModule = true;

let _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { let source = arguments[i]; for (let key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = promiseMiddleware;

let _fluxStandardAction = require('flux-standard-action');

function isPromise(val) {
    return val && typeof val.then === 'function';
}

function promiseMiddleware(_ref) {
    let dispatch = _ref.dispatch;

    return function (next) {
        return function (action) {
            if (!_fluxStandardAction.isFSA(action)) {
                return isPromise(action) ? action.then(dispatch) : next(action);
            }

            return isPromise(action.payload) ? action.payload.then(function (result) {
                return dispatch(_extends({}, action, { payload: result }));
            }, function (error) {
                // if(!action.payload.type || action.payload.type !== 'alipay'){
                //     window.ap.showToast({
                //         content: error.message,
                //         duration: 2000
                //     });
                // }
                return dispatch(_extends({}, action, { payload: error, error: true }));
            }) : next(action);
        };
    };
}

module.exports = exports['default'];