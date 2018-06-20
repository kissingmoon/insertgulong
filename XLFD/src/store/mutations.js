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
  }
}

export default mutations