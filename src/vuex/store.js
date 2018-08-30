//store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 头部分类
import detail from './modules/detail'
import category from './modules/category'
import login from './modules/login'
import order from './modules/order'

//省、市、区县
import address from './modules/address'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    category,
    login,
    order,
    address
  }
})
