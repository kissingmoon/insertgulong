var commonUrl = 'http://127.0.0.1:8081';
// var commonUrl = 'http://www.xlfdapi.com';

//获取url后面的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function getValByString(str,key,dVal){
    if(str.indexOf(key) == -1){
        return dVal;
    }
    str = str.substr(str.indexOf(key)+key.length+1);
    if(str.indexOf('&') == -1){
        return str;
    }
    return str.substr(0,str.indexOf('&'));
}