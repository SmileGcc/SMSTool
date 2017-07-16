'use strict';

import { ActionType } from '../constants/index';

var MainActions = {
    sendSMS: function () {
        return {
            type: ActionType.SEND_SMS,
            promise: (ajax) => ajax.get('/sendSMS',
                {}),
            meta: {
            }
        };
    }
};

module.exports = MainActions;
