import axios from 'axios';
import {reData,session,removeSession} from 'common/js/param';
import store from 'store';
import Vue from 'vue';
import Router from '../../router';

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  console.log('请求超时!');
  return Promise.resolve(err);
})
axios.interceptors.response.use(res=> {
    if (res.status && res.status == 200 && res.data.errorCode) {
        // store.commit('SET_TIP',res.data.errorMsg);
        switch (res.data.errorCode) {
            case '20012':
                removeSession('user_token');
                removeSession('md5_salt');
                store.commit('SET_USER_TOKEN','');
                store.commit('SET_MD5_SALT','');
                store.commit('SET_ACCOUNT','');
                break;
            default:
                store.commit('SET_TIP',res.data.errorMsg);
                return res;
        }
    }
    return res;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    store.commit('SET_TIP','服务器被吃了⊙﹏⊙∥');
  } else if (err.response.status == 403) {
    store.commit('SET_TIP','权限不足,请联系管理员!');
  }else {
    store.commit('SET_TIP','未知错误!');
  }
  return Promise.resolve(err);
})

let base = '/api';

const $axios = {
    postRequest(url, params){
      return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = reData(data);
            return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    uploadFileRequest(url, params){
      return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    putRequest(url, params){
      return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = reData(data);
            return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    deleteRequest(url){
      return axios({
        method: 'delete',
        url: `${base}${url}`
      });
    },
    getRequest(url){
      return axios({
        method: 'get',
        url: `${base}${url}`
      });
    }
}
export default $axios;