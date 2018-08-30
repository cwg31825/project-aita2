
import * as types from '../types'
import Vue from 'vue'

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
/*
  购物车逻辑:
      unSelectedList：未打钩的购物车商品列表
      SelectedList：已勾选的购物车商品列表
      carList:购物车商品列表
      当支付成功之后,购物车列表需要减掉SelectedList，留下unSelectedList
      直接用unSelectedList替换当前carList即可
*/
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

let vm = new Vue({});

// 如同计算属性,处理state的某个状态
const getters = {

    selectedList(state) {
        // choseBool为真的商品 即打钩的商品
       if(state.carList!=='') {
         let arr = state.carList.filter((ele)=>{
           return ele.choseBool == true
         });
         return arr
       }
    },

    unSelectedList(state) {
      if(state.carList !=='') {
        let arr = state.carList.filter((ele)=>{
          return ele.choseBool == false
        });
        return arr
      }
    }

}




export default {
  state,
  getters,
  mutations
}
