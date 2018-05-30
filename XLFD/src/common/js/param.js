import md5 from 'js-md5';
export function reData(data){
    let default_key='fb2356ddf5scc5d4d2s9e@2scwu7io2c';
    let user_token=sessionStorage.user_token;
    let md5_salt=sessionStorage.md5_salt;
    let baseObj={
        ...data,
        platform:'3',
        app_bundleId:'com.xb888.front',
        app_version:'1.0',
        user_token
    };
    baseObj=objKeySort(baseObj);
    let url=dataParam(baseObj);
    let sign=md5(url+(md5_salt || default_key));
    return dataParam({...baseObj,'sign':sign});
}
//拼接上传的属性值
export function dataParam(data) {
    let url = '';
    for (var k in data) {
      let value = data[k] !== undefined ? data[k] : '';
      url += '&' + k + '=' + value;
    }
    return url ? url.substring(1) : '';
}
//根据对象属性排序
export function objKeySort(obj) {
    let newkey = Object.keys(obj).sort();
    let newObj = {};
    for (let i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}