import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import cart from './modules/cart'
import address from './modules/address'
import category from './modules/category'
import restaurant from './modules/restaurant'
import detail from './modules/detail'
import order from './modules/order'
import login from './modules/login'

export default new Vuex.Store({
  modules: {
    cart,
    address,
    category,
    restaurant,
    detail,
    order,
    login
  }
})
