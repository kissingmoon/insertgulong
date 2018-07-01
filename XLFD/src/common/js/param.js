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



export function add0(m){return m<10?'0'+m:m }
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

//倒计时功能 时分秒
export function countTime(dateStr) {
    //获取当前时间
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(dateStr);
    var end = endDate.getTime();
    var leftTime = end-now;
    //定义变量 d,h,m,s保存倒计时的时间
    var d,h,m,s;
    console.log(leftTime);
    if (leftTime >= 0) {
        //d = Math.floor(leftTime/1000/60/60/24);
        h = Math.floor(leftTime/1000/60/60);
        m = Math.floor(leftTime/1000/60%60);
        s = Math.floor(leftTime/1000%60);  
        
    }else{
        return "00:00:00"; 
    }
    //递归每秒调用countTime方法，显示动态时间效果
    clearTimeout(time);
    if( leftTime >= 0){
        var time = setTimeout(() => {
            countTime(dateStr)
        },1000);
    }
    return add0(h)+":"+add0(m)+":"+add0(s);
}



//分割对象属性
export function slicer(arr, key, symbol){
    arr.forEach((item) => {
        item[key]=item[key].split(symbol);
    });
    return arr;
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


