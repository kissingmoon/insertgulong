import {httpUrl} from 'common/js/map';

export function getReportReview(vm,parm){
    return vm.$axios.postRequest(httpUrl.agency.reportReview,parm)
}
export function getUrlList(vm){
    return vm.$axios.postRequest(httpUrl.config.urlList)
}
export function getSelfRebate(vm){
    return vm.$axios.postRequest(httpUrl.agency.selfRebate)
}
export function getInviteCode(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.inviteCode,param)
}
export function getInviteCodeList(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.inviteCodeList,param)
}
export function deleteInviteCode(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.deleteInviteCode,param)
}
export function agentOrCustomerDetail(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.agentOrCustomerDetail,param)
}
export function reportReview(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.reportReview,param)
}
export function getSubReport(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.subReport,param)
}
export function getAgentOrders(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.getAgentOrders,param)
}
export function getMoneyFlow(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.getMoneyFlow,param)
}
export function getSubReptReview(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.subAgentReportReview,param)
}
export function viewSubordinate(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.viewSubordinate,param)
}
export function getSubRebate(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.getSubRebate,param)
}
export function getSubDinateReport(vm,param){
    return vm.$axios.postRequest(httpUrl.agency.getSubDinateReport,param)
}