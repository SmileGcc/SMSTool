import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop';
import main from '../containers/main/state';

const reducers = {
    main
};

const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
    reducers,
    immutableStateContainer,
    getImmutable,
    setImmutable
);

export default function mainReducer(state, action) {
    // const [nextState, effects] = action.type === RESET_STATE ? namespacedReducer(action.payload, action) : namespacedReducer(state || void 0, action);

    const [nextState, effects] = namespacedReducer(state || void 0, action);

    // enforce the state is immutable
    return loop(fromJS(nextState), effects);
}
