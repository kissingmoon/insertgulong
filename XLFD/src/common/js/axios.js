import axios from 'axios';
import {reData,session,removeSession} from 'common/js/param';
import store from 'store';
import Router from '../../router';

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
    store.commit('SET_TIP','请求超时!');
  return Promise.resolve(err);
})
axios.interceptors.response.use(res=> {
    if (res.status && res.status == 200 && res.data.errorCode) {
        switch (res.data.errorCode) {
            case '20012':case '20038':
                removeSession('user_token');
                removeSession('md5_salt');
                removeSession('uID');
                store.commit('SET_USER_TOKEN','');
                store.commit('SET_MD5_SALT','');
                store.commit('SET_ACCOUNT','');
                store.commit('SET_MESSAGE_COUNT',0);
                if(res.data.errorCode == '20038'){
                    store.commit('SET_TIP',res.data.errorMsg);
                    Router.push({
                        path:'/login'
                    });
                }
                break;
                case '20029': break;
            default:
                store.commit('SET_TIP',res.data.errorMsg);
                return res;
        }
    }
    return res;
}, err=> {
  // debugger
  if (err.response.status == 504||err.response.status == 404) {
    store.commit('SET_TIP','网络加载中，请稍等！');
  } else if (err.response.status == 403) {
    store.commit('SET_TIP','权限不足,请联系管理员!');
  }else {
    store.commit('SET_TIP','网络加载中，请稍等！');
  }
  return Promise.resolve(err);
})

let base = '/api';
// let base = '/test';
// let base  = '';
//let base = '/jason';

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
    },
    axiosRequestAll(arr) {
      //用法
      // var postArray=[];
    //   this.incomeList.map(function(v,k){
    //     var pram={type:k+1}
    //     var postObj={}
    //     postObj.method='POST'
    //     postObj.url=httpUrl.pay.getPayMethod
    //     postObj.params=pram
    //     postArray.push(postObj)
    // })
      var aRequest = []
      for (var i of arr) {
        aRequest.push(axios({
          method: i.method,
          url: `${base}${i.url}`,
          data: i.params,
          transformRequest: [function (data) {
              let ret = reData(data);
              return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }))
      }
      return axios.all(aRequest).then(axios.spread(function () {
        var aReturn = []
        for (var i of arguments) {
          aReturn.push(i)
        }
        return aReturn
      }))
    }
}

export default $axios;