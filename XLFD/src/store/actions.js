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
        if(res.data && !res.data.errorCode){
            commit('SET_ACCOUNT',res.data);
        };
    });
}

//获取未读消息条数
export const getMessageCount = ({commit, state}) => {
    $axios.postRequest(httpUrl.home.messageCount)
    .then((res)=> {
        if(res.data && !res.data.errorCode){
            commit('SET_MESSAGE_COUNT',res.data.num);
        };
    });
}

//获取活动领取情况
export const getIsReceived = ({commit, state},type) => {
    $axios.postRequest(httpUrl.config.isReceived,{hd_flag:type})
    .then((res)=> {
        if(res.data && !res.data.errorCode){
            const name= 'SET_' + type.toUpperCase();
            commit(name,res.data.is_received);
        };
    });
}
//新人开户礼金领取情况
export const getXrkhType = ({commit, state}) => {
    $axios.postRequest(httpUrl.config.xrkhIsOK)
    .then((res)=> {
        if(res.data && !res.data.errorCode){
            let type =res.data.is_received == 1 ? 0:1;
            commit('SET_HD_XRKH',type);
            commit('SET_HAS_PHONE',res.data.has_phone);
        };
    });
}