import * as types from '../mutation-types'


const state = {
  poi_info: {},
  restaurant_info: {},    //商店的信息 包括 售卖的食物
}

//getters
const getters = {
  restaurant_info: state => state.restaurant_info,
  poi_info: state => state.poi_info
}

//mutations
const mutations = {
  //记录当前商店的信息
  [types.RECORD_RESTAURANT](state, poi_info) {
    state.poi_info = {...poi_info}
  },
}

export default {
  state,
  getters,
  mutations
}
