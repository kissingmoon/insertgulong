import {httpUrl} from 'common/js/map';

export function getReportReview(vm,parm){
    return vm.$axios.postRequest(httpUrl.agency.reportReview,parm)
}
export function getUrlList(vm){
    return vm.$axios.postRequest("/config/url-list")
}
export function getSelfRebate(vm){
    return vm.$axios.postRequest('/v7/agt/selfRebate')
}
export function getInviteCode(vm,param){
    return vm.$axios.postRequest('/v7/agt/inviteCode',param)
}
export function getInviteCodeList(vm,param){
    return vm.$axios.postRequest('v7/agt/inviteCodeList',param)
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