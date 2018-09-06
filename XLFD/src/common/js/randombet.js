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
        else if(wf_flag=="ssc_lhd_n1"){
            list.map(function(v,k){ 
                        switch(v){
                            case 0:{newList.push('十个');break;}
                            case 1:{newList.push('百个');break;}
                            case 2:{newList.push('百十');break;}
                            case 3:{newList.push('千个');break;}
                            case 4:{newList.push('千十');break;}
                            case 5:{newList.push('千百');break;}
                            case 6:{newList.push('万个');break;}
                            case 7:{newList.push('万十');break;}
                            case 8:{newList.push('万百');break;}
                            case 9:{newList.push('万千');break;}
                        }
            });
        }
        else if(wf_flag=="ssc_lhd_n2"){
            list.map(function(v,k){ 
                        switch(v){
                            case 0:{newList.push('龙');break;}
                            case 1:{newList.push('虎');break;}
                            case 2:{newList.push('合');break;}
                        }
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
        else if(wf_flag=="xglhc"||wf_flag=="xglhc_tema_xuma"){
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
                            case 3:{tempList.push('单');break;}
                            case 4:{tempList.push('双');break;}
                            case 5:{tempList.push('大单');break;}
                            case 6:{tempList.push('小单');break;}
                            case 7:{tempList.push('大双');break;}
                            case 8:{tempList.push('小双');break;}
                            case 9:{tempList.push('极大');break;}
                            case 10:{tempList.push('极小');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xy28_qtbs_bs"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push('红波');break;}
                            case 1:{tempList.push('绿波');break;}
                            case 2:{tempList.push('蓝波');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xglhc_texiao_tx"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push('鼠');break;}
                            case 1:{tempList.push('牛');break;}
                            case 2:{tempList.push('虎');break;}
                            case 3:{tempList.push('兔');break;}
                            case 4:{tempList.push('龙');break;}
                            case 5:{tempList.push('蛇');break;}
                            case 6:{tempList.push('马');break;}
                            case 7:{tempList.push('羊');break;}
                            case 8:{tempList.push('猴');break;}
                            case 9:{tempList.push('鸡');break;}
                            case 10:{tempList.push('狗');break;}
                            case 11:{tempList.push('猪');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xy28_tmb3_b3"||wf_flag=="xy28_tmtm_tm"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        tempList.push((v-1).toString());                     
                    })
                    newList.push(tempList)
            });
        }
        return newList
    },
    changeToPinYin:function(list,wf_flag){
        var newList=[]
        if(wf_flag=="xy28_qthh_hh"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 1:{tempList.push('da');break;}
                            case 2:{tempList.push('xiao');break;}
                            case 3:{tempList.push('dan');break;}
                            case 4:{tempList.push('shuang');break;}
                            case 5:{tempList.push('dadan');break;}
                            case 6:{tempList.push('xiaodan');break;}
                            case 7:{tempList.push('dashaung');break;}
                            case 8:{tempList.push('xiaoshuang');break;}
                            case 9:{tempList.push('jida');break;}
                            case 10:{tempList.push('jixiao');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xy28_qtbs_bs"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push('hongbo');break;}
                            case 1:{tempList.push('lvbo');break;}
                            case 2:{tempList.push('lanbo');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xglhc_texiao_tx"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push('shu');break;}
                            case 1:{tempList.push('niu');break;}
                            case 2:{tempList.push('hu');break;}
                            case 3:{tempList.push('tu');break;}
                            case 4:{tempList.push('long');break;}
                            case 5:{tempList.push('she');break;}
                            case 6:{tempList.push('ma');break;}
                            case 7:{tempList.push('yang');break;}
                            case 8:{tempList.push('hou');break;}
                            case 9:{tempList.push('ji');break;}
                            case 10:{tempList.push('gou');break;}
                            case 11:{tempList.push('zhu');break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        return newList
    },
    computedStr:function(list,wf_flag){
        var newList=[]
        if(wf_flag=="xy28_qtbs_bs"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push("01&nbsp;&nbsp;02&nbsp;&nbsp;07&nbsp;&nbsp;08<br>12&nbsp;&nbsp;13&nbsp;&nbsp;18&nbsp;&nbsp;19<br>23&nbsp;&nbsp;24&nbsp;&nbsp;29&nbsp;&nbsp;30<br>34&nbsp;&nbsp;35&nbsp;&nbsp;30&nbsp;&nbsp;45&nbsp;&nbsp;46");break;}
                            case 1:{tempList.push("05&nbsp;&nbsp;06&nbsp;&nbsp;11&nbsp;&nbsp;16<br>17&nbsp;&nbsp;21&nbsp;&nbsp;22&nbsp;&nbsp;27<br>28&nbsp;&nbsp;32&nbsp;&nbsp;33&nbsp;&nbsp;38<br>39&nbsp;&nbsp;43&nbsp;&nbsp;44&nbsp;&nbsp;49");break;}
                            case 2:{tempList.push("03&nbsp;&nbsp;04&nbsp;&nbsp;09&nbsp;&nbsp;10<br>14&nbsp;&nbsp;15&nbsp;&nbsp;20&nbsp;&nbsp;25<br>26&nbsp;&nbsp;31&nbsp;&nbsp;36&nbsp;&nbsp;37<br>41&nbsp;&nbsp;42&nbsp;&nbsp;47&nbsp;&nbsp;48");break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xglhc_texiao_tx"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push("11&nbsp;&nbsp;23&nbsp;&nbsp;35&nbsp;&nbsp;47");break;}
                            case 1:{tempList.push("10&nbsp;&nbsp;22&nbsp;&nbsp;34&nbsp;&nbsp;46");break;}
                            case 2:{tempList.push("9&nbsp;&nbsp;21&nbsp;&nbsp;33&nbsp;&nbsp;45");break;}
                            case 3:{tempList.push("8&nbsp;&nbsp;20&nbsp;&nbsp;32&nbsp;&nbsp;44");break;}
                            case 4:{tempList.push("7&nbsp;&nbsp;19&nbsp;&nbsp;31&nbsp;&nbsp;43");break;}
                            case 5:{tempList.push("6&nbsp;&nbsp;18&nbsp;&nbsp;30&nbsp;&nbsp;42");break;}
                            case 6:{tempList.push("05&nbsp;&nbsp;17&nbsp;&nbsp;29&nbsp;&nbsp;41");break;}
                            case 7:{tempList.push("04&nbsp;&nbsp;16&nbsp;&nbsp;28&nbsp;&nbsp;40");break;}
                            case 8:{tempList.push("03&nbsp;&nbsp;15&nbsp;&nbsp;27&nbsp;&nbsp;39");break;}
                            case 9:{tempList.push("02&nbsp;&nbsp;14&nbsp;&nbsp;26&nbsp;&nbsp;38");break;}
                            case 10:{tempList.push("01&nbsp;&nbsp;13&nbsp;&nbsp;25&nbsp;&nbsp;37&nbsp;&nbsp;49");break;}
                            case 11:{tempList.push("12&nbsp;&nbsp;24&nbsp;&nbsp;36&nbsp;&nbsp;48");break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        return newList
    },
    computedPl:function(list,wf_flag){
        var newList=[]
        if(wf_flag=="xy28_qthh_hh"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 1:{tempList.push(1.971);break;}
                            case 2:{tempList.push(1.971);break;}
                            case 3:{tempList.push(1.971);break;}
                            case 4:{tempList.push(1.971);break;}
                            case 5:{tempList.push(3.551);break;}
                            case 6:{tempList.push(3.551);break;}
                            case 7:{tempList.push(3.551);break;}
                            case 8:{tempList.push(3.551);break;}
                            case 9:{tempList.push(10);break;}
                            case 10:{tempList.push(10);break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xy28_qtbs_bs"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        tempList.push(2.95);                   
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xglhc_sebo_sebo"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push(2.8);break;}
                            case 1:{tempList.push(2.92);break;}
                            case 2:{tempList.push(2.92);break;}
                        }                    
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xglhc_texiao_tx"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 0:{tempList.push(11.83);break;}
                            case 1:{tempList.push(11.83);break;}
                            case 2:{tempList.push(11.83);break;}
                            case 3:{tempList.push(11.83);break;}
                            case 4:{tempList.push(11.83);break;}
                            case 5:{tempList.push(11.83);break;}
                            case 6:{tempList.push(11.83);break;}
                            case 7:{tempList.push(11.83);break;}
                            case 8:{tempList.push(11.83);break;}
                            case 9:{tempList.push(9.42);break;}
                            case 10:{tempList.push(9.8);break;}
                            case 11:{tempList.push(11.83);break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        else if(wf_flag=="xy28_tmtm_tm"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                        switch(v){
                            case 1:case 28:{tempList.push(940);break;}
                            case 2:case 27:{tempList.push(313);break;}
                            case 3:case 26:{tempList.push(156);break;}
                            case 4:case 25:{tempList.push(94);break;}
                            case 5:case 24:{tempList.push(62);break;}
                            case 6:case 23:{tempList.push(44);break;}
                            case 7:case 22:{tempList.push(33);break;}
                            case 8:case 21:{tempList.push(26);break;}
                            case 9:case 20:{tempList.push(20.9);break;}
                            case 10:case 19:{tempList.push(17.1);break;}
                            case 11:case 18:{tempList.push(14.9);break;}
                            case 12:case 17:{tempList.push(13.5);break;}
                            case 13:case 16:{tempList.push(12.8);break;}
                            case 14:case 15:{tempList.push(12.5);break;}
                        }                     
                    })
                    newList.push(tempList)
            });
        }
        return newList
    },
    changeToNum:function(list,wf_flag){
        var newList=[]
        if(wf_flag=="xy28_tmb3_b3"||wf_flag=="xy28_tmtm_tm"){
            list.map(function(v,k){ 
                let tempList=[];
                    v.map(function(v){
                       tempList.push(v-1);
                                                 
                    })
                    newList.push(tempList)
            });
        }
        return newList
    }
}