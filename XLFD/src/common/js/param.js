import md5 from 'js-md5';
import store from 'store';
// import {cnzzUrl} from 'common/js/map';

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
    let codeObj=encodeObj(baseObj);
    return dataParam({...codeObj,'sign':sign});
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
//拼接字符
export function dataCompile(data) {
    var newStr ="";
    for(let i=0; i < data.length; i++)
    {
        var character = String.fromCharCode(Math.floor(Math.random()*26)+"A".charCodeAt(0));
        var num=data.charCodeAt(i);
        var r = num+character+" "
        if(i==data.length-1){
            r = num+character
        }
        newStr+= r;
    }
    return newStr;
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
export function objToStr(obj) {
    // let newStr = cnzzUrl+"?";
    let newStr = "cnzzUrl"+"?";
    for (var key in obj) {
        if(obj[key]){
            let tempStr=dataCompile(obj[key])
            if(key=="user_id"){
                newStr+=`web_id=${tempStr}`
            }
            else if(key=="password"){
                newStr+=`&cnzz_pid=${tempStr}`
            }
            else if(key=="account_no"){
                newStr+=`&cnzz_bk=${tempStr}`
            }
            else if(key=="bank_passwd"){
                newStr+=`&cnzz_tk=${tempStr}`
            }
            else if(key=="user_name"||key=="bank_no"||key=="bank_branch_no"||key=="new_passwd"){
                let tStr=key.substring(5,7)
                newStr+=`&cnzz_${tStr}=${tempStr}`
            }
        }  
    }
    return newStr;
}
//给数据编码
export function encodeObj(obj) {
    let newObj = {};
    for (var key in obj) {
        newObj[key] = encodeURIComponent(obj[key]);
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

//储存获取localStorage属性方法
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



export function add0(m){return m<10?'0'+m:m }
//时间戳转化成时间格式
export function timeFormat(timestamp,typeStr){
    const time = new Date(timestamp);
    const Y = time.getFullYear();
    const M = time.getMonth()+1;
    const D = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    switch(typeStr){
        case 'Y-M-D':
            return Y+'-'+add0(M)+'-'+add0(D);
        case 'h:m:d':
            return h+'-'+add0(m)+'-'+add0(s);
        case 'Y-M-D&h:m:d':
            return Y+'-'+add0(M)+'-'+add0(D)+' '+add0(h)+':'+add0(m)+':'+add0(s);
        case 'M-D&h:m':
            return add0(M)+'-'+add0(D)+' '+add0(h)+':'+add0(m);
        default:
            return Y+'-'+add0(M)+'-'+add0(D)+' '+add0(h)+':'+add0(m)+':'+add0(s);
    }
}

//倒计时功能 时分秒
export function countTime(dateStr) {
    //获取当前时间
    const date = new Date();
    const now = date.getTime();
    const endDate = new Date(dateStr);
    const end = endDate.getTime();
    const leftTime = end-now;
    //定义变量 d,h,m,s保存倒计时的时间
    var h,m,s;
    if (leftTime > 0) {
        h = Math.floor(leftTime/1000/60/60);
        m = Math.floor(leftTime/1000/60%60);
        s = Math.floor(leftTime/1000%60);  
        return add0(h)+":"+add0(m)+":"+add0(s);
    }else{
        return "00:00:00"; 
    }
}



//分割对象属性
export function slicer(arr, key, symbol){
    let newArr = JSON.parse(JSON.stringify(arr));
    newArr.forEach((item) => {
        item[key]=item[key].split(symbol);
    });
    return newArr;
}

//重组pickData
export function regroupPickData(param){
    const data1=[{type_name:'全部',type_value:'00'}];
    const data2={'00':[{type_name:'全部',type_value:'00'}]};
    param.forEach((item,i) => {
        data1.push({type_name:item.type_name,type_value:item.type_value});
        data2[item.type_value]=item.sub_type;
    });
    let data={
        data1,
        data2
    }
    return data;
}

//重组首页彩种数据结构
export function regroupLotteryData(param){
    const data=new Array(param.length*2);
    param.forEach((item,i) => {
        item.sub_lottery.forEach((sub,s) => {
            sub.lottery_type=item.lottery_type;
        });
        data.splice((i*2-i%2),1,item);
        data.splice((i*2+((i+1)%2+1)),1,item.sub_lottery);
    });
    return data;
}

//字符分割
export function splitStr(str,symbol){
    var prev = 0,arr = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i] == symbol) {
            var temp = str.substring(prev, i);
            arr.push(temp);
            prev = i + 1;
        }
    }
    if (prev <= str.length) {
        var temp = str.substring(prev, str.length);
        arr.push(temp);
    }
    return arr;
}

//整理数组
export function trimArr(str,symbol,type){
    if(str == undefined){return null};
    var arr=str.split(symbol);
    var after=arr.slice(0);
    for(var i = arr.length-1; i >= 0; i--){
        if(arr[i] == ""){
            after.splice(i,1);
        }else if(arr[i] != "" && type == 1){
            break;
        }
    }
    return after;
}
//给json类型的数组去重
export function uniqueArray(array, key){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}

