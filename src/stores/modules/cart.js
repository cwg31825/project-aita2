import * as types from '../mutation-types'


const state = {
  cartList: {},      //加入购物车列表
  ballInCart: false
}

//getters
const getters = {
  cartList: state => state.cartList,
  ballInCart: state => state.ballInCart
}

//actions
const actions = {
  addCart({ commit }, datas) {
    commit('ADD_CART', datas)
  },
  reduceCart({ commit }, { food_id }) {
    commit('REDUCE_CART', { food_id })
  },
  deleteFood({ commit }, { food_id }) {
    commit('DELETE_CART', { food_id })
  },
  emptyCart({ commit }, { restaurant_id }) {
    commit('EMPTY_CART', { restaurant_id });
  },
  ballInCart({ commit }, boolean) {
    commit(types.BALL_IN_CART, boolean);
  },
  updateCart({ commit }, { cartList }) {
    commit(types.UPDATE_CART, { cartList });
  }
}

//mutations
const mutations = {
  [types.ADD_CART](state, datas) {
    //计算购物车 总价格、总数量
    let totalNum = 0;
    let totalPrice = 0;

    datas.map(v => {
      totalNum = totalNum + v.number * 1;
      totalPrice = totalPrice + v.goods_price * 1;
    });
    let cartList = {
      data: datas,
      totalPrice: totalPrice, //总价格
      totalNum: totalNum //总数量
    };

    //触发更新
    state.cartList = { ...cartList }
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  //减购物车
  [types.REDUCE_CART](state, { datas }) {
    let cart = state.cartList;
    let restaurant = cart[restaurant_id];
    //修改购物车总价格
    restaurant.totalPrice = Number((restaurant.totalPrice - restaurant[datas].price).toFixed(2));
    restaurant.totalNum--;
    if (restaurant.totalNum === 0) {
      delete (cart[restaurant_id]);
    } else if (restaurant[datas].num === 1) {
      delete (restaurant[datas]);
    } else {
      restaurant[datas].num--;
    }
    state.cartList = { ...cart };
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  //删除
  [types.DELETE_CART](state, { restaurant_id, food_id }) {
    let cart = state.cartList;
    let restaurant = cart[restaurant_id];
    let num = restaurant[food_id].num;
    let price = restaurant[food_id].price;
    restaurant.totalNum -= num;
    delete (restaurant[food_id]);
    if (restaurant.totalNum === 0) {
      delete (cart[restaurant_id]);
    } else {
      restaurant.totalPrice = Number((restaurant.totalPrice - price * num).toFixed(2)); //修改价格
    }
    state.cartList = { ...cart };
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  //更新购物车记录
  [types.UPDATE_CART](state, { cartList }) {
    state.cartList = { ...cartList };
  },
  //清空购物车
  [types.EMPTY_CART](state, { restaurant_id }) {
    let cart = state.cartList;
    delete cart[restaurant_id];
    state.cartList = { ...cart };
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  //小球进入购物车
  [types.BALL_IN_CART](state, boolean) {
    state.ballInCart = boolean;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
