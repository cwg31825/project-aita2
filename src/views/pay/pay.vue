<!--支付页面-->
<template>
  <div id="pay">
    <v-header :title="title" :fixed="true"></v-header>
    <div class="img">
      <img src="../../assets/pay_adv.jpg">

    </div>
    <!--支付剩余时间-->
    <div class="remain-time-container">
      <h3>支付剩余时间</h3>
      <div v-if="!overtime">
        <mt-badge type="primary">{{minutes.slice(0, 1)}}</mt-badge>
        <mt-badge type="primary">{{minutes.slice(1, 2)}}</mt-badge>
        <span>:</span>
        <mt-badge type="primary">{{seconds.slice(0, 1)}}</mt-badge>
        <mt-badge type="primary">{{seconds.slice(1, 2)}}</mt-badge>
      </div>
      <span class="overtime" v-else>支付超时</span>
    </div>
    <div class="order-info">
      <div class="info">
        <p>支付金额：￥{{order_info[0].order_amount}}</p>
        <p>订单号： {{order_info[0].order_sn}}</p>
      </div>
    </div>
<!--支付方式-->
    <ul class="pay-way">
      <li v-for="(k,i) in options" :key="i" @click="payType = k.value">
        <span class="pay-way-name"> 
        <img :src="k.imgUrl" class="img-fluid" alt="">
        </span>
        <span class="selected" v-if="payType === k.value">
          <img :src="select" class="img-fluid" alt="">
          </span>
        <span class="select" v-else></span>
      </li>
    </ul>
    <mt-button size="large" type="primary" @click="submit()">确定支付</mt-button>
    <!--调用app支付-->
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
import qs from 'qs';
import Utils from "@/utils/common";
import { initPay, orderInfo } from "@/api/order";
import { requestPay } from "@/api/order";
import { getInfo } from "@/utils/auth";

export default {
  data() {
    return {
      title: "支付订单",
      select:'./static/pay/select.png',
      options: [
        {
          label: "支付宝",
          value: "4",
          imgUrl: "./static/pay/sytjm.png"
        },
        // {
        //   label: "微信支付",
        //   value: "2",
        //   imgUrl: "./static/pay/WePayLogo.png"
        // }
      ],
      order_info: null,
      order_id: null,
      payType: "4", //支付渠道
      form_data: {},
      seconds: "", //倒计时秒
      minutes: "", //倒计时分
      payWayShow: false,
      preventRepeat: false, //阻止多次点击
      method: "trpay.trade.create.wap", //支付方式
      overtime: false, //支付超时
      alertText: "", //提示
      showTip: false
    };
  },
  mounted() {
    let _this = this;
    this.order_id = this.$route.query.order_id;
    orderInfo({ key: getInfo(), order_id: this.order_id }).then(res => {
      this.order_info = res.data.data;
      let remain_time = 100; //支付剩余时间
      if (remain_time == false) {
        this.overtime = true;
      }

      this.timer = setInterval(function() {
        remain_time--;
        _this.calc_remain_time(remain_time);
      }, 1000);
    });
  },
  methods: {
    submit() {
      //提交支付
      if (this.preventRepeat) {
        return;
      }
      if (this.overtime) {
        this.alertText = "支付超时";
        this.showTip = true;
        return;
      }
      //this.preventRepeat = true; //防止多次点击
      let data = {
        key: getInfo(),
        type: this.payType,
        order_id: this.order_id
      };
      initPay(data).then(res => {
        //调起APP支付
        const div = document.createElement('div')
        div.innerHTML = res.data //后台返回接收到的数据
        document.body.appendChild(div)
       // console.log(res.data)
        document.forms[0].submit()
      });
    },

    calc_remain_time(remain_time) {
      //倒计时
      let minutes = (remain_time / 60) % 60;
      this.minutes = minutes >= 10 ? minutes + "" : "0" + minutes; //计算剩余的分钟
      let seconds = remain_time % 60;
      this.seconds = seconds >= 10 ? seconds + "" : "0" + seconds; //计算剩余的分钟;//计算剩余的秒数
      if (!this.minutes && !this.seconds) {
        clearInterval(this.timer);
        this.overtime = true; //支付超时
      }
    },
    close() {
      this.payWayShow = false;
    },
    selectPayType() {
      if (this.overtime) {
        this.alertText = "支付超时";
        this.showTip = true;
        return;
      }
      this.payWayShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
#pay {
  background: #f3f3f6;
  padding-top: 12vw;
  .img {
    margin: 0.3rem 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  //剩余时间
  .remain-time-container {
    text-align: center;
    h3 {
      font-size: 0.4rem;
      color: #727272;
    }
    .remain-time {
      span {
        font-size: 0.3rem;
        display: inline-block;
        width: 18px;
        height: 18px;
        color: #fff;
        background: #656467;
        margin: 0.05rem;
        border-radius: 20px;
      }
      span:nth-of-type(3) {
        color: #656467;
        background: #f3f3f6;
      }
    }
    .overtime {
      font-size: 0.4rem;
      margin: 0.4rem 0;
    }
  }

  //订单信息
  .order-info {
    display: flex;
    align-items: center;
    background: #f8f8fb;
    margin: 0.5rem 0;
    border-top: 1px solid #e9e8ea;
    border-bottom: 1px solid #e9e8ea;
    padding: 0.8rem;
    .info {
      flex: 1;
      display: inline-block;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 0.8rem;
      border: 1px solid white;
      border-radius: 0.5rem;
      background-color: #fafafa;
      p {
        margin-top: 0.45rem;
      }
    }
  }

  //支付方式
  .pay-way {
    background: #fff;
    margin-bottom: 1rem;
    li {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9e8ea;
      .pay-way-name {
        flex: 0.8;
      }
      .select,
      .selected {
        display: inline-block;
        width: 3.5rem;
        height: 3.5rem;
      }
      .select {
      }
      .selected {
      }
    }
  }

  //支付按钮
  .submit {
    text-align: center;
    font-size: 0.55rem;
    //background: $mtYellow;
    // @include px2rem(width, 675);
    //@include px2rem(line-height, 100);
    margin: 1rem auto;
    &.disabled {
      background: #999;
    }
  }
  .pay-channel {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(21, 17, 17, 0.8);
    .channel-select-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .scan,
      .wap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.5rem 0;
        .iconfont {
          font-size: 0.4rem;
        }
      }
      span {
        color: #fff;
        font-size: 0.45rem;
      }
      .select,
      .selected {
        margin-right: 0.2rem;
        display: inline-block;
        // @include px2rem(width, 50);
        // @include px2rem(height, 50);
        border-radius: 50%;
      }
      .select {
        border: 1px solid #e9e8ea;
      }
      .selected {
        text-align: center;
        //background: $mtYellow;
        //@include px2rem(line-height, 50);
        .iconfont {
          font-size: 0.6rem;
        }
      }
    }

    .close {
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translateX(-50%);
      .icon-close {
        color: #fff;
      }
    }
  }
}
</style>
