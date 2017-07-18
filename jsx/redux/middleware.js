// import promiseMiddleware from 'redux-promise';
import promiseMiddleware from './middleware/promiseMiddleware';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware';
// import {historyMiddleware} from './middleware/routerMiddleware';

export default [
    promiseMiddleware,
    thunkMiddleware,
    loggerMiddleware
];