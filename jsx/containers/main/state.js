import {fromJS} from 'immutable';
import net from '../../service/net';

const initialState = fromJS({
    sendResult: {},
    test: ''
});

// Actions
const SEND_SMS = 'MAIN/SEND_SMS';
const TEST = 'MAIN/TEST';


// Action creators
export let MainActions = {
    sendSMS: function (telephone) {
        return {
            type: SEND_SMS,
            payload: net.sendSMS(telephone)
        };
    },
    test: function (telephone) {
        return {
            type: TEST,
            payload: net.test(telephone)
        };
    }

};


// Reducer
export default function MainReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SEND_SMS:
            if (action.payload) {
                return state.set('sendResult', fromJS(action.payload));
            }
            return state;
        case TEST:
            if (action.payload) {
                return state.set('test', fromJS(action.payload));
            }
            return state;
        default:
            return state;
    }
}
