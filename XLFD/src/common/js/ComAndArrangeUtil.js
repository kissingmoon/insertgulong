/**
 * 1、我们知道，排列个数的计算公式如下：
 * A (n(下),m(上))= n!/(n-m)!
 * <p>
 * 组合个数的计算公式如下：
 * C (n,m)=  n!/(m!(n-m)!)
 */

const num=["0","1", "2", "3", "4", "5", "6", "7", "8", "9"];
/**
 * 排列选择，组选和值 ,此选择里不允许三个数字都一样
 * @param dataList 待选列表
 * @param resultList 前面（resultIndex-1）个的排列结果
 * @param resultIndex 选择索引，从0开始
 */
export function arrangementZuxHZ(dataList, resultList, resultIndex,specialValue, list,intLength) {
    const resultLen = resultList.length;
    if (resultIndex >= resultLen) { // 全部选择完时，输出排列结果
        var count=0;
        const itemp=new Array(intLength);
        for (var i = 0; i < resultList.length; i++) {
            count=parseInt(resultList[i])+count;
            itemp[i]=parseInt(resultList[i]);
        }
        var temp="";
        if(intLength==3){
            if(itemp[0]==itemp[1] && itemp[1]==itemp[2]){
                return ;
            }
            itemp.sort();
            temp=""+itemp[0]+itemp[1]+itemp[2];
        }else if(intLength==2){
            if(itemp[0]==itemp[1]){
                return ;
            }
            itemp.sort();
            temp=""+itemp[0]+itemp[1];
        }

        if(specialValue==count && list.indexOf(temp) == -1){
            list.push(temp);
        }
        return ;
    }
    // 递归选择下一个
    for (var i = 0; i < dataList.length; i++) {
        resultList[resultIndex] = dataList[i];
        arrangementZuxHZ(dataList, resultList, resultIndex + 1,specialValue,list,intLength);
    }
}

/**
 * 排列选择 ,直选和值，此选择里允许有重复的数字
 * @param dataList 待选列表
 * @param resultList 前面（resultIndex-1）个的排列结果
 * @param resultIndex 选择索引，从0开始
 */
export function arrangementZhixHZ(dataList, resultList, resultIndex,specialValue,list) {
    const resultLen = resultList.length;
    if (resultIndex >= resultLen) { // 全部选择完时，输出排列结果
        var count=0;
        var temp="";
        for (var i = 0; i < resultList.length; i++) {
            count=parseInt(resultList[i])+count;
            temp=temp+resultList[i];
        }
        if(specialValue==count && list.indexOf(temp) == -1){
            list.push(temp);
        }
        return ;
    }
    // 递归选择下一个
    for (var i = 0; i < dataList.length; i++) {
        resultList[resultIndex] = dataList[i];
        arrangementZhixHZ(dataList, resultList, resultIndex + 1,specialValue,list);
    }
}

/**
 * 排列选择 ,此选择里允许有重复的数字
 * @param dataList 待选列表
 * @param resultList 前面（resultIndex-1）个的排列结果
 * @param resultIndex 选择索引，从0开始
 */
export function arrangementSelectKD(dataList, resultList, resultIndex,specialValue,list,intLength) {
    const resultLen = resultList.length;
    if (resultIndex >= resultLen) { // 全部选择完时，输出排列结果
        var count=0;
        const itemp=new Array(intLength);
        var temp="";
        for (var i = 0; i < resultList.length; i++) {
            itemp[i]=parseInt(resultList[i]);
            temp=temp+resultList[i];
        }
        itemp.sort();
        count=itemp[intLength-1]-itemp[0];
        if(specialValue==count && list.indexOf(temp) == -1){
            list.push(temp);
        }
        return ;
    }
    // 递归选择下一个
    for (var i = 0; i < dataList.length; i++) {
        resultList[resultIndex] = dataList[i];
        arrangementSelectKD(dataList, resultList, resultIndex + 1,specialValue,list,intLength);
    }
}


/**
 * 组合选择  01
 * @param data 待选列表
 * @param dataIndex 待选开始索引
 * @param resultIndex 选择索引，从0开始
 */
export function combinationSelect(list,data, dataIndex, result, resultIndex) {
    const resultLen = result.length;
    const resultCount = resultIndex + 1;
    if (resultCount > resultLen) { // 全部选择完时，输出组合结果
        var temp="";
        for (var i = 0; i < result.length; i++) {
            temp=temp+result[i]+",";
        }
        list.push(temp.substring(0,temp.lastIndexOf(",")));
        return ;
    }
    // 递归选择下一个
    for (var i = dataIndex; i < data.length + resultCount - resultLen; i++) {
        result[resultIndex] = data[i];
        combinationSelect(list,data, i + 1, result, resultIndex + 1);
    }
}

/**
 * 计算阶乘数，即n! = n * (n-1) * ... * 2 * 1
 * @param n
 * @return
 */
export function factorial(n) {
    return (n > 1) ? n * factorial(n - 1) : 1;
}

/**
 * 计算排列数，即A(n, m) = n!/(n-m)!
 * @param n
 * @param m
 * @return
 */
export function arrangement(n, m) {
    return (n >= m) ? factorial(n) / factorial(n - m) : 0;
}

/**
 * 计算组合数，即C(n, m) = n!/((n-m)! * m!)
 * @param n :数字的长度
 * @param m ：组合几位数
 * @return
 */
export function combination(n, m) {
    return (n >= m) ? factorial(n) / factorial(n - m) / factorial(m) : 0;
}


//--------------------------------------------------------------------
/**
 * 直选和值
 * @param n:从数组里选择的个数
 * @param specialValue：特殊的值
 * @return
 */
export function combineZhixhz(n,specialValue ){
    const list= [];
    var arr=new Array(n);
    arrangementZhixHZ(num, arr, 0,specialValue,list);
    return list.length;
}

/**
 * 直选跨度
 * @param n:从数组里选择的个数
 * @param specialValue：特殊的值
 * @param intLength :三星，二星
 * @return
 */
export function combineZhixKd(n,specialValue ,intLength){
    const list=[];
    var arr=new Array(n);
    arrangementSelectKD(num, arr, 0,specialValue,list,intLength);
    return list.length;
}

/**
 * 组选和值
 * @param n:从数组里选择的个数
 * @param specialValue：特殊的值
 * @param intLength :三星，二星
 * @return
 */
export function combineZuxhz(n,specialValue ,intLength){
    const list=[];
    var arr=new Array(n);
    arrangementZuxHZ(num, arr, 0,specialValue,list,intLength);
    return list.length;
}

/**
 * 获取给定数组的组合数
 * @param str：数组
 * @param n：组成几个数
 * @return  1,5,6    1,5,7
 */
export function  getCombination(str,n){
    const list=[];
    var arr=new Array(n);
    combinationSelect(list,str, 0, arr, 0);
    return list;
}

