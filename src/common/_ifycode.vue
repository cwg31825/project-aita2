<template lang="html">
<!--店铺 LIST -->
  <mt-button @click="ifycode" v-show="mobile" :disabled="show"  size="small"><span>{{first}}</span><span v-show="show">（{{count}}s）</span></mt-button>
</template>

<script>
import { getverifycode } from "@/api/user";
export default {
  props: ["mobile"],
  data() {
    return {
      timer: null,
      show: false,
      count: "",
      first: "获取验证码"
    };
  },
  created() {

  },
  methods: {
    //60秒倒计时
    getCode() {
      this.show = true;
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.first = "重新发送";
            this.show = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //发送验证码
    ifycode() {
      ///user/getverifycode
      var data = {
        mobile: this.mobile
      };
      getverifycode(data).then( res =>{
        if (res.data.code=='1') {
          this.getCode();
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/fonts/iconfont.css";
</style>
