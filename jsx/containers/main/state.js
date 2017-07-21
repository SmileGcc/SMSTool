import {fromJS} from 'immutable';
import net from '../../service/net';
import asyncStorage from '../../service/asyncStorage';
import sms from '../../service/sms';

const initialState = fromJS({
    sendStatus: false,
    sendResponse: '',
    templateList: [],
    addTemplateStatus: false,
    delTemplateStatus: false,
    accountList: [],
    addAccountStatus: false,
    delAccountStatus: false
});

// Actions
const SEND_SMS = 'MAIN/SEND_SMS';
const GET_TEMPLATE = 'MAIN/GET_TEMPLATE';
const ADD_TEMPLATE = 'MAIN/ADD_TEMPLATE';
const DEL_TEMPLATE = 'MAIN/DEL_TEMPLATE';
const GET_ACCOUNT = 'MAIN/GET_ACCOUNT';
const ADD_ACCOUNT = 'MAIN/ADD_ACCOUNT';
const DEL_ACCOUNT = 'MAIN/DEL_ACCOUNT';

//asyncStorage key
const SMS_TEMPLATE = 'SMS_TEMPLATE';  //模板key
const SMS_ACCOUNT = 'SMS_ACCOUNT';  //短信账号key


// Action creators
export let MainActions = {
    sendSMS: function (smsApiKey, smsApiSecret, telephone, content) {
        return {
            type: SEND_SMS,
            payload: sms.sendSMS(smsApiKey, smsApiSecret, telephone, content)
        };
    },
    getTemplate: function () {
        return {
            type: GET_TEMPLATE,
            payload: asyncStorage.getStorage(SMS_TEMPLATE)
        };
    },
    addTemplate: function (value) {
        return {
            type: ADD_TEMPLATE,
            payload: asyncStorage.addStorage(SMS_TEMPLATE, value)
        };
    },
    deleteTemplate: function (value) {
        return {
            type: DEL_TEMPLATE,
            payload: asyncStorage.alterStorage(SMS_TEMPLATE, value)
        };
    },
    getAccount: function () {
        return {
            type: GET_ACCOUNT,
            payload: asyncStorage.getStorage(SMS_ACCOUNT)
        };
    },
    addAccount: function (apiKey, apiSecret) {
        let value = apiKey + "&&&&&" + apiSecret;
        return {
            type: ADD_ACCOUNT,
            payload: asyncStorage.addStorage(SMS_ACCOUNT, value)
        };
    },
    deleteAccount: function (value) {
        return {
            type: DEL_ACCOUNT,
            payload: asyncStorage.alterStorage(SMS_ACCOUNT, value)
        };
    }

};


// Reducer
export default function MainReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SEND_SMS:
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
            if(!action.payload || !action.payload.status){
                return state.set('delTemplateStatus', false);
            }
            state = state.set('delTemplateStatus', true);
            return state.set('templateList', fromJS(action.payload.result));
        case GET_ACCOUNT:
            return state.set('accountList', fromJS(action.payload));
        case ADD_ACCOUNT:
            if(!action.payload || !action.payload.status){
                return state.set('addAccountStatus', false);
            }
            state = state.set('addAccountStatus', true);
            return state.set('accountList', fromJS(action.payload.result));
        case DEL_ACCOUNT:
            if(!action.payload || !action.payload.status){
                return state.set('delAccountStatus', false);
            }
            state = state.set('delAccountStatus', true);
            return state.set('accountList', fromJS(action.payload.result));
        default:
            return state;
    }
}
