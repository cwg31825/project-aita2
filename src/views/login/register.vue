<template lang="html">
  <div class="login">
   <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="logo">
        <img v-lazy="imgUrl">
      </div>
      <div class="content">
            <mt-field
              label="+86"
              placeholder="请输入手机号"
              type = "text"
              v-model = "account"
            ></mt-field>
            <mt-field
              label="验证码"
              placeholder="请输入验证码"
              type = "text"
              v-model = "code"
            >
            <v-ifycode :mobile="account"></v-ifycode>
             
            </mt-field>
            
            <!-- <mt-field
              label="用户名"
              placeholder="请输入用户名"
              type = "text"
              v-model = "username"
            ></mt-field>
            <mt-field
              label="邮箱"
              placeholder="请输入邮箱"
              type = "text"
              v-model = "email"
            ></mt-field> -->
            <mt-field
              label="密码"
              placeholder="请输入密码"
              :type="typePsd1"
              v-model="password"
            >
              <i class="marLf iconfont" @click="toggleType1" :class="eye1"></i>
            </mt-field>
              <mt-field
                label="确认密码"
                placeholder="请输入确认密码"
                :type="typePsd2"
                v-model="morePassword"
              >
          <i class="marLf iconfont" @click="toggleType2" :class="eye2"></i>
        </mt-field>
            <p class="tip">
              <mt-checklist
                v-model="value"
                :options="options"
              >
              </mt-checklist>
              <span>《用户协议》</span>
            </p>

      </div>
    </section>
    <mt-button
      plain
      size="large"
      @click="register"
      class="loginBtn"
    >注册</mt-button>

  </div>
</template>

<script>
import Ifycode from "@/common/_ifycode.vue";
import { phoneRegister } from "@/api/user";
export default {
  components: {
    "v-ifycode": Ifycode
  },
  data() {
    return {
      title: "手机注册",
      account: "",
      username: "",
      email: "",
      password: "",
      morePassword: "",
      imgUrl: "./static/user/logo.png",
      eye1: "icon-mima",
      eye2: "icon-mima",
      typePsd1: "password",
      typePsd2: "password",
      bool1: true,
      bool2: true,
      options: [
        {
          label: "我已看过并同意",
          value: true
        }
      ],
      value: [true],
      code: ""
    };
  },
  methods: {
    // 
    register() {
        var data = {
          mobile: this.account.trim(),
          code: this.code.trim(),
          passwd: this.password.trim(),
          repasswd: this.morePassword.trim()
        };
        phoneRegister(data).then(res=>{
          if (res.data.code=='1') {
            this.$router.replace({ path: "/login" });
          }
        })
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/fonts/iconfont.css";
.login {
  background: url("../../../static/user/bg.jpg") no-repeat;
  background-size: cover;
  padding-top: 12vw;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;

  .mint-cell {
    background: transparent !important;
    border-bottom: 1px solid #dedede;
  }

  > section {
    padding: 0 20px;
    .logo {
      text-align: center;
      width: 100%;
      margin: 13vw 0;
      img {
        width: 42%;
      }
    }
    .content {
      height: 100%;
      .mint-tab-container {
        margin-top: 9vw;
      }
    }
    .marLf {
      margin-left: 20px;
      font-size: 20px;
      color: @col-text-gr;
    }
    .btn {
      margin-top: 13px;
      color: @col-text-gr;
      .rt {
        float: right;
      }
    }

    .tip {
      padding: 4vw 0 0;
      font-size: 16px;
      .mint-checklist,
      span {
        display: inline-block;
      }
      span {
        color: @color-text;
        position: relative;
        top: -19px;
        left: -4px;
      }
    }
  }
}
</style>
