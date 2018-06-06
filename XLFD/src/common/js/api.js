import axios from 'axios'
import {reData} from 'common/js/param';

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  console.log('请求超时!');
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.errorMsg) {
    console.log(data.data.errorMsg);
    return;
  }
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    console.log('服务器被吃了⊙﹏⊙∥');
  } else if (err.response.status == 403) {
    console.log('权限不足,请联系管理员!');
  }else {
    console.log('未知错误!');
  }
  return Promise.resolve(err);
})

let base = '/api';

export const postRequest = (url, params) => {
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
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
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
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}