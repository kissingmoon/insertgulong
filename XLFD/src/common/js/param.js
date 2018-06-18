import md5 from 'js-md5';
import store from 'store';
export function reData(data){
    let param=data||{};
    let default_key='fb2356ddf5scc5d4d2s9e@2scwu7io2c';
    let user_token=store.getters.user_token||session('user_token');
    let md5_salt=store.getters.md5_salt||session('md5_salt');
    let baseObj={
        ...param,
        platform:'3',
        app_bundleId:'com.xb888.front',
        app_version:'1.0'
    };
    if(user_token){
        baseObj.user_token=user_token;
    }
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

//储存获取sessionStorage属性方法
export function session(key,val) {
    if(!val && val!='0'){
        let userJsonStr = sessionStorage.getItem(key);
        return JSON.parse(userJsonStr);
    }else{
        sessionStorage.setItem(key, JSON.stringify(val));
    }
}

export function removeSession(key){
    sessionStorage.removeItem(key);
}

//储存获取sessionStorage属性方法
export function local(key,val) {
    if(!val && val!='0'){
        let userJsonStr = localStorage.getItem(key);
        return JSON.parse(userJsonStr);
    }else{
        localStorage.setItem(key, JSON.stringify(val));
    }
}

export function removeLocal(key){
    localStorage.removeItem(key);
}

//生成随机值
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
 
export function randomWord(randomFlag, min, max){
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}



function add0(m){return m<10?'0'+m:m }
//时间戳转化成时间格式
export function timeFormat(timestamp){
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
}


export function slicer(arr, key, symbol){
    arr.forEach((item) => {
        item[key]=item[key].split(symbol);
    });
    return arr;
}

