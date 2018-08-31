<template lang="html">
      <ul class="list">
              <li class="item" v-for="(item, index) in order_list">
                <h3 class="title">订单号：{{item.order_sn}}<span class="rt red">{{status(item.status)}}{{status(item.order_status)}}</span></h3>
                  <div class="dianpu">
                    <div class="dianpu_item" v-for="k in item.goods" @click="goOrderDetail(item.order_id)">
                        <div class="lfBox">
                            <img v-lazy="k.goods_thumb?k.goods_thumb:'./static/user/dianpu@2x.png'" alt="">
                        </div>
                        <div class="rtBox">
                            <p class="dianName">{{k.goods_name}}</p>
                            <p class="guige">规格：<span class="gray">{{k.goods_attr?k.goods_attr:'无'}}</span></p>
                            <p class="price">价格：<span class="red">&yen; {{k.goods_price}}</span> *{{k.goods_number}}</p>
                            <!-- <mt-button  size="small" v-show="item.status=='6'||item.order_status=='6'" class="bg small" @click="backgoods(item.order_id||order_id)">申请退货</mt-button> -->
                        </div>
                    </div>
                  </div>
                 <div class="totle text-rt"> 
                    <span>共{{item.goods.length}}件商品</span>
                    <span>合计：<span class="red">{{item.order_amount}}</span></span>
                  </div>
                 
                  <div class="handle text-rt">
                    <mt-button  size="small" v-show="item.status=='1'||item.order_status=='1'" class="bg small" @click="cancelOrder(item.order_id||order_id)">取消订单</mt-button>
                    <mt-button  size="small" v-show="item.status=='1'||item.order_status=='1'" @click="handlePay(item.order_id||order_id)" class="small">付  款</mt-button>
                    <mt-button  size="small" v-show="item.status=='5'||item.order_status=='5'" class="bg small">查看物流</mt-button>
                    <mt-button  size="small" v-show="item.status=='8'||item.order_status=='8'" class="small red" @click="setReceived(item.order_id||order_id)">确认收货</mt-button>
                  </div>
              </li>
              <p v-if="order_list.length==0" style="text-align: center;">没有订单数据</p>
            </ul>
            
</template>
<script>
import { getInfo } from "@/utils/auth";
import { cancelOrder,received,backgoods } from "@/api/order";
export default {
  props: ["order_list","order_id","ordersList"],
  methods: {
    status(s) {
      if (s == "1") return "待付款";
      if (s == "2") return "取消订单";
      if (s == "3") return "已确认";
      if (s == "4") return "已付款";
      if (s == "5") return "配货中";
      if (s == "6") return "已收货";
      if (s == "7") return "已退货";
      if (s == "8") return "已发货";
    },
    handlePay(order_id) {
      this.$router.push({ path: "/pay", query: { order_id: order_id } });
    },
    cancelOrder(order_id) {
      let data ={
        key:getInfo(),
        order_id:order_id
        }
      cancelOrder(data).then(res => {
        if (res.data.code == "1") {
          this.ordersList('1')
        }
      });
    },
    setReceived(order_id) {
      let data ={
        key:getInfo(),
        order_id:order_id
        }
      received(data).then(res => {
        if (res.data.code == "1") {
        }
      });
    },
    backgoods(goods_id) {
      let data ={
        key:getInfo(),
        goods_id:goods_id,
        back_reason:this.back_reason
        }
      backgoods(data).then(res => {
        if (res.data.code == "1") {
        }
      });
    },
    goOrderDetail(order_id) {
      if (order_id) {
        this.$router.push({ name: "订单详情", query: { order_id: order_id } });
      }
    }
  },
  created() {

  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/css/style.css";
.list {
  width: 100%;
}
.dianpu {
 display: inline-grid;
    width: 90%;
  .red {
    color: @color-text;
  }
  .dianpu_item {
    border-bottom: 1px solid @border-color;
    padding: 15px 20px;
    color: #666;
    display: flex;
    width: 100%;
    .lfBox {
      flex: .3;
      img {
        width: 100px;
        height: 80px;
      }
    }
    .rtBox {
      flex: .7;
      font-size: 12px;
      line-height: 20px;
      .dianName {
        font-size: 14px;
        .text2(2);
      }
      .bg{
        float: right;
      }

      p {
        .gray {
          color: #3f3f3f;
        }
        .rt {
          float: right;
          position: relative;
          .ceng {
            font-size: 21px;
            position: absolute;
            top: 4px;
            left: -8px;
          }
        }
      }
    }
  }
}
</style>