import {pk10Clolr} from 'common/js/map.js'
//[1,2,3]  9   
export default function (kj_code,type,extraPrams){
    if(type=='3'){
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
    else if(type=="9"){
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
    else if(type=='1'){
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
    else if(type=='10'){
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
    else if(type=='6'){
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
    else if(type=='11'){
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