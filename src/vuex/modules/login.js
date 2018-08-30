import Util from '../../util/common'
import * as types from '../types'
const state = {
  token:0,
  data:null,
  userData:null,
}

const mutations = {
  [types.CHANGE_TOKEN] (state,res) {
    state.token = res
  },
  [types.SET_TOKEN] (state,res) {
    state.data = res
  },
  [types.SET_USERDATA] (state,res) {
    state.userData = res
  }
}


export default {
  state,
  mutations
}
