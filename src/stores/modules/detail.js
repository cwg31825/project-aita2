
import * as types from '../mutation-types'

// 容器
const state = {
  productDatas:'',  //detail父组件请求的当前页面商品数据
  colSelected:0,   //0是index,表示第一个
  sizeSelected:0,  //0是index,表示第一个
  count:0,    //购物车里的商品数量
  carList:'',      //购物车的商品列表
  fetchLoading:false,     //全局加载状态的Loading
  selectedList:'',         //已选择的购物车商品列表
  unSelectedList:'',      //未选择的购物车商品列表,提交订单后用它替换carList
}

//更改 store 中的状态的唯一方法:提交 mutation

const mutations = {


//异步请求的数据
  [types.SET_DATAS](state,res) {
    state.productDatas = res
  },

  //详情页商品颜色的选择
  [types.CHANGE_COL_SELECTED](state,res) {
      state.colSelected = res;
  },

  //详情页商品尺寸的选择

  [types.CHANGE_SIZE_SELECTED] (state,res) {
      state.sizeSelected = res;
  },

}
export default {
  state,
  mutations
}
