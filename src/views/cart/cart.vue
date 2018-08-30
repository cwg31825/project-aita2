<template lang="html">

    <div class="car">
       <v-header :title="name" :fixed="true"></v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something v-if="cartList.data" :list="cartList" :getCartlist="getCartlist" v-on:childByValue="childByValue" ></v-something>
      <v-nothing v-else></v-nothing>
      
      <v-goods :goods="hotdatas.data" :num="6"  :title="goodsTitle"></v-goods>
        <footer class="footer">

            <div class="footer-result">
              <p>共件 {{selectFood.totalNum}} 金额：</p>
              <p>{{selectFood.totalPrice}}元</p>
            </div>
            <router-link :to="{ name:'搜索页',params: { type:1}}" class="footer-goon" >
              继续购物
            </router-link>
            <a class="footer-pay" @click="submit">
              去结算
            </a>
          </footer>
      <v-footer></v-footer>
      <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
    </div>
</template>

<script>
import Nothing from "./nothing.vue";
import Something from "./something.vue";

import { getIndex, getCartlist } from "@/api/request";
import { getInfo } from "@/utils/auth";
import {mapGetters} from 'vuex'
export default {
  computed: {
...mapGetters([
        'cartList'
      ]),
  },
  components: {
    "v-nothing": Nothing,
    "v-something": Something,
  },
  data() {
    return {
      name:"购物车",
      goodsTitle: "热门推荐",
      hotdatas: "",
      totalNum:0,
      totalPrice:0,
      alertText:'',
      showTip: false,
      selectFood: {data:[],totalNum:0,totalPrice:0},   //选中列表
    };
  },
  methods: {
    submit(data) { //提交订单
      if(this.selectFood.totalNum>0){
          localStorage.setItem('confirmOrderData', JSON.stringify(this.selectFood));
          this.$router.push({path: '/confirmOrder'});
        }else{
        this.alertText = '请选择商品';
        this.showTip = true
        }
      },
    childByValue (childValue) {
        // childValue就是子组件传过来的值
        this.selectFood = childValue
      },
    getCartlist(key) {
      getCartlist({ key: key }).then(res => {
        if (res.data.code == "1") {
          //计算购物车 总价格、总数量
          let d = res.data.data;
          d.map(v => {
            this.totalNum = this.totalNum + v.number * 1;
            this.totalPrice = this.totalPrice +( v.goods_price * 1 )*v.number * 1;
          });
          let datas = {
            data: res.data.data[0]?res.data.data:'',
            totalPrice: this.totalPrice, //总价格
            totalNum: this.totalNum //总数量
          };
          this.$store.dispatch("addCart", datas);
        }
      });
    },
  getList() {
        getIndex({type:'hot'}).then(res => {
          if (res.data.code == "1") {
            this.hotdatas = res.data;
          }
        });
      }
    },
  mounted() {
    let key = getInfo();
    this.getList()
    this.getCartlist(key)
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.car {
  width: 100%;
  padding-top: 12vw;
  padding-bottom: 28vw;
   .footer {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 13vw;
    left: 0;
    background-color: #ffffff;
    .footer-result,a {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
    }

    .footer-result {
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-goon {
      background-color: #F4F4F4;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color:#fff;
    }

  }
}
</style>
