<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
        <div class="s-one">

          <mt-cell
            title="登录密码"
            to="/loginPsd"
            is-link
            class="mar-bot"
          ></mt-cell>

          <mt-cell
            title="支付密码"
            to="/payPsd"
            is-link
            class="mar-bot"
          >
          </mt-cell>
        </div>

      </div>
    </section>

  </div>
</template>

<script>

  import Header from '@/common/_header.vue'
  import { Toast,Lazyload   } from 'mint-ui'
  export default {
    components:{
      'v-header':Header
    },
    data(){
      return {
        title:'账户安全'
      }
    },
    methods:{
      // 登录按钮






    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fonts/iconfont.css';
  @import '../../assets/fz.less';
  .login {
    height:100%;
    background-color: @color-back-gr;
    padding-top: 12vw;
    .mint-cell{
      border-bottom: 1px solid #DEDEDE;
    }


    >section {
      .content{
        height: 100%;

      }
      .mint-cell-value{
        margin-right:36px!important;
      }
      .mint-cell {
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        background-color: #fff;

        &.mar-bot {
          margin-bottom: 10px;
          border-bottom: none;
        }
        &:last-child {
          background: none;
          background-color: #fff;
        }
      }

    }

  }
</style>
