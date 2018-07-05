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
  }
}

export default mutations