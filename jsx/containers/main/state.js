import {fromJS} from 'immutable';
import net from '../../service/net';
import asyncStorage from '../../service/asyncStorage';

const initialState = fromJS({
    sendResult: {},
    templateList: [],
    addTemplateResult: false,
    delTemplateResult: false
});

// Actions
const SEND_SMS = 'MAIN/SEND_SMS';
const GET_TEMPLATE = 'MAIN/GET_TEMPLATE';
const ADD_TEMPLATE = 'MAIN/ADD_TEMPLATE';
const DEL_TEMPLATE = 'MAIN/DEL_TEMPLATE';


// Action creators
export let MainActions = {
    sendSMS: function (telephone) {
        return {
            type: SEND_SMS,
            payload: net.sendSMS(telephone)
        };
    },
    getTemplate: function () {
        let key = 'sms_template';
        return {
            type: GET_TEMPLATE,
            payload: asyncStorage.getStorage(key)
        };
    },
    addTemplate: function (value) {
        let key = 'sms_template';
        return {
            type: ADD_TEMPLATE,
            payload: asyncStorage.addStorage(key, value)
        };
    },
    deleteTemplate: function (value) {
        let key = 'sms_template';
        return {
            type: DEL_TEMPLATE,
            payload: asyncStorage.alterStorage(key, value)
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
        case GET_TEMPLATE:
            return state.set('templateList', fromJS(action.payload));
        case ADD_TEMPLATE:
            if(!action.payload || !action.payload.status){
                return state.set('addTemplateResult', false);
            }
            state = state.set('addTemplateResult', true);
            return state.set('templateList', fromJS(action.payload.result));
        case DEL_TEMPLATE:
            console.log(action.payload)
            if(!action.payload || !action.payload.status){
                return state.set('delTemplateResult', false);
            }
            state = state.set('delTemplateResult', true);
            return state.set('templateList', fromJS(action.payload.result));
        default:
            return state;
    }
}
