import * as types from './mutation-types'

const mutations = {
  [types.SET_HEADER](state, param) {
    state.header = param;
  },
  [types.SET_ACCOUNT](state, param) {
    state.account = param;
  },
  [types.SET_USER_TOKEN](state, param) {
    state.user_token = param;
  },
  [types.SET_MD5_SALT](state, param) {
    state.md5_salt = param;
  },
  [types.SET_SHOW_TIME](state, param) {
    state.show_time = param;
  },
  [types.SET_SHOW_PICKER](state, param) {
    state.show_picker = param;
  },
  [types.SET_TIP](state, param) {
    state.tip = param;
  },
  [types.SET_IS_DEBUGGER](state, param) {
    state.is_debugger = param;
  },
  [types.SET_API_BASE](state, param) {
    state.api_base = param;
  },
  [types.SET_MESSAGE_COUNT](state, param) {
    state.message_count = param;
  },
  [types.SET_HD_QIANDAO](state, param) {
    state.hd_qiandao = param;
  },
  [types.SET_HD_CHARGE](state, param) {
    state.hd_charge = param;
  },
  [types.SET_HD_ZLCJ](state, param) {
    state.hd_zlcj = param;
  },
  [types.SET_HD_XRKH](state, param) {
    state.hd_xrkh = param;
  },
  [types.SET_HD_FXPYQ](state, param) {
    state.hd_fxpyq = param;
  },
  [types.SET_HAS_PHONE](state, param) {
    state.has_phone = param;
  },
  [types.SET_SHOW_SEARCH](state, param) {
    state.show_search = param;
  },
  [types.SET_HREF_TYPE](state, param) {
    state.href_type = param;
  },
  [types.SET_USER_ID](state, param) {
    state.user_id = param;
  },
  [types.SET_XGLHC_COLOR](state, param) {
    state.xglhc_color = param;
  },
  //  设置添加彩种页面底部导航保留首页当前样式
  [types.SET_NAV_ACTIVE](state, param){
    state.nav_active = param;
  },
  //  设置房间模式投注记录是否显示
  [types.SET_RECORD_SHOW](state, param){
    state.recordShow = param;
  },
  //  设置房间模式投注记录详情页是否显示
  [types.SET_RECORD_DETAIL_SHOW](state, param){
    state.recordDetailShow = param;
  },
  [types.SET_RECORD_CHOOSE](state, param){
    state.recordChooseShow = param;
  },
  //  设置房间模式底部nav是否显示
  [types.SET_FOOT_SHOW](state, param){
    state.isNavShow = param;
  },
  [types.SET_LOADING_SHOW](state, param){
    state.showLoading = param;
  },
  [types.SET_HEARDERADD_SHOW](state, param){
    state.showHeaderAdd = param;
  },
  [types.SET_MODEL_SHOW](state, param){
    state.showModel = param;
  },
  [types.SET_IOS_GOBACK](state, param){
    state.iosGoBack = param;
  }, 
  [types.SET_DOWNLOAD_URL](state, param){
    state.downloadUrl = param;
  }
}

export default mutations