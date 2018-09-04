<template lang="html">

  <header class="header">
    <div class="header-icon-box">
      <div  class="show" v-if="userData">
        <router-link to="/setting">
        <img :src="userData.headimg ? this.userData.headimg:avatar" class="picture"/>
        </router-link>
      </div>

      <span v-if="!userData"><router-link to="/login">登录</router-link> / <router-link to="/register">注册</router-link></span>
      <span v-if="userData">{{userData.user_name}}</span>
    </div>
    <slot v-if="userData" name="icon" ></slot>

  </header>
</template>

<script>
export default {
  props:['userData'],
  data(){
    return {
      avatar:'../../static/index/2@2x.png',
    }
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.header {
  width: 100%;
  height: 35vw;
  background: url(../../../static/user/myBg@2x.png) no-repeat;
  background-size:cover;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  position: relative;
  .header-icon-box{
    margin:0 auto;
    text-align: center;
  }
  .show {
    width: 14vw;
    height: 14vw;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    margin:0 auto 6px;
  }
  .picture {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  >span {
    margin-left: 3.2vw;
    .fz(font-size, 30);
    color: #ffffff;
    letter-spacing: .2vw;
  }
}
</style>
