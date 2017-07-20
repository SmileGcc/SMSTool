import {fromJS} from 'immutable';
import net from '../../service/net';
import asyncStorage from '../../service/asyncStorage';
import sms from '../../service/sms';

const initialState = fromJS({
    sendStatus: false,
    sendResponse: '',
    templateList: [],
    addTemplateStatus: false,
    delTemplateStatus: false
});

// Actions
const SEND_SMS = 'MAIN/SEND_SMS';
const GET_TEMPLATE = 'MAIN/GET_TEMPLATE';
const ADD_TEMPLATE = 'MAIN/ADD_TEMPLATE';
const DEL_TEMPLATE = 'MAIN/DEL_TEMPLATE';


// Action creators
export let MainActions = {
    sendSMS: function (telephone, content) {
        return {
            type: SEND_SMS,
            payload: sms.sendSMS(telephone, content)
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
            console.log(111111);
            console.log(action.payload);
            if(!action.payload || !action.payload.status){
                state = state.set('sendStatus', false);
                return state.set('sendResponse', action.payload.result);
            }
            state = state.set('sendStatus', true);
            return state.set('sendResponse', action.payload.result);
        case GET_TEMPLATE:
            return state.set('templateList', fromJS(action.payload));
        case ADD_TEMPLATE:
            if(!action.payload || !action.payload.status){
                return state.set('addTemplateStatus', false);
            }
            state = state.set('addTemplateStatus', true);
            return state.set('templateList', fromJS(action.payload.result));
        case DEL_TEMPLATE:
            console.log(action.payload)
            if(!action.payload || !action.payload.status){
                return state.set('delTemplateStatus', false);
            }
            state = state.set('delTemplateStatus', true);
            return state.set('templateList', fromJS(action.payload.result));
        default:
            return state;
    }
}
