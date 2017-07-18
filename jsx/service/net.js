import 'whatwg-fetch'
import {config} from '../config';

let toQueryString = function (params) {
    return Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
};

function getUrl(path, params) {
    let url = config.protocol + '://' + config.host + ':' + config.port + '/';
    url = config.baseUrl ? url + config.baseUrl + '/' + path : url + path;
    if (params) {
        url = url + '?' + toQueryString(params);
    }
    return url;
}

let checkStatus = function (response) {
   if(response.status === 401) {
        let error = new Error(response.statusText);
        error.message = '用户未登陆';
        throw error;
    } else {
       return response;
    }
};

let parseJSON = function (response) {
    return response.json();
};

let request = function (method, path, {params, data}) {
    let option = {
        method: method,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };
    let url = getUrl(path, params);
    if (method === 'POST') {
        let arr = [];
        for (let key in data) {
            arr.push(key + '=' + data[key])
        }
        option.body = arr.join("&");
    }
    return fetch(url, option)
        .then(checkStatus)
        .then(parseJSON)
        .then(function (res) {
            if (res.success) {
                return res.data;
            } else {
                // console.log(res.code + ':' + res.message);
                let error = new Error();
                error.status = res.statusText;
                error.message = res.message;
                if(res.code){
                    error.code = res.code;
                }
                throw error;
            }
        })
};

let net = {
    //发送短信
    sendSMS: function (params) {
        return request('GET', 'sendSMS', {params: params});
    },
    test: function (params) {
        return request('GET', 'test.pub', {params: params});
    }

};

export default net;



