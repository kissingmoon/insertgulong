export function initDataNum(start, end) {
    var list = [];
    var buyNumberBean = {};
    if (end > start) {
        for (var i = start; i <= end; i++) {
            buyNumberBean = {};
            buyNumberBean.str = i + "";
            buyNumberBean.number = i;
            buyNumberBean.numberStr = i;
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
        buyNumberBean.numberStr = i;
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
        buyNumberBean.numberStr = i;
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

export function initDataLHCPL(wfPlBeanList) {
    if (wfPlBeanList == null) {return null};
    var list = [];
    var buyNumberBean = {};
    wfPlBeanList.forEach ((item, i) => {
        buyNumberBean = {};
        buyNumberBean.str = item.pl_name + "";
        buyNumberBean.numberStr = item.pl_name + "";
        buyNumberBean.index = i+1;
        buyNumberBean.pl = item.award_money;
        buyNumberBean.pl_flag = item.pl_flag;
        list.push(buyNumberBean);
    }); 
    return list;
}

export function initDataBy(type, wfPlBeanList) {
    var list = [];
    var buyNumberBean = {};
    if (type == 1 && wfPlBeanList.length == 3) {
        buyNumberBean.str = "01&nbsp;&nbsp;02&nbsp;&nbsp;07&nbsp;&nbsp;08<br>12&nbsp;&nbsp;13&nbsp;&nbsp;18&nbsp;&nbsp;19<br>23&nbsp;&nbsp;24&nbsp;&nbsp;29&nbsp;&nbsp;30<br>34&nbsp;&nbsp;35&nbsp;&nbsp;30&nbsp;&nbsp;45<br>46";
        buyNumberBean.numberStr = "红波";
        buyNumberBean.index = 0;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "05&nbsp;&nbsp;06&nbsp;&nbsp;11&nbsp;&nbsp;16<br>17&nbsp;&nbsp;21&nbsp;&nbsp;22&nbsp;&nbsp;27<br>28&nbsp;&nbsp;32&nbsp;&nbsp;33&nbsp;&nbsp;38<br>39&nbsp;&nbsp;43&nbsp;&nbsp;44&nbsp;&nbsp;49<br> <br> ";
        buyNumberBean.numberStr = "绿波";
        buyNumberBean.index = 2;
        buyNumberBean.pl = wfPlBeanList[2].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[2].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "03&nbsp;&nbsp;04&nbsp;&nbsp;09&nbsp;&nbsp;10<br>14&nbsp;&nbsp;15&nbsp;&nbsp;20&nbsp;&nbsp;25<br>26&nbsp;&nbsp;31&nbsp;&nbsp;36&nbsp;&nbsp;37<br>41&nbsp;&nbsp;42&nbsp;&nbsp;47&nbsp;&nbsp;48<br> <br> ";
        buyNumberBean.numberStr = "蓝波";
        buyNumberBean.index = 1;
        buyNumberBean.pl = wfPlBeanList[1].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[1].pl_flag;
        list.push(buyNumberBean);
    } else if (type == 2 && wfPlBeanList.length == 12) {
        buyNumberBean = {};
        buyNumberBean.str = "10  22  34  36";
        buyNumberBean.numberStr = wfPlBeanList[0].pl_name;
        buyNumberBean.index = 0;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "09  21  33  45";
        buyNumberBean.numberStr = wfPlBeanList[1].pl_name;
        buyNumberBean.index = 1;
        buyNumberBean.pl = wfPlBeanList[1].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[1].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "08  20  32  44";
        buyNumberBean.numberStr = wfPlBeanList[2].pl_name;
        buyNumberBean.index = 2;
        buyNumberBean.pl = wfPlBeanList[2].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[2].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "07  19  31  43";
        buyNumberBean.numberStr = wfPlBeanList[3].pl_name;
        buyNumberBean.index = 3;
        buyNumberBean.pl = wfPlBeanList[3].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[3].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "06  18  30  42";
        buyNumberBean.numberStr = wfPlBeanList[4].pl_name;
        buyNumberBean.index = 4;
        buyNumberBean.pl = wfPlBeanList[4].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[4].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "05  17  29  41";
        buyNumberBean.numberStr = wfPlBeanList[5].pl_name;
        buyNumberBean.index = 5;
        buyNumberBean.pl = wfPlBeanList[5].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[5].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "04  16  28  40";
        buyNumberBean.numberStr = wfPlBeanList[6].pl_name;
        buyNumberBean.index = 6;
        buyNumberBean.pl = wfPlBeanList[6].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[6].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "03  15  27  39";
        buyNumberBean.numberStr = wfPlBeanList[7].pl_name;
        buyNumberBean.index = 7;
        buyNumberBean.pl = wfPlBeanList[7].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[7].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str ="02  14  26  38";
        buyNumberBean.numberStr = wfPlBeanList[8].pl_name;
        buyNumberBean.index = 8;
        buyNumberBean.pl = wfPlBeanList[8].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[8].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "01  13  25  37  49";
        buyNumberBean.numberStr = wfPlBeanList[9].pl_name;
        buyNumberBean.index = 9;
        buyNumberBean.pl = wfPlBeanList[9].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[9].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "12  24  36  48";
        buyNumberBean.numberStr = wfPlBeanList[10].pl_name;
        buyNumberBean.index = 10;
        buyNumberBean.pl = wfPlBeanList[10].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[10].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "11  23  35  47";
        buyNumberBean.numberStr = wfPlBeanList[11].pl_name;
        buyNumberBean.index = 11;
        buyNumberBean.pl = wfPlBeanList[11].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[11].pl_flag;
        list.push(buyNumberBean);
    } else if (type == 3 && wfPlBeanList.length == 5) {
        buyNumberBean = {};
        buyNumberBean.str = "03  04  17  18 <br> 25  26  33  34 <br> 47  48";
        buyNumberBean.numberStr = wfPlBeanList[0].pl_name;
        buyNumberBean.index = 0;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "07  08  15  16 <br> 29  30  37  38 <br> 46  46";
        buyNumberBean.numberStr = wfPlBeanList[1].pl_name;
        buyNumberBean.index = 1;
        buyNumberBean.pl = wfPlBeanList[1].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[1].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "05  06  13  14 <br> 21  22  35  36 <br> 43  44";
        buyNumberBean.numberStr = wfPlBeanList[2].pl_name;
        buyNumberBean.index = 2;
        buyNumberBean.pl = wfPlBeanList[2].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[2].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "01  02  09  10 <br> 23  24  31  32 <br> 39  40";
        buyNumberBean.numberStr = wfPlBeanList[3].pl_name;
        buyNumberBean.index = 3;
        buyNumberBean.pl = wfPlBeanList[3].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[3].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "11  12  19  20 <br> 27  28  41  42 <br> 49";
        buyNumberBean.numberStr = wfPlBeanList[4].pl_name;
        buyNumberBean.index = 4;
        buyNumberBean.pl = wfPlBeanList[4].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[4].pl_flag;
        list.push(buyNumberBean);
    } else if (type == 4 && wfPlBeanList.length == 10) {
        buyNumberBean = {};
        buyNumberBean.str = "10  20  30  40";
        buyNumberBean.numberStr = wfPlBeanList[0].pl_name;
        buyNumberBean.index = 0;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        for (var i = 1; i < wfPlBeanList.length; i++) {
            buyNumberBean = {};
            buyNumberBean.str = "0" + i + "  1" + i + "  2" + i + "  3" + i + "  4" + i;
            buyNumberBean.numberStr = wfPlBeanList[i].pl_name;
            buyNumberBean.index = i;
            buyNumberBean.pl = wfPlBeanList[i].award_money;
            buyNumberBean.pl_flag = wfPlBeanList[i].pl_flag;
            list.push(buyNumberBean);
        }
    } else if (type == 5) {
        var m = 1;
        for (var i = 1; i <= 49; i++) {
            buyNumberBean = {};
            buyNumberBean.str = i < 10 ? (0 + (i + "")) : (i + "");
            buyNumberBean.numberStr = buyNumberBean.str;
            buyNumberBean.index = m;
            buyNumberBean.number = i;
            buyNumberBean.pl = wfPlBeanList[0].award_money;
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
            buyNumberBean.numberStr = buyNumberBean.str;
            buyNumberBean.pl = wfPlBeanList[0].award_money;
            buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
            m++;
            list.push(buyNumberBean);
        }
    }
    // 生效采用动态获取的方式，不再使用本地写死的方式
    else if (type == 7 && wfPlBeanList.length == 10) {
        buyNumberBean = {};
        buyNumberBean.str = "鼠" + " <br> 11  23  35  47", "鼠";
        buyNumberBean.numberStr = "鼠";
        buyNumberBean.index = 0;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "牛" + " <br> 10  22  34  46", "牛";
        buyNumberBean.numberStr = "牛";
        buyNumberBean.index = 1;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "虎" + " <br> 09  21  33  45", "虎";
        buyNumberBean.numberStr = "虎";
        buyNumberBean.index = 2;
        buyNumberBean.pl = wfPlBeanList[1].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[1].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "兔" + " <br> 08  20  32  44", "兔";
        buyNumberBean.numberStr = "兔";
        buyNumberBean.index = 3;
        buyNumberBean.pl = wfPlBeanList[2].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[2].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "龙" + " <br> 07  19  31  43", "龙";
        buyNumberBean.numberStr = "龙";
        buyNumberBean.index = 4;
        buyNumberBean.pl = wfPlBeanList[3].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[3].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "蛇" + " <br> 06  18  30  42", "蛇";
        buyNumberBean.numberStr = "蛇";
        buyNumberBean.index = 5;
        buyNumberBean.pl = wfPlBeanList[4].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[4].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "马" + " <br> 05  17  29  41", "马";
        buyNumberBean.numberStr = "马";
        buyNumberBean.index = 6;
        buyNumberBean.pl = wfPlBeanList[5].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[5].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "羊" + " <br> 04  16  28  40", "羊";
        buyNumberBean.numberStr = "羊";
        buyNumberBean.index = 7;
        buyNumberBean.pl = wfPlBeanList[6].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[6].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "猴" + " <br> 03  15  27  39", "猴";
        buyNumberBean.numberStr = "猴";
        buyNumberBean.index = 8;
        buyNumberBean.pl = wfPlBeanList[7].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[7].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "鸡" + " <br> 02  14  26  38", "鸡";
        buyNumberBean.numberStr = "鸡";
        buyNumberBean.index = 9;
        buyNumberBean.pl = wfPlBeanList[8].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[8].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "狗" + " <br> 01  13  25  37  49", "狗";
        buyNumberBean.numberStr = "狗";
        buyNumberBean.index = 10;
        buyNumberBean.pl = wfPlBeanList[9].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[9].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "猪" + " <br> 12  24  36  48", "猪";
        buyNumberBean.numberStr = "猪";
        buyNumberBean.index = 11;
        list.push(buyNumberBean);
    }
    // 生效采用动态获取的方式，不再使用本地写死的方式
    else if (type == 8) {
        buyNumberBean = {};
        buyNumberBean.str = "鼠" + " <br> 11  23  35  47", "鼠";
        buyNumberBean.numberStr = "鼠";
        buyNumberBean.index = 0;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "牛" + " <br> 10  22  34  46", "牛";
        buyNumberBean.numberStr = "牛";
        buyNumberBean.index = 1;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "虎" + " <br> 09  21  33  45", "虎";
        buyNumberBean.numberStr = "虎";
        buyNumberBean.index = 2;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "兔" + " <br> 08  20  32  44", "兔";
        buyNumberBean.numberStr = "兔";
        buyNumberBean.index = 3;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "龙" + " <br> 07  19  31  43", "龙";
        buyNumberBean.numberStr = "龙";
        buyNumberBean.index = 4;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "蛇" + " <br> 06  18  30  42", "蛇";
        buyNumberBean.numberStr = "蛇";
        buyNumberBean.index = 5;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "马" + " <br> 05  17  29  41", "马";
        buyNumberBean.numberStr = "马";
        buyNumberBean.index = 6;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "羊" + " <br> 04  16  28  40", "羊";
        buyNumberBean.numberStr = "羊";
        buyNumberBean.index = 7;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "猴" + " <br> 03  15  27  39", "猴";
        buyNumberBean.numberStr = "猴";
        buyNumberBean.index = 8;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "鸡" + " <br> 02  14  26  38", "鸡";
        buyNumberBean.numberStr = "鸡";
        buyNumberBean.index = 9;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "狗" + " <br> 01  13  25  37  49", "狗";
        buyNumberBean.numberStr = "狗";
        buyNumberBean.index = 10;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
        buyNumberBean = {};
        buyNumberBean.str = "猪" + " <br> 12  24  36  48", "猪";
        buyNumberBean.numberStr = "猪";
        buyNumberBean.index = 11;
        buyNumberBean.pl = wfPlBeanList[0].award_money;
        buyNumberBean.pl_flag = wfPlBeanList[0].pl_flag;
        list.push(buyNumberBean);
    } else if (type == 9) {
        for (var i = 0; i < 10; i++) {
            const pickIndex = wfPlBeanList.length == 10 ? i : 0;
            buyNumberBean = {};
            buyNumberBean.str = i + "尾";
            buyNumberBean.numberStr = i + "尾";
            buyNumberBean.index = i;
            buyNumberBean.pl = wfPlBeanList[pickIndex].award_money;
            buyNumberBean.pl_flag = wfPlBeanList[pickIndex].pl_flag;
            list.push(buyNumberBean);
        }
    }
    return list;
}

export function initShengxiaoData(type, shengXiaoLHCRecvList, wfPlBeanList) {
    var list = [];
    shengXiaoLHCRecvList.forEach((shengXiaoLHCRecv,i) => {
        var buyNumberBean = {};
        const content = shengXiaoLHCRecv.value.replace(/,/g, "&nbsp;&nbsp;");
        buyNumberBean.str = content;
        buyNumberBean.numberStr = shengXiaoLHCRecv.flag;
        buyNumberBean.index = i;
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

// export function updateListByStatus(list, type) {
//     let ALLTYPE = 1;
//     let BIGTYPE = 2;
//     let SMALLTYPE = 3;
//     let EVENTYPE = 4;
//     let SINGTYPE = 5;
//     let CLEARTYPE = 6;
//     if (list != null) {
//         const middle = (list.length % 2 == 0 ? list.length : (list.length - 1)) / 2;
//         list.forEach((buyNumberBean) => {
//             switch (type) {
//                 case ALLTYPE:
//                     buyNumberBean.isCkeck = true;
//                     break;
//                 case BIGTYPE:
//                     buyNumberBean.isCkeck = buyNumberBean.index > middle;
//                     break;
//                 case SMALLTYPE:
//                     buyNumberBean.isCkeck = buyNumberBean.index <= middle;
//                     break;
//                 case EVENTYPE:
//                     buyNumberBean.isCkeck = buyNumberBean.number% 2 == 0 ;
//                     break;
//                 case SINGTYPE:
//                     buyNumberBean.isCkeck = !(buyNumberBean.number% 2 == 0) ;
//                     break;
//                 case CLEARTYPE:
//                     buyNumberBean.isCkeck = false;
//                     break;
//             }
//         });
//     }
//     return list;
// }

