<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
        <div class="s-one">
          <mt-cell
            title="昵称"
            to="/personal"
            is-link
            :value="userData.user_name">
              <img v-lazy="userData.headimg" alt="" class="picture"  slot="icon"/>
          </mt-cell>
          <mt-cell
            title="实名认证"
            to="/realName"
            is-link
            :value="is_card"
          >
          </mt-cell>
          <mt-cell
            title="地址管理"
            to="/addressManage"
            is-link
            class="mar-bot last"
          >
          </mt-cell>
          <mt-cell
            title="账户安全"
            to="/acountSecurity"
            is-link
            class="mar-bot"
          >
          </mt-cell>
          <mt-cell
            title="互联通"
            to="/huLianTong"
            is-link
            :value="is_wallet_account"
            class="mar-bot"
          ></mt-cell>

          <mt-cell
            title="检查更新"
            to="/setting"
            is-link
            value="1.1"
            class="mar-bot"
          >
          </mt-cell>
        </div>

      </div>
    </section>
    <mt-button v-if="userData"
      plain
      size="large"
      class="loginBtn"
      @click="loginoOut"
    >退出当前账户</mt-button>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
    >
    </mt-actionsheet>

  </div>
</template>

<script>
import { getInfo,removeInfo } from "@/utils/auth";
import { userInfo,logout } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      title: "设置",
      sheetVisible: false,
      that: this,
      actions: [
        { name: "确认要退出当前登录吗？" },
        { name: "确认", method: this.ok }
      ],
      headerImage: "",
      userData: "",
      is_card: "未认证",
      is_wallet_account: "未绑定"
    };
  },
  created() {
    this.userData = this.$store.state.login.userData;
    if (this.userData.card != "") {
          this.is_card = "已认证";
        }
        if (this.userData.wallet_account) {
          this.is_wallet_account = "已绑定";
        }
  },
  methods: {
    loginoOut() {
      this.sheetVisible = true;
    },
    ok() {
      this.key = getInfo();
    var data = {
      key: this.key
    };
    logout(data).then(res => {
      this.$store.commit("SET_USERDATA",'');
    });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fonts/iconfont.css";
@import "../../assets/fz.less";
.login {
  padding-top: 12vw;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  background-color: @color-back-gr;
  .mint-cell {
    border-bottom: 1px solid #dedede;
  }

  > section {
    .content {
      height: 100%;
      .picture {
        width: 14vw;
        height: 14vw;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .mint-cell-value {
      margin-right: 36px !important;
    }
    .mint-cell {
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      &:first-child {
        padding: 10px 20px;
      }
      &.mar-bot {
        margin-bottom: 10px;
        border-bottom: none;
      }
    }
  }
}
</style>
