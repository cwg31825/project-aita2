<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
            <div class="message">
              <p>绑定互联通生态社区后，资格卷才能发放;</p>
              <p>若没有互联通账户，请下载注册后绑定</p>
            </div>
            <div class="btnBox">
              <mt-button type="danger" size="small" @click="downApp">下载互联通</mt-button>
            </div>
            <mt-field
              label="互联通账号"
              :disabled='is_wallet_account'
              placeholder="请输入互联通账号"
              type = "text"
              v-model = "wallet_account"
              class="huliantong"
            ></mt-field>


      </div>
    </section>
    <mt-button
      plain
      size="large"
      :disabled="is_wallet_account"
      class="loginBtn"
      @click="ok"
    >绑定</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { getInfo } from "@/utils/auth";
import { userInfo, isWallet } from "@/api/user";
export default {
  components: {
  },
  data() {
    return {
      title:'互联通',
      wallet_account: "",
      pickerVisible: false,
      is_wallet_account:false
    };
  },
  created(){
    let userData = this.$store.state.login.userData;
    if(userData.wallet_account){
          this.wallet_account = userData.wallet_account;
          this.is_wallet_account=true
        }
    },
  methods: {
    // 
    ok() {
      if (this.wallet_account !== "") {
        var data = {
          key: getInfo(),
          wallet_account: this.wallet_account
        };
        isWallet(data).then(res => {
        if (res.data.code == "1") {
          Toast(res.data.msg);
          this.$router.go(-1);
        }
      });
      } else {
        Toast("请输入互联通账号");
      }
    },
    downApp() {
      var u = navigator.userAgent,
        isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        urls = {
          android: "https://h5.tongyongjifen.cn/android_produce/igiwallet.apk",
          ios:
            "https://itunes.apple.com/cn/app/tong-yong-ji-fen/id1193876939?mt=8",
          other: "https://me.tongyongjifen.cn"
        };
      //三元运算
      // window.location.href = isAndroid? urls.android : isiOS? urls.ios : urls.other;
      //简化
      if (isAndroid) {
        window.location.href = urls.android;
      } else if (isiOS) {
        window.location.href = urls.ios;
      } else {
        window.location.href = urls.other;
      }
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
  .mint-cell {
    background: #fff;
    padding: 0 20px;
  }
  .message {
    padding: 20px 0;
    background: #fff;
    text-align: center;
    color: @color-text;
  }
  .btnBox {
    width: 100%;
    text-align: center;
    padding: 35px 0;
    .mint-button--danger {
      background-color: @color-background;
    }
  }
}
</style>
