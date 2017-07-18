import {applyMiddleware, createStore, compose} from 'redux';
import * as reduxLoop from 'redux-loop';
import middleware from './middleware';
import reducer from './reducer';

const enhancers = [
    applyMiddleware(...middleware),
    reduxLoop.install()
];

/* eslint-disable no-undef */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

// create the store
const store = createStore(
    reducer,
    enhancer
);

export default store;
