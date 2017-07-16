'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    sendResult: Immutable.Map()
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionType.SEND_SMS:
            return {
                ...state,
                sendResult: Immutable.Map(action.payload),
                requestError: 0
            };
        default:
            return state;
    }
}