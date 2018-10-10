export default {
    conf:{
        listType:1,//一维或者二维数组,1表示一维数组，2表示二维数组
        minNum:0,//随机数最小
        maxNum:9,//随机数最大
        nosame:true,//是否允许重复
        listLength:0,//第一维数组的长度，如果是一个数字就是固定长度，如果是字符串,前一个数字表示总长为5,后面是随机长度，比如5r1，总长5，随机其中一个元素有值
        childListLength:0//第二维数组的长度，一个数的时候表示所有子数组长度，一个数组分别表示每一位子数组长度
    },
    randomList:function(listType,minNum,maxNum,nosame,listLength,childListLength){
        var totalList,randList;
        if(listType===1){
            totalList=this.creatListByNum(minNum,maxNum);
            if(nosame){
                randList=this.getArrayItemsDiff(totalList,listLength);
            }
            else{
                randList=this.getArrayItems(totalList,listLength);
            }
        }
        if(listType===2){
            var childListFlag=childListLength instanceof Array
            if(typeof listLength == 'number'){
                let randChildList=[];
                totalList=this.creatListByNum(minNum,maxNum);
                randList=[]
                for(let i=0;i<listLength;i++){
                    randChildList=this.getArrayItemsDiff(totalList,childListFlag?childListLength[i]:childListLength)
                    if(nosame){ 
                        totalList=this.concatDiff(totalList,randChildList)
                    }
                    randList.push(randChildList)
                }
            }
            if(typeof listLength == 'string'){
                let midNum=listLength.indexOf("r")                
                let beforeNum=parseInt(listLength.substring(0,midNum))
                let afterNum=parseInt(listLength.substring(midNum+1,listLength.length))
                totalList=this.creatListByNum(minNum,maxNum)
                randList=new Array(beforeNum)
                let randChildList=[]
                let keyList=this.creatListBykey(beforeNum)
                let randomKeyList=this.getArrayItemsDiff(keyList,afterNum)
                for(let i=0;i<beforeNum;i++){
                        randChildList=this.getArrayItemsDiff(totalList,childListFlag?childListLength[i]:childListLength)
                    if(nosame){  
                        totalList=this.concatDiff(totalList,randChildList)
                    }
                    if(randomKeyList.indexOf(i)!=-1){
                        randList[i]=randChildList
                    }
                    else{
                        randList[i]=[]
                    }
                }
            }
        }
        return randList;
    },
    //生成从minNum到maxNum的随机数
    randomNum:function (minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    },
    //传入两个整数，返回新数组，根据传入参数创建数组
    //如creatListByNum(0,3),返回[0,1,2,3]
    creatListByNum: function(minNum,maxNum) {
        var tempList=[]
        for(let i=minNum;i<=maxNum;i++){
            tempList.push(i)
        }
        return tempList
    },
    //创建指定长度的数组
    creatListBykey: function(lgth) {
        return Array(lgth).join(",").split(",").map(function(key,index){return index;})
    },
    //从一个给定的数组arr中,随机返回num个元素，可能会重复
    getArrayItems:function(arr, num){
        var newArray=[];
        for(let i=0;i<num;i++){
            newArray[i]=arr[this.randomNum(0,arr.length-1)]
        }
        return newArray;
    },    
    //从一个给定的数组arr中,随机返回num个不重复项
    getArrayItemsDiff: function (arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i<num; i++) {
            if (temp_array.length>0) {
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    },
    //传入两个数组，返回一个新数组
    //判断第二个数组是否有第一个数组中的元素，返回第一个数组中没有的元素
    //如concatDiff([1,2,3,6],[1,2,3,4,5])，返回[6]
    concatDiff: function(arr1, arr2) {
        var set1 = new Set(arr1);
        var set2 = new Set(arr2);    
        var subset = [];    
        for (let item of set1) {
            if (!set2.has(item)) {
                subset.push(item);
            }
        }    
        return subset;
    },
    //判断一个二维数组中是否全部是空数组
    //比如[[],[],[]]
    judgeTwoArray: function(arr){
        for(let i=0,l=arr.length;i<l;i++){
            if(arr[i].length!=0){
                return false
            }
        }
        return true;
    }
}