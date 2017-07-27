import {fromJS} from 'immutable';
import asyncStorage from '../../service/asyncStorage';

const initialState = fromJS({
    accountList: [],
    addAccountStatus: false,
    delAccountStatus: false,
    selectedAccountId: 0 //当前选择的账号id
});

// Actions
const GET_ACCOUNT = 'ACCOUNT/GET_ACCOUNT';
const ADD_ACCOUNT = 'ACCOUNT/ADD_ACCOUNT';
const DEL_ACCOUNT = 'ACCOUNT/DEL_ACCOUNT';
const SET_SELECT_ACCOUNT = 'ACCOUNT/SET_SELECT_ACCOUNT';
const GET_SELECT_ACCOUNT = 'ACCOUNT/GET_SELECT_ACCOUNT';

//asyncStorage key
const SMS_ACCOUNT = 'SMS_ACCOUNT';  //短信账号key
const ACCOUNT_ID = 'ACCOUNT_ID';  //当前选择的账号key


// Action creators
export let AccountActions = {
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
    },
    setSelectAccount: function (id) {
        return {
            type: SET_SELECT_ACCOUNT,
            payload: asyncStorage.alterStorage(ACCOUNT_ID, id)
        };
    },
    getSelectAccount: function () {
        return {
            type: GET_SELECT_ACCOUNT,
            payload: asyncStorage.getStorage(ACCOUNT_ID)
        };
    }

};


// Reducer
export default function AccountReducer(state = initialState, action = {}) {
    switch (action.type) {
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
        case GET_SELECT_ACCOUNT:
            if(action.payload.length > 0){
                return state.set('selectedAccountId', fromJS(action.payload.toString()));
            }
            return state.set('selectedAccountId', 0);
        case SET_SELECT_ACCOUNT:
            if(!action.payload || !action.payload.status){
                return state;
            }
            return state.set('selectedAccountId', fromJS(action.payload.result));
        default:
            return state;
    }
}
