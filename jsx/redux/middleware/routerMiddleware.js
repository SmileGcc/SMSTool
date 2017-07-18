import createHistory from 'history/createHashHistory';
import {routerMiddleware} from 'react-router-redux';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

export {
    history,
    historyMiddleware
};