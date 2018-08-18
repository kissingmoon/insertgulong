export default {
    conf:{
        listType:1,//一维或者二维数组,1表示一维数组，2表示二维数组
        minNum:0,//随机数最小
        maxNum:9,//随机数最大
        listLength:0,//第一维数组的长度，如果是一个数字就是固定长度，如果是字符串,前一个数字表示总长为5,后面是随机长度，比如5r1，总长5，随机其中一个元素有值
        childListLength:0//第二维数组的长度，一个数的时候表示所有子数组长度，一个数组分别表示每一位子数组长度
    },
    randomList:function(listType,minNum,maxNum,nosame,listLength,childListLength){
        var _this=this;
        if(nosame){            
            if(listType===1){
                let totalList=this.creatListByNum(minNum,maxNum);
                let randList=this.getArrayItemsDiff(totalList,listLength)
                return randList;
            }
            if(listType===2){
                let childListFlag=childListLength instanceof Array
                if(typeof listLength == 'number'){
                    let totalList=this.creatListByNum(minNum,maxNum);
                    let randChildList=[];
                    let randList=new Array(listLength)
                    for(let i=0;i<listLength;i++){
                        randChildList=this.getArrayItemsDiff(totalList,childListFlag?childListLength[i]:childListLength)
                        randList[i]=randChildList
                        totalList=this.concatDiff(totalList,randChildList)
                    }
                    return randList;
                }
                if(typeof listLength == 'string'){
                    let midNum=listLength.indexOf("r")                
                    let beforeNum=parseInt(listLength.substring(0,midNum))
                    let afterNum=parseInt(listLength.substring(midNum+1,listLength.length))
                    let totalList=this.creatListByNum(minNum,maxNum)
                    let randList=new Array(beforeNum)
                    let randChildList=[]
                    let keyList=this.creatListBykey(beforeNum)
                    let randomKeyList=this.getRandArrElets(keyList,afterNum)
                    for(let i=0;i<beforeNum;i++){
                        randChildList=this.getArrayItemsDiff(totalList,childListFlag?childListLength[i]:childListLength)
                        totalList=this.concatDiff(totalList,randChildList)
                        if(randomKeyList.indexOf(i)!=-1){
                            randList[i]=randChildList
                        }
                        else{
                            randList[i]=[]
                        }
                    }
                    return randList;
                }
            }
        }
        else{
            if(listType===1){
                let totalList=this.creatListByNum(minNum,maxNum);
                let randList=this.getArrayItems(totalList,listLength);
                return randList;
            }
            if(listType===2){
                let childListFlag=childListLength instanceof Array
                if(typeof listLength == 'number'){
                    // let randList=[]
                    // let randChildList=[]
                    // for(let i=0;i<listLength;i++){                    
                    //     randChildList=[]
                    //     for(let j=0;j<(childListFlag?childListLength[i]:childListLength);j++){
                    //         randChildList.push(_this.randomNum(minNum,maxNum))
                    //     }
                    //     randList.push(randChildList)
                    // }
                    // return randList;
                    let totalList=this.creatListByNum(minNum,maxNum);
                    let randChildList=[];
                    let randList=[]
                    for(let i=0;i<listLength;i++){
                        randChildList=this.getArrayItemsDiff(totalList,childListFlag?childListLength[i]:childListLength)
                        randList.push(randChildList)
                    }
                    return randList;
                }
                if(typeof listLength == 'string'){
                    let midNum=listLength.indexOf("r")                
                    let beforeNum=parseInt(listLength.substring(0,midNum))
                    let afterNum=parseInt(listLength.substring(midNum+1,listLength.length))
                    let totalList=this.creatListByNum(minNum,maxNum)
                    let randList=new Array(beforeNum)
                    let randChildList=[]
                    let keyList=this.creatListBykey(beforeNum)
                    let randomKeyList=this.getRandArrElets(keyList,afterNum)
                    for(let i=0;i<beforeNum;i++){
                        randChildList=this.getArrayItemsDiff(totalList,childListFlag?childListLength[i]:childListLength)
                        if(randomKeyList.indexOf(i)!=-1){
                            randList[i]=randChildList
                        }
                        else{
                            randList[i]=[]
                        }
                    }
                    return randList;
                }
            }

        }
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
    //从数组中选出几个不重复的元素，第一个参数是数组，第二个参数是要选出来的元素个数
    getRandArrElets: function(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    },
    creatListBykey: function(lgth) {
        return Array(lgth).join(",").split(",").map(function(key,index){return index;})
    },
    getArrayItems:function(arr, num){
        var newArray=[];
        for(let i=0;i<num;i++){
            newArray[i]=arr[this.randomNum(0,arr.length-1)]
        }
        return newArray;
    },    
    //从一个给定的数组arr中,随机返回num个不重复项
    getArrayItemsDiff: function (arr, num) {
        //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        var return_array = new Array();
        for (var i = 0; i<num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length>0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                return_array[i] = temp_array[arrIndex];
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return return_array;
    },
    creatListByNum: function(minNum,maxNum) {
        var tempList=[]
        for(let i=minNum;i<=maxNum;i++){
            tempList.push(i)
        }
        return tempList
    },
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
    changeToChar:function(list,wf_flag){
        var newList=[]
        if(wf_flag=="ssc"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push('大');break;}
                            case 1:{tempList.push('小');break;}
                            case 2:{tempList.push('单');break;}
                            case 3:{tempList.push('双');break;}
                        }
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="11x5"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push('5单0双');break;}
                            case 1:{tempList.push('4单1双');break;}
                            case 2:{tempList.push('3单2双');break;}
                            case 3:{tempList.push('2单3双');break;}
                            case 4:{tempList.push('1单4双');break;}
                            case 5:{tempList.push('0单5双');break;}
                        }
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xglhc"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        if(v<=9){
                            tempList.push("0"+v)
                        }
                        else{
                            tempList.push(v.toString())
                        }
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="k3"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        let charNum=v.toString()
                        tempList.push(charNum+charNum+charNum)                        
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="pk10_lhd"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 1:{tempList.push('龙');break;}
                            case 2:{tempList.push('虎');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xy28_qthh_hh"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 1:{tempList.push('大');break;}
                            case 2:{tempList.push('小');break;}
                            case 3:{tempList.push('大');break;}
                            case 4:{tempList.push('小');break;}
                            case 5:{tempList.push('大');break;}
                            case 6:{tempList.push('小');break;}
                            case 7:{tempList.push('大');break;}
                            case 8:{tempList.push('小');break;}
                            case 9:{tempList.push('大');break;}
                            case 10:{tempList.push('小');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        return newList
    }
}