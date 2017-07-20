import 'whatwg-fetch'
import {config} from '../config';

let toQueryString = function (params) {
    return Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
};

function getUrl(path, params) {
    let url = config.smsUrl + '/';
    url = config.baseUrl ? url + config.baseUrl + '/' + path : url + path;
    if (params) {
        url = url + '?' + toQueryString(params);
    }
    return url;
}

let request = function (method, path, {params, body}) {
    let option = {
        method: method,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };
    let url = getUrl(path, params);
    console.log(url)
    return fetch(url, option)
        .then(res => res.text())
        .then(function (res) {
            if(res.indexOf("&mterrcode=000") > -1){
                return {
                    status: true,
                    result: ''
                }
            }else{
                let error = res;
                let errorCode = res.split('&mterrcode=')[1];
                let errObj = {
                    '0101': '无效的command参数',
                    '0100': '请求参数错误',
                    '0107' : '账号金额或信用额度不足',
                    '0108': 'IP 未在白名单中',
                    '0110': '目标号码格式错误或群发号码数量超过100个',
                    '0111': '发送内容不能为空',
                    '0112': '下发国内号码没有对应模板',
                    '0600': '未知的错误'
                };
                for(let key in errObj){
                    if (key == errorCode){
                        error = errObj[key];
                        break;
                    }
                }
                return {
                    status: false,
                    result: error
                }
            }
        })
};

let sms = {
    sendSMS: function (telephone, content) {
        let params = {
            command: 'MT_REQUEST',
            cpid: config.cpid,
            cppwd: config.cppwd,
            da: telephone,
            sm: content
        };
        return request('POST', 'submit', {params: params});
    }

};

export default sms;



