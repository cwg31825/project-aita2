import * as types from '../mutation-types'
const state = {
  selected:1
}

const mutations = {
  [types.CHANGE_SELECTED] (state,res) {
    state.selected = res
  }
}


export default {
  state,
  mutations
}
