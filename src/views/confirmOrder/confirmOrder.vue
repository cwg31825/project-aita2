<!--提交订单-->
<template>
  <div id="confirm-order">
    <v-header :title="title" :fixed="true"></v-header>
    <div>
      <!--地址信息-->
      <mt-cell title="收货地址" v-if="emptyAddress" to="/add_address"
        is-link
        label="请添加收货地址">
        <i class="iconfont icon-weizhi" slot="icon"></i>
      </mt-cell>

      <mt-cell :title="defineAddress.address"
        to="/confirmOrder/address"
        is-link
        :label="defineAddress.username+' '+defineAddress.telnumber" v-else>
        <i class="iconfont icon-weizhi" slot="icon"></i>
      </mt-cell>
    </div>


    <div class="container">
      <!--商品列表-->
      <ul class="food-list">
        <li v-for="(item) in order_data" :key="item.rec_id" v-if="order_data">
          <div class="picture">
            <img :src="item.goods_img">
          </div>
          <div class="food-list-right-part">
            <div>
              <span class="name">{{item.goods_name}}</span>
              <span class="price">￥{{item.goods_price}}</span>
            </div>
            <div>
              <span class="count">x{{item.number}}</span>
            </div>
          </div>
        </li>
      </ul>

      <ul class="other-fee-container">
        <li>
          <span>包装费</span>
          <span class="box-total-price">￥0</span>
        </li>
        <li>
          <span>配送费</span>
          <span>￥0</span>
        </li>
      </ul>
      <div class="total-price-container">
        <span>已优惠￥0</span>
        <span class="total-price">小计<strong>￥{{totalPrice}}</strong></span>
      </div>
    </div>

    <router-view></router-view>
    <footer class="footer">
        <div class="footer-result">
          <p><span class="total">合计<strong>￥{{totalPrice}}</strong></span></p>
        </div>
        <a class="footer-pay" @click="submit">
          提交订单
        </a>
      </footer>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
import { getAllAddress } from "@/api/user";
import { submitOrder } from "@/api/order";
import { mapGetters } from "vuex";
import { getInfo } from "@/utils/auth";
export default {
  data() {
    return {
      title: "提交订单",
      order_data: null,
      defineAddress: {},
      poi_info: null,
      totalPrice: 0,
      totalNum: 0,
      restaurant_id: null,
      emptyAddress: true, //还没有收货地址 需要新增
      alertText: "",
      showTip: false,
      preventRepeat: false
    };
  },
  computed: {
    ...mapGetters(["deliveryAddress"]),
    gender() {
      return this.defineAddress.gender === "male" ? "先生" : "女士";
    }
  },
  methods: {
    submit() {
      if (this.emptyAddress) {
        //如果没有填收货地址
        this.alertText = "请添加收货地址";
        this.showTip = true;
        return;
      }
      if (this.preventRepeat) return;
      this.preventRepeat = true;
      let foods = [];
      let keys = Object.keys(this.order_data);
      keys.forEach(key => {
        if (Number(key))
          foods.push({ skus_id: key, num: this.order_data[key]["num"] });
      });

      let rec_id = "";
      for (let i = 0; i < this.order_data.length; i++) {
        rec_id += this.order_data[i].rec_id + ",";
      }
      var reg = /,$/gi;
      rec_id = rec_id.replace(reg, "");
      //
      let address_id = this.defineAddress.address_id;

      var data = {
        key: getInfo(),
        rec_id: rec_id, //商品id
        address_id: address_id, //收获地址
        shipping_fee: "0", //配送费用
        expressage_id: "3", //配送方式id
        bonus_id: "", //红包id
        bonus_type_id: "", //红包类型id
        message: "" //订单留言
      };

      submitOrder(data).then(res => {
        if (res.data.code == "1") {
          this.$router.push({
            path: "/pay",
            query: { order_id: res.data.data.order_id }
          });
        }
      });
    }
  },
  created() {
    let confirmOrderData = JSON.parse(localStorage.getItem("confirmOrderData")); //获取当前准备下单的商品
    this.totalNum = confirmOrderData.totalNum; //总数量
    this.totalPrice = confirmOrderData.totalPrice;
    this.order_data = confirmOrderData.data; //食物信息
    //获取用户收货地址
    let key = getInfo();
    getAllAddress({ key: key }).then(res => {
      var newdata = res.data.data;
      //根据（is_default）排序
      function sortprice(a, b) {
        return b.is_default - a.is_default;
      }
      //利用js中的sort方法
      let data = newdata.sort(sortprice);
      if (data.length) {
        //判断该用户有没有收货地址
        this.emptyAddress = false;
        this.defineAddress = data[0]; //默认第一个为默认收获地址
      } else {
        this.emptyAddress = true;
      }
    });
  },
  watch: {
    deliveryAddress(address) {
      this.defineAddress = address;
    }
  }
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_687988_72mjq1o2tsi.css";
@import "../../assets/fz.less";
#confirm-order {
  color: #222;
  background-color: @color-back-gr;
  color: @col-text-gr;
  padding-top: 12vw;
  z-index: 100;
  .mint-cell-wrapper {
    .iconfont {
      margin: 0 0.1rem;
      font-size: 1rem;
    }
  }


  /*商品部分样式*/
  .container {
    margin: 0;
    padding: 0 0.1rem 1rem;
    background: #fbfbfb;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 0px 1px rgba(0, 0, 0, 0.2);

    /*商品列表样式*/
    .food-list {
      li {
        display: flex;
        padding: 0.4rem;
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        box-shadow: 0 0px 1px rgba(0, 0, 0, 0.1);
        .picture {
          width: 20vw;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .food-list-right-part {
          flex: 1;
          & > div {
            display: flex;
            justify-content: space-between;
            margin-left: 0.2rem;
            .name {
              font-size: 1rem;
              font-weight: 500;
              i {
                display: inline-block;
                margin: 0 0.3rem;
                background-size: cover;
                vertical-align: middle;
              }
              span {
                vertical-align: middle;
              }
            }
            .count {
              font-size: 0.3rem;
              display: inline-block;
              margin-top: 0.2rem;
              color: #9f9f9f;
            }
            .original-price {
              font-size: 0.2rem;
            }
            .price {
              display: block;
              font-size: 0.45rem;
              font-weight: 500;
            }
          }
        }
      }
    }
    /*包装费 配送费 优惠券*/
    .other-fee-container,
    .coupon-info-list-container {
      margin-left: 0.26rem;
      li {
        display: flex;
        padding: 0.26rem 0;
        span:first-child {
          flex: 1;
          font-size: 0.4rem;
          font-weight: 500;
        }
        span:nth-child(2) {
          font-size: 0.35rem;
        }
      }
    }
    .total-price-container {
      text-align: right;
      margin-right: 0.2rem;
      padding: 0.44rem 0;
      border-top: 1px dashed #999;

      span:first-child {
        font-size: 0.45rem;
        font-weight: 500;
        color: #999;
      }
      .total-price {
        font-size: 0.45rem;
        font-weight: 500;
        strong {
          color: #fb4e44;
        }
      }
    }
  }
  .bottom {
    //@include px2rem(height, 96);
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    z-index: 101;
    background: #fff;
    .left {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      border-top: 1px solid #e0e0e0;
      .discount-fee {
        flex: 1;
        font-size: 0.4rem;
        margin-left: 0.5rem;
      }
      .total {
        font-size: 0.4rem;
        margin-right: 0.2rem;
        strong {
          color: #fb4e44;
          font-size: 0.5rem;
        }
      }
    }
    .submit {
      display: inline-flex;

      height: 100%;
      justify-content: center;
      align-items: center;
      font-size: 0.4rem;
      font-weight: 500;
      // background: ;
    }
  }
  .footer {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    .footer-result,
    a {
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
          color: @cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-goon {
      background-color: #f4f4f4;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color: #fff;
    }
  }
}
</style>
