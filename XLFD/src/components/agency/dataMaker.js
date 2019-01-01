import data  from "./data.js";

export function makeCode(vm){
    let obj={};
    obj.accType=getAccType(vm);
    for(var i in data.cp_name_conf) {
        obj[i]=vm.fandianObj[i].subFandian
    };
    return obj;
}
export function getAccType(vm){
    let level_0_activeIndx=getPointer(vm,0);
    let level_1_activeIndx=getPointer(vm,1);
    let accType=vm.titleSort[level_0_activeIndx].subSort[level_1_activeIndx].accType;
    return accType;
}
export function getPointer(vm,level){
    return vm.activePointer[level].activeindx;
}