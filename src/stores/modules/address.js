import * as types from '../mutation-types'

const state = {
  locationReady: false,   //定位是否完成
  deliveryAddress: {}
}

const getters = {
  address: state => state.address,
  locationReady: state => state.locationReady,
  deliveryAddress: state => state.deliveryAddress
}

const actions = {
  clearAddress({commit, state}) {
    commit(types.CLEAR_ADDRESS);
  },
  recodeDeliveryAddress({commit}, address) {
    commit(types.RECORD_DELIVERY_ADDRESS, address);    //定位完成 拉取商店
  }
}

const mutations = {
  [types.CLEAR_ADDRESS](state) {
    let address = {province: '', city: '', district: ''}
    state.address = {...address};
  },
  [types.RECORD_ADDRESS](state, address) {
    state.address = {...address}
  },
  [types.RECORD_DELIVERY_ADDRESS](state, address) {
    state.deliveryAddress = {...address};
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
