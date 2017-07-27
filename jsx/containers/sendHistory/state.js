import {fromJS} from 'immutable';
import asyncStorage from '../../service/asyncStorage';
import utils from '../../utils/utils'

const initialState = fromJS({
    sendHistoryList: [],
    addSendHistoryStatus: false
});

// Actions
const ADD_SEND_HISTORY = 'MAIN/ADD_SEND_HISTORY';
const GET_SEND_HISTORY = 'MAIN/GET_SEND_HISTORY';

//asyncStorage key
const SMS_SEND_HISTORY = 'SMS_SEND_HISTORY'; //发送历史记录key


// Action creators
export let SendHistoryActions = {
    getSendHistory: function () {
        return {
            type: GET_SEND_HISTORY,
            payload: asyncStorage.getStorage(SMS_SEND_HISTORY)
        };
    },
    addSendHistory: function(smsApiKey, smsApiSecret,toPhone, smsContent){
        let value = smsApiKey + '&&&&&' + smsApiSecret + '&&&&&' + toPhone + '&&&&&'
            + smsContent + '&&&&&' + utils.getDateTime();
        return {
            type: ADD_SEND_HISTORY,
            payload: asyncStorage.addStorage(SMS_SEND_HISTORY, value)
        };
    }

};


// Reducer
export default function SendHistoryReducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_SEND_HISTORY:
            return state.set('sendHistoryList', fromJS(action.payload));
        case ADD_SEND_HISTORY:
            if(!action.payload || !action.payload.status){
                return state.set('addSendHistoryStatus', false);
            }
            return state.set('addSendHistoryStatus', true);
        default:
            return state;
    }
}
