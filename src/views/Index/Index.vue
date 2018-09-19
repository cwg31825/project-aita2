<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header :title="name" :fixed="false" :search="1"></v-header>
    <v-swiper :swiperData="datas.data"></v-swiper>
    
    <v-service :serviceData="service.list"></v-service>
    <v-message :marqueeList="message.data"></v-message>
    <!-- <mt-button size="large" type="primary" @click="ready()">支付宝</mt-button> -->
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
       <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
            <span v-show="topStatus === 'drop'">释放更新</span>
        </div>
    <v-goods :goods="hotdatas.data" :num="10" :title="goodsTitle"></v-goods>
    </mt-loadmore>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Swiper from "@/components/index/swiper.vue";
import Service from "@/components/index/service.vue";
import message from "@/components/index/message.vue";
import { Loadmore } from "mint-ui";
import { getIndex, getNotice } from "@/api/request";
import Util from '@/utils/common'
import qs from 'qs'
export default {
  components: {
    "v-swiper": Swiper,
    "v-service": Service,
    "v-message": message,
  },
  data() {
    return {
      name: "工部",
      goodsTitle: "热门推荐",
      datas: "",
      hotdatas: "",
      message: "",
      topStatus: "",
      allLoaded: false,
      service: {
        list: [
          {
            imgPath: "./static/index/1@2x.png",
            name: "兑换",
            bool: true
          },
          {
            imgPath: "./static/index/2@2x.png",
            name: "预售",
            bool: true
          },
          {
            imgPath: "./static/index/3@2x.png",
            name: "拍卖",
            bool: true
          },
          {
            imgPath: "./static/index/4@2x.png",
            name: "新店",
            bool: true
          }
        ]
      },
      loading: true
    };
  },
  methods: {
    ready() {

      let datas = {
        app_id:'2016091600524401',
        method:'alipay.trade.app.pay',
        charset:'UTF-8',
        sign_type:'RSA2',
        timestamp:'',
        notify_url:'http://119.254.209.180:81/index.php/Payment/callback',
        version:'1.0'
      }
      let s = qs.stringify(datas)
      datas.sign = Util.encrypt(s)
      //
      var payInfo = "app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D";
     // let payInfo = qs.stringify(datas)
      cordova.plugins.alipay.payment(payInfo,
      function success(e){
        alert('1='+e.resultStatus+e.memo)
      },
      function error(e){
        alert('2='+e.resultStatus+e.memo)
      });
    },
    loadTop() {
      // 刷新数据的操作
      this.getList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 刷新数据的操作
      this.getList();
      this.$refs.loadmore.onBottomLoaded();
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    getList() {
      getIndex({type:'hot'}).then(res => {
        if (res.data.code == "1") {
          this.hotdatas = res.data;
          this.allLoaded = true; // 若数据已全部获取完毕
        }
      });
    }
  },

  mounted() {
    this.getList();
    getIndex({type:'ads'}).then(res => {
        if (res.data.code == "1") {
          this.datas = res.data;
        }
      });
    //
    getNotice().then(res => {
        if (res.data.code == "1") {
          this.message = res.data;
        }
      });
  }
};
</script>



<style lang="less" scoped>
.index {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f8fcff;
}
</style>