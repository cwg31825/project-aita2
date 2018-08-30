<template lang="html">
  <div class="login">
    <v-header :title="name" :fixed="true"></v-header>
    <section>
      <div class="logo">
        <img v-lazy="imgUrl">
      </div>
      <div class="content">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" >账户密码登录</mt-tab-item>
          <!-- <mt-tab-item id="2"  >手机号快捷登录</mt-tab-item> -->
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <mt-field
              label="账号"
              placeholder="手机号"
              type = "text"
              :style=""
              v-model = "account"
            ></mt-field>
            <mt-field
              label="密码"
              placeholder="请输入密码"
              :type="typePsd"
              v-model="password"
              @keyup.enter="login()"
            >
              <i class="marLf iconfont" @click="toggleType" :class="eye"></i>
            </mt-field>
            <p class="btn">
              <router-link to="/register">新用户注册</router-link>
              <router-link to="/password" class="rt">忘记密码</router-link>
            </p>
            <p class="tip">
              <mt-checklist
                v-model="value"
                :options="options"
              >
              </mt-checklist>
            </p>

          </mt-tab-container-item>
          <!-- <mt-tab-container-item id="2">
            <mt-field
              label="+86"
              placeholder="请输入手机号"
              type = "text"
              v-model = "phone"
            ></mt-field>
              <mt-field
                label="验证码"
                placeholder="请输入验证码"
                type = "text"
                v-model = "code"
              >
               <v-ifycode :mobile="phone"></v-ifycode>

              </mt-field>
            <p class="btn">
              <router-link to="/register">新用户注册</router-link>
            </p>
            <p class="tip">
              <mt-checklist
                v-model="value"
                :options="options"
              >
              </mt-checklist>
            </p>
          </mt-tab-container-item> -->
        </mt-tab-container>

      </div>
    </section>
    <mt-button
      plain
      size="large"
      :disabled="!value[0]"
      @click.prevent="login();"
      v-if='selected=="1"'
      class="loginBtn"
    >登录</mt-button>
    <!-- <mt-button
      plain
      size="large"
      :disabled="!value[0]"
      @click="getAuthCode"
      v-if='selected=="2"'
      class="loginBtn"
    >登录</mt-button> -->
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
import Ifycode from "@/common/_ifycode.vue";
import { Toast, Lazyload, Navbar, TabItem, Checklist } from "mint-ui";
import {login,userInfo} from '@/api/user'
import {setInfo} from '@/utils/auth'
export default {
  components: {
    "v-ifycode": Ifycode
  },
  data() {
    return {
      name:"登录",
      account: "",
      password: "",
      phone: "",
      imgUrl: "./static/user/logo.png",
      selected: "1",
      eye: "icon-mima",
      typePsd: "password",
      bool: true,
      options: [
        {
          label: "互联通生态社区授权登录",
          value: true
        }
      ],
      value: [true],
      code: "",
      datas: null,
      alertText: '',
      showTip: false
    };
  },
  methods: {
    // 登录按钮
    login() {
      if (this.account !== "" && this.password !== "") {
        var data = {
          user: this.account.trim(),
          passwd: this.password.trim()
        };

        login(data).then((res) => {
          if (res.data.code == 1) {
            setInfo(res.data.data.key);
            this.userInfo(res.data.data.key)
            this.$router.go(-1);
          } else {
            this.alertText = res.data.msg;
            this.showTip = true;
          }
        });
      } else {
        Toast("账号密码不能为空");
      }
    },
    userInfo(key){
        userInfo({key:key}).then(res => {
        if (res.data.code == "1") {
          this.$store.commit("SET_USERDATA", res.data.data);
        }
      });
    },
    toggleType() {
      this.bool = !this.bool;
      if (this.bool) {
        this.eye = "icon-mima";
        this.typePsd = "password";
      } else {
        this.eye = "icon-liulan";
        this.typePsd = "text";
      }
    },
    getAuthCode() {
      if (this.phone !== "" && this.code !== "") {
      } else {
        Toast("手机号或验证码不能为空");
      }
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/fonts/iconfont.css";
.login {
  height: 100%;
  background: url("/static/user/bg.jpg") no-repeat;
  background-size: cover;
  padding-top: 12vw;
  .mint-cell {
    background: transparent !important;
    border-bottom: 1px solid #dedede;
  }

  > section {
    padding: 0 20px;
    .logo {
      text-align: center;
      width: 100%;
      margin: 6vw 0;
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
      color: #333;
      .rt {
        float: right;
      }
    }
    .mint-navbar {
      background-color: transparent;
      .mint-tab-item {
        color: @col-text-gr;
        &.is-selected {
          color: @color-text;
          border-bottom: 1px solid @cl;
        }
      }
    }

    .tip {
      padding: 4vw 0 0;
      font-size: 16px;
    }
  }
}
</style>
