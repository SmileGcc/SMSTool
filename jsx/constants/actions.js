'use strict';

var ActionType = {
    //error
    REQUEST_LOADING: 'REQUEST_LOADING', //请求等待
    REQUEST_ERROR: 'REQUEST_ERROR',   //请求错误
     REQUEST_DONE: 'REQUEST_DONE',  
    RESULT_ERROR: 'RESULT_ERROR',  //返回结果错误 result: 0或2
    AUTH_FAIL: 'AUTH_FAIL',  //未登录

     //main
    SEND_SMS: 'SEND_SMS', //发送短信

};

module.exports = ActionType;