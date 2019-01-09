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
                if(v.change_money>0){
                    let data = v.change_money
                    v.change_money={}
                    v.change_money.data="+"+data
                    v.change_money.style={
                        color:'#DA1C36'
                    }
                }else{
                    let data = v.change_money
                    v.change_money={}
                    v.change_money.data=data==0?data:"-"+data
                    v.change_money.style={
                        color:'#08D700'
                    }
                }
            })
            return tradDetailList;
        }else{
            return []
        }
    }
}
export function setTimeHeader(vm,headerConfig,indx){
    headerConfig[vm.$route.path].currentIndx=indx
    let headObj = Object.assign({},headerConfig[vm.$route.path]);
    return headObj
}
export function handleTradDetail(res){
    if(res.data && !res.data.errorCode){
        res.data.list.map((v,k)=>{
            let flag = v.change_type.data;
            switch(flag){
                case "01":v.change_type.name="充值";break;
                case "02":v.change_type.name="提现";break;
            }
        })
        return res.data;
    }
}
export function handleSubRept(res){
    if(res.data && !res.data.errorCode){
        res.data.list.map((v,k)=>{
            let symbol = v.income
            if(symbol>0){
                v.income={}
                v.income.data=symbol;
                v.income.style={
                    color:"#DA1C36"
                };
            }else{
                v.income={}
                v.income.data=symbol;
                v.income.style={
                    color:"#08D700"
                };
            }
            symbol = v.usrId
            v.usrId={}
            v.usrId.data=symbol;
            v.usrId.style={
                color:"#1C91DA"
            };
        })
        return res.data;
    }
}
export function handleBetDetail(res){
    if(res.data && !res.data.errorCode){
        let List=res.data.list
        if(List&&List.length>0){
            List.map((v,k)=>{
                let flag = v.status
                var statFlag;
                if(flag){
                    switch(flag){
                        case"0":statFlag="未开奖";break;
                        case"1":statFlag="未中奖";break;
                        case"2":statFlag="撤销";break;
                        case"3":statFlag="中奖";break;
                        case"4":statFlag="异常";break;
                    }
                }
                else{
                    statFlag=""
                }
                v.statFlag=statFlag;
            })
        }
        return List;
    }
}