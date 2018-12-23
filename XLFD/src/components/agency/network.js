import {httpUrl} from 'common/js/map';

export function getReportReview(vm,parm){
    return vm.$axios.postRequest(httpUrl.agency.reportReview,parm)
}
export function getUrlList(vm){
    return vm.$axios.postRequest("/config/url-list")
}