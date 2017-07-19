'use strict';
import {
    AsyncStorage
} from 'react-native';

let asyncStorage = {
    getStorage : function(key){
        return AsyncStorage.getItem(key).then((value)=>{
            let result = [];
            if(value && value != ''){
                result = value.split(',')
            }
            return result;
        })
    },
    addStorage : function(key, value){
        return AsyncStorage
                .getItem(key)
                .then((result)=>{
                    let arr = [];
                    if(result){
                        arr = result.split(',');
                    }
                    arr.push(value);
                    return AsyncStorage
                            .setItem(key, arr.toString())
                            .then((err)=>{
                                if (err) {
                                    return {
                                        status: false
                                    }
                                }
                                return {
                                    status: true,
                                    result: arr
                                }
                            })
            });
    },
    alterStorage : function(key, value) {
        return AsyncStorage
            .setItem(key, value.toString())
            .then((err) => {
                if (err) {
                    return {
                        status: false
                    }
                }
                return {
                    status: true,
                    result: value
                }
            })
    }
};

export default asyncStorage;