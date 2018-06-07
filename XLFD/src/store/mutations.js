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
  }
}

export default mutations