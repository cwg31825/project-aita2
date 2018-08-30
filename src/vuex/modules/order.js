import Util from '../../util/common'
import * as types from '../types'
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
