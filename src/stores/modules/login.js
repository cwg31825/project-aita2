
import * as types from '../mutation-types'
const state = {
  userData:null,
}

const mutations = {
  [types.SET_USERDATA] (state,res) {
    state.userData = res
  }
}


export default {
  state,
  mutations
}
