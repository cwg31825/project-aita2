<template lang="html">
  <div class="order">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">待付款</mt-tab-item>
          <mt-tab-item id="8">待收货</mt-tab-item>
          <mt-tab-item id="6">已完成</mt-tab-item>
          <mt-tab-item id="0">全部</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
           <v-orderItem :order_list="order_list" :ordersList="ordersList"></v-orderItem>
        </mt-tab-container>
      </div>
    </section>
  </div>
</template>

<script>
import orderItem from "./item.vue";
import { Toast} from "mint-ui";
import { orders } from "@/api/order";
import { getInfo } from "@/utils/auth";
/**订单状态
//   1：待付款
//   2：取消订单
//   3：已确认
//   4：已付款
//   5：配货中
//   6：已收货
//   7：已退货
//   8：已发货 
**/
export default {
  components: {
    "v-orderItem": orderItem
  },
  data() {
    return {
      title:'我的订单',
      selected: '',
      order_list: [],
    };
  },
  created() {
     
    this.selected = this.$route.params.id? this.$route.params.id:"1";
  },
  methods: {
    ordersList(s){
       let data = {
         key: getInfo(),
         order_state:s
         }
      orders(data).then(res => {
        this.order_list = res.data.data
      });
        
    }
  },
  computed: {
    　　newValue() {
    　　　　return this.selected
    　　}
    },
    watch: {
      newValue(val){
          this.ordersList(val)
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/fonts/iconfont.css";
@import "../../assets/fz.less";
.order {
  background-color: @color-back-gr;
  padding-top: 12vw;
  .mint-cell {
    background: #fff;
    padding: 0 20px;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom-color: @cl;
    color: @color-text;
  }

  .combine {
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    position: fixed;
    height: 60px;
    line-height: 60px;
    bottom: -80px;
    background: #fff;
    text-align: right;
    padding: 0 20px;
    animation: myfirst 0.3s;
    -webkit-animation: myfirst 0.3s;
    animation-fill-mode: forwards;
  }
  @-webkit-keyframes myfirst /* Safari and Chrome */ {
    0% {
      bottom: -70px;
    }
    25% {
      bottom: -50px;
    }
    50% {
      bottom: -30px;
    }
    75% {
      bottom: -10px;
    }
    100% {
      bottom: -0px;
    }
  }
}
</style>
