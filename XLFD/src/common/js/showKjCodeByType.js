export default function (kj_info,type){
    console.log(kj_info.kj_code.split(','))
    console.log(type)
    if(type.indexOf('11x5')!=-1){
        let tempList=kj_info.kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-11x5"
            switch(v){
                case "01":{tempObj.bg={background:'red'};break;}
                case "02":{tempObj.bg={background:'blue'};break;}
                case "03":{tempObj.bg={background:'blue'};break;}
                case "04":{tempObj.bg={background:'green'};break;}
                case "05":{tempObj.bg={background:'blue'};break;}
                case "06":{tempObj.bg="";break;}
                case "07":{tempObj.bg="";break;}
                case "08":{tempObj.bg="";break;}
                case "09":{tempObj.bg="";break;}
                case "10":{tempObj.bg="";break;}
                case "11":{tempObj.bg="";break;}
            }
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('k3')!=-1){
        let tempList=kj_info.kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=""
            tempObj.bg={background:'url(' + require('./../img/'+v+'.png') + ') no-repeat',backgroundSize:"100% 100%"}
            tempObj.clas="last-draw-k3"
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('ssc')!=-1){
        let tempList=kj_info.kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-11x5"
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('pk10')!=-1){
        let tempList=kj_info.kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-11x5"
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('lhc')!=-1){
        let tempList=kj_info.kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-11x5"
            result.push(tempObj)
        })
        return result;
    }
}