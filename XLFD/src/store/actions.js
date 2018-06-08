import * as types from './mutation-types';
import $axios from 'common/js/axios';
import {httpUrl} from 'common/js/map';

//修改登录信息
export const resetUser = ({commit, state}, {account, token, md5}) => {
    commit(types.SET_ACCOUNT, account)
    commit(types.SET_USER_TOKEN, token)
    commit(types.SET_MD5_SALT, md5)
}

//设置header属性
export const setHeader = ({commit, state},param) => {
    const original = {
        title:'小李飞刀',
        back:false,
        service:false,
        message:false,
        rechargeTip:false,
        time:false,
        moneyType:false
    }
    const header=Object.assign({},original,param);
    commit('SET_HEADER',header);
}

//获取用户信息
export const getUser = ({commit, state}) => {
    $axios.postRequest(httpUrl.info.user)
    .then((res)=> {
        if(!res.data.errorCode){
            commit('SET_ACCOUNT',res.data);
        };
    });
}