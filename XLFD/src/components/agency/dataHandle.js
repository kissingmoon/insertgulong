import data  from "./data.js";

export function getResData(res){
    if(res.data && !res.data.errorCode){
        return res.data;
    }
}
export function createSelfRebate(res){
    if(res.data && !res.data.errorCode){
        let obj=Object.assign({},res.data)
        for(var i in data.cp_name_conf) {
            obj[i]={};
            obj[i].fandian=res.data[i];
            obj[i].name=data.cp_name_conf[i];
            obj[i].subFandian="";
       }
        return obj;
    }
}
export function getCurrentTable(res){
    if(res.data && !res.data.errorCode){
        return res.data;
    }
}
export function filterByHeader(tableData,header){
    let list=[];
    tableData.map((v,k)=>{
        var obj={};
        header.map((v1,k1)=>{
            obj[v1.field]= v[v1.field]
        })
        list.push(obj);
    })
    return list;
}
export function fliterAgReport(res){
    if(res.data && !res.data.errorCode){
        let reportObj=res.data;
        let obj={}
        for(var i in data.report_conf) {
            if(reportObj[i]!=undefined){
                obj[i]={}
                obj[i].name=data.report_conf[i]
                obj[i].val=reportObj[i]
            }
        }
        return obj;
    }
}
export function HandleTradDetail(res){
    if(res.data && !res.data.errorCode){
        let tradDetailList=res.data.list;
        if(Array.isArray(tradDetailList)){
            tradDetailList.map((v,k)=>{
                if(v.change_type=="01"){
                    v.charge_name="充值"
                }
            })
            return tradDetailList;
        }else{
            return []
        }
    }
}