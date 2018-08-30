<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">

            <div class="box">
              <p class="title">1.验证身份</p>
              <div class="textBox">
                <p>账户已与 <b>{{phone}}</b> 绑定</p>
                <p>请输入验证码，确认身份</p>
              </div>
              <mt-field
                placeholder="请输入验证码"
                type = "text"
                v-model = "code"
                class="noBorder"
              >
                <mt-button @click="getCode" :disabled="show"  size="small"> {{first}}<span v-show="show">（{{count}}s）</span></mt-button>

              </mt-field>
            </div>
            <div class="box">
              <p class="title">2.修改登录密码</p>
              <mt-field
                label="登录密码"
                placeholder="6-20位数字或字母"
                :type="typePsd1"
                v-model="password"
              >
                <i class="marLf iconfont" @click="toggleType1" :class="eye1"></i>
              </mt-field>
              <mt-field
                label="确认密码"
                :type="typePsd2"
                v-model="morePassword"
              >
                <i class="marLf iconfont" @click="toggleType2" :class="eye2"></i>
              </mt-field>
            </div>

      </div>
    </section>
    <mt-button
      plain
      size="large"
      @click="ok"
      class="loginBtn"
    >确认</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { getInfo, removeInfo } from "@/utils/auth";
import { userInfo, getverifycode, updateLoginPwd } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      title: "登录密码",
      code: "",
      count: "",
      timer: null,
      show: false,
      first: "获取验证码",

      phone: "",
      password: "",
      morePassword: "",
      eye1: "icon-mima",
      eye2: "icon-mima",
      typePsd1: "password",
      typePsd2: "password",
      bool1: true,
      bool2: true
    };
  },
  created() {
   let userData = this.$store.state.login.userData;
    this.phone = userData.mobile_phone;
  },
  methods: {
    toggleType1() {
      this.bool1 = !this.bool1;
      if (this.bool1) {
        this.eye1 = "icon-mima";
        this.typePsd1 = "password";
      } else {
        this.eye1 = "icon-liulan";
        this.typePsd1 = "text";
      }
    },
    toggleType2() {
      this.bool2 = !this.bool2;
      if (this.bool2) {
        this.eye2 = "icon-mima";
        this.typePsd2 = "password";
      } else {
        this.eye2 = "icon-liulan";
        this.typePsd2 = "text";
      }
    },

    getCode() {
      if (this.phone !== "") {
        this.ifycode();
        this.show = true;
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.first = "重新发送";
            } else {
              this.show = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      } else {
        Toast("手机号不能为空");
      }
    },
    ifycode() {
      var data = {
        key: getInfo(),
        mobile: this.phone
      };
      getverifycode(data).then(res => {
        if (res.data.code == "1") {
        }
      });
    },
    ok() {
      var data = {
        key: getInfo(),
        code: this.code,
        mobile: this.phone,
        pwd: this.password,
        true_pwd: this.morePassword
      };
      updateLoginPwd(data).then(res => {
        if (res.data.code == "1") {
        Toast(res.data.msg)
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fonts/iconfont.css";
@import "../../assets/fz.less";
.login {
  height: 100%;
  background-color: @color-back-gr;
  padding-top: 12vw;
  .box {
    background: #fff;
    color: #333;
    margin-bottom: 10px;
    .title {
      line-height: 48px;
      font-size: 18px;
      padding: 0 20px;
    }
    .textBox {
      margin: 0 10px 6px;
      background-color: @border-color;
      border-radius: 6px;
      text-align: center;
      padding: 12px 0;
      p {
        line-height: 25px;
        font-size: 14px;
      }
    }
    .mint-cell {
      padding: 0 20px;
      border-bottom: none;
      border-top: 1px solid @border-color;
      &.noBorder {
        border: none;
      }
    }
  }
}
</style>
