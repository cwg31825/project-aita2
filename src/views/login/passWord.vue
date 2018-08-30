<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
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


      </div>
    </section>
    <mt-button
      plain
      size="large"
      @click="ok"
      class="loginBtn"
    >提交</mt-button>

  </div>
</template>

<script>

  import Ifycode from "@/common/_ifycode.vue";
import { getInfo } from "@/utils/auth";
import { forgotPwd } from "@/api/user";
  export default {
    components:{
      "v-ifycode": Ifycode
    },
    data(){
      return {
        title:'找回密码',
        account:'',
        password:'',
        morePassword:'',
        imgUrl:'./static/user/logo.png',
        eye1:'icon-mima',
        eye2:'icon-mima',
        typePsd1:'password',
        typePsd2:'password',
        bool1:true,
        bool2:true,
        code:'',
      }
    },
    methods:{
      toggleType1(){
        this.bool1=!this.bool1;
        if(this.bool1){
          this.eye1='icon-mima';
          this.typePsd1='password';
        }else{
          this.eye1='icon-liulan';
          this.typePsd1='text';
        }
      },
      toggleType2(){
        this.bool2=!this.bool2;
        if(this.bool2){
          this.eye2='icon-mima';
          this.typePsd2='password';
        }else{
          this.eye2='icon-liulan';
          this.typePsd2='text';
        }
      },
      ok(){
        ///user/forget_pass
        var data={
          key:getInfo(),
          code:this.code,
          mobile:this.account,
          pwd:this.password,
          true_pwd:this.morePassword
        };
        forgotPwd(data).then(res => {
        if (res.data.code == "1") {
          this.$router.replace({path: '/login'})
        }
      });
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fonts/iconfont.css';
  @import '../../assets/fz.less';
  .login {
    padding-top: 12vw;
    .mint-cell{
      background: transparent!important;
      border-bottom: 1px solid #DEDEDE;
    }


    >section {
      .content{
        height: 100%;
        padding:9vw 20px 0;
      }
      .marLf{
        margin-left:20px;
        font-size:20px;
        color:@col-text-gr;
      }
      .btn{
        margin-top:13px;
        color:@col-text-gr;
        .rt{
          float: right;
        }
      }


    }

  }
</style>
