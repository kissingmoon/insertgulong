import {pk10Clolr} from 'common/js/map.js'

export default function (kj_code,type,extraPrams){
    if(type.indexOf('11x5')!=-1){
        let tempList=Array.isArray(kj_code)?kj_code:kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-11x5"
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('k3')!=-1){
        //let tempList=kj_code.split(',')
        let tempList=Array.isArray(kj_code)?kj_code:kj_code.split(',')
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
        //let tempList=kj_code.split(',')
        let tempList=Array.isArray(kj_code)?kj_code:kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-ssc"
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('pk10')!=-1){
        //let tempList=kj_code.split(',')
        let tempList=Array.isArray(kj_code)?kj_code:kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-pk10"
            tempObj.bg={background:pk10Clolr[v]}
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('lhc')!=-1){
        //let tempList=kj_code.split(',')
        let tempList=Array.isArray(kj_code)?kj_code:kj_code.split(',')
        tempList.splice(6, 0, "+"); 
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-lhc"
            if(k==tempList.length-2){
                tempObj.bg={color:'black',fontSize:'0.6rem',width:'0.4rem'}
            }
            if(k==tempList.length-1){
                tempObj.bg={background:'grey'}
            }
            else{
                extraPrams.map((v1,k1)=>{
                    if(v1.value.indexOf(v)!=-1){
                        switch(v1.color){
                            case 'xglhc_blue':tempObj.bg={background:'blue'};break;
                            case 'xglhc_red':tempObj.bg={background:'red'};break;
                            case 'xglhc_green':tempObj.bg={background:'green'};break;
                        }                    
                    }
                })
            }
            result.push(tempObj)
        })
        return result;
    }
    else if(type.indexOf('28')!=-1){
        //let tempList=kj_code.split(',')
        let tempList=Array.isArray(kj_code)?kj_code:kj_code.split(',')
        let result=[]
        tempList.map(function(v,k){
            let tempObj={}
            tempObj.val=v
            tempObj.clas="last-draw-xy28"
            result.push(tempObj)
        })
        return result;
    }
}