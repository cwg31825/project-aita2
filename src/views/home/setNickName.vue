<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true" :ok="ok"></v-header>
    <section>
      <div class="content">
            <mt-field
              placeholder="请输入昵称"
              type = "text"
              v-model = "nick"
            ></mt-field>


      </div>
    </section>

  </div>
</template>

<script>
import { getInfo, removeInfo } from "@/utils/auth";
import { userInfo, editNickname } from "@/api/user";

  export default {
    components:{
    },
    data(){
      return {
        title:"修改昵称",
        nick:'',
        pickerVisible:false,
      }
    },
    created(){
      let userData = this.$store.state.login.userData;
      this.nick = userData.user_name
    },
    methods:{
      userinfo(){
        var data = {
          key: getInfo()
        };
        userInfo(data).then(res => {
          if (res.data.code == "1") {
            this.$store.commit("SET_USERDATA", res.data.data);
          }
        });
      },
      ok(){
        var data = {
          key: getInfo(),
          user_name:this.nick
        };
        editNickname(data).then(res => {
          if (res.data.code == "1") {
            this.userinfo()
            this.$router.go(-1)
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
    height:100%;
    background-color: @color-back-gr;
    padding-top: 12vw;
    .mint-cell{
      background: #fff;
      padding:0 20px;
    }



  }
</style>
