export default {
    conf:{
        kind:'',//彩种名称
        listType:'',//一维或者二维数组,1表示一维数组，2表示二维数组
        minNum:0,//随机数最小
        maxNum:9,//随机数最大
        listLength:0
    },
    randomList:function(listtype,minNum,maxNum,listLength){
        var _this=this;
        if(listtype===1){
            let randList=[]
            for(let i=0;i<listLength;i++){
                randList.push(_this.randomNum(minNum,maxNum))
            }
            return randList;
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
    }
}