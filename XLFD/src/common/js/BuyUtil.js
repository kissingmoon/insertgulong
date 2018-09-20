import {waveColor,waveColor28,fiveElement} from 'common/js/map';

export function initDataNum(start, end) {
    var list = [];
    var buyNumberBean = {};
    if (end > start) {
        for (var i = start; i <= end; i++) {
            buyNumberBean = {};
            buyNumberBean.str = i + "";
            buyNumberBean.number = i;
            buyNumberBean.number_str = i;
            buyNumberBean.index = i+1;
            list.push(buyNumberBean);
        }
    }
    return list;
}


export function initDataStr(arr) {
    var list = [];
    var buyNumberBean = {};
    arr.forEach((tiem,i) => {
        buyNumberBean = {};
        buyNumberBean.str = tiem + "";
        buyNumberBean.number = i;
        buyNumberBean.number_str = arr[i];
        buyNumberBean.index = i+1;
        list.push(buyNumberBean);
    });
    return list;
}

export function initPk10_lhdData(str,position) {
    var list = [];
    var buyNumberBean = {};
    var m = 1;
    for (var i = 0; i < str.length; i++) {
        buyNumberBean = {};
        buyNumberBean = {};
        buyNumberBean.str = str[i] + "";
        buyNumberBean.number = i;
        buyNumberBean.number_str = str[i];
        buyNumberBean.index = m;
        buyNumberBean.pk10_title = getTitle(position);
        m++;
        list.push(buyNumberBean);
    }
    return list;
}

function getTitle(i) {
    var str = "一vs十";
    switch (i) {
        case 0:
            str = "1vs10";
            break;
        case 1:
            str = "2vs9";
            break;
        case 2:
            str = "3vs8";
            break;
        case 3:
            str = "4vs7";
            break;
        case 4:
            str = "5vs6";
            break;
        default:
            str = "1vs10";
            break;
    }
    return str;
}

export function initDataLHCPL(wfPlBeanList,wf_flag,wf_name) {
    if (wfPlBeanList == null) {return null};
    var list = [];
    var buyNumberBean = {};
    wfPlBeanList.forEach ((item, i) => {
        buyNumberBean = {};
        buyNumberBean.str = item.pl_name + "";
        buyNumberBean.number_str = item.pl_name + "";
        buyNumberBean.index = i+1;
        buyNumberBean.pl = item.award_money;
        buyNumberBean.pl_flag = item.pl_flag;
        buyNumberBean.wf_flag = wf_flag;
        buyNumberBean.wf_name = wf_name;
        buyNumberBean.bet_money = '';
        list.push(buyNumberBean);
    }); 
    return list;
}

export function initDataBy(type, wfPlBeanList,wf_flag,wf_name) {
    var list = [];
    var str="";
    var buyNumberBean = {};
    if (type == 1 && wfPlBeanList.length == 3) {
        wfPlBeanList.forEach((item,i) => {
            buyNumberBean = {};
            str="";
            if(wf_flag=="xy28_qtbs_bs"){
                waveColor28[item.pl_name].forEach((num,n) => {
                    if(n%4 == 0 && n != 0 && n < 16){
                        str += '<br>'+ num
                    }else if(n != 0){
                        str += '&nbsp;&nbsp;' + num 
                    }else{
                        str += num
                    }
                });
            }
            else{
                waveColor[item.pl_name].forEach((num,n) => {
                    if(n%4 == 0 && n != 0 && n < 16){
                        str += '<br>'+ num
                    }else if(n != 0){
                        str += '&nbsp;&nbsp;' + num 
                    }else{
                        str += num
                    }
                });
            }
            
            buyNumberBean.str = str;
            buyNumberBean.number_str = item.pl_name;
            buyNumberBean.index = i;
            buyNumberBean.pl = item.award_money;
            buyNumberBean.pl_flag = item.pl_flag;
            buyNumberBean.wf_flag = wf_flag;
            buyNumberBean.wf_name = wf_name;
            buyNumberBean.bet_money = '';
            list.push(buyNumberBean);
        });
    }else if (type == 3 && wfPlBeanList.length == 5) {
        wfPlBeanList.forEach((item,i) => {
            buyNumberBean = {};
            str="";
            fiveElement[item.pl_name].forEach((num,n) => {
                if(n%4 == 0 && n != 0){
                    str += '<br>'+ num
                }else if(n != 0){
                    str += '&nbsp;&nbsp;' + num 
                }else{
                    str += num
                }
            });
            buyNumberBean.str = str;
            buyNumberBean.number_str = item.pl_name;
            buyNumberBean.index = i;
            buyNumberBean.pl = item.award_money;
            buyNumberBean.pl_flag = item.pl_flag;
            buyNumberBean.wf_flag = wf_flag;
            buyNumberBean.wf_name = wf_name;
            buyNumberBean.bet_money = '';
            list.push(buyNumberBean);
        });
    } else if (type == 4 && wfPlBeanList.length == 10) {
        buyNumberBean = {};
        buyNumberBean.str = "10  20  30  40";
        buyNumberBean.number_str = wfPlBeanList[0].pl_name;
        buyNumberBean.index = 0;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        buyNumberBean.wf_flag = wf_flag;
        buyNumberBean.wf_name = wf_name;
        buyNumberBean.bet_money = '';
        list.push(buyNumberBean);
        for (var i = 0; i < wfPlBeanList.length; i++) {
            buyNumberBean = {};
            buyNumberBean.str = "0" + i + "  1" + i + "  2" + i + "  3" + i + "  4" + i;
            buyNumberBean.number_str = wfPlBeanList[i].pl_name;
            buyNumberBean.index = i;
            buyNumberBean.pl = wfPlBeanList[i].award_money;
            buyNumberBean.pl_flag = wfPlBeanList[i].pl_flag;
            buyNumberBean.wf_flag = wf_flag;
            buyNumberBean.wf_name = wf_name;
            buyNumberBean.bet_money = '';
            list.push(buyNumberBean);
        }
    } else if (type == 5) {
        var m = 1;
        for (var i = 1; i <= 49; i++) {
            buyNumberBean = {};
            buyNumberBean.str = i < 10 ? (0 + (i + "")) : (i + "");
            buyNumberBean.number_str = buyNumberBean.str;
            buyNumberBean.index = m;
            buyNumberBean.number = i;
            buyNumberBean.pl = wfPlBeanList[0].award_money;
            buyNumberBean.wf_flag = wf_flag;
            buyNumberBean.wf_name = wf_name;
            buyNumberBean.bet_money = '';
            m++;
            list.push(buyNumberBean);
        }
    } else if (type == 6) {
        var m = 1;
        for (var i = 0; i <= 27; i++) {
            buyNumberBean = {};
            buyNumberBean.str = (i + "");
            buyNumberBean.number = i;
            buyNumberBean.index = m;
            buyNumberBean.number_str = buyNumberBean.str;
            buyNumberBean.pl = wfPlBeanList[0].award_money;
            buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
            m++;
            list.push(buyNumberBean);
        }
    }else if (type == 9) {
        for (var i = 0; i < 10; i++) {
            const pickIndex = wfPlBeanList.length == 10 ? i : 0;
            buyNumberBean = {};
            buyNumberBean.str = i + "尾";
            buyNumberBean.number_str = i + "尾";
            buyNumberBean.index = i;
            buyNumberBean.wf_flag = wf_flag;
            buyNumberBean.pl = wfPlBeanList[pickIndex].award_money;
            buyNumberBean.pl_flag = wfPlBeanList[pickIndex].pl_flag;
            list.push(buyNumberBean);
        }
    }
    return list;
}

export function initShengxiaoData(type, shengXiaoLHCRecvList,wfPlBeanList,wf_flag,wf_name) {
    var list = [];
    shengXiaoLHCRecvList.forEach((shengXiaoLHCRecv,i) => {
        var buyNumberBean = {};
        const content = shengXiaoLHCRecv.value.replace(/,/g, "&nbsp;&nbsp;");
        buyNumberBean.str = content;
        buyNumberBean.number_str = shengXiaoLHCRecv.flag;
        buyNumberBean.index = i;
        buyNumberBean.wf_flag = wf_flag;
        buyNumberBean.wf_name = wf_name;
        if (type == 8) {
            if (wfPlBeanList.length == 1) {
                buyNumberBean.pl = wfPlBeanList[0].award_money;
                buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
            } else {
                buyNumberBean.pl = wfPlBeanList[i].award_money;
                buyNumberBean.pl_flag = wfPlBeanList[i].pl_flag;
            }
        } else if (type == 7) {
            const peilvIndex = i - 1;     // 用于匹配赔率和奖金到生效中的迭代，算法来源参考initData中的写法
            if (peilvIndex >= 0 && peilvIndex <= 9) {
                buyNumberBean.pl = wfPlBeanList[peilvIndex].award_money;
                buyNumberBean.pl_flag = wfPlBeanList[peilvIndex].pl_flag;
            }
        }
        list.push(buyNumberBean);
    });
    return list;
}

