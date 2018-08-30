<template>
<mt-header :fixed="fixed" :title="title">
  <mt-button v-show="fixed" slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
  <mt-button icon="search" slot="right" v-if="search" @click="$router.replace({ name:'搜索页',params: { type:search}})"></mt-button>
  <mt-button icon="ok" slot="right"  v-if="ok" @click="ok">保存</mt-button>
</mt-header>
</template>

<script>
import { Toast, Lazyload, MessageBox,Header } from "mint-ui";

export default {
props: ["title","fixed","ok","search"],
}
</script>

<style lang="less" scoped>
@import '../assets/fz.less';
@import '../assets/fonts/iconfont.css';
header {
  background-color: #BC0404;
  text-align: center;
  position: relative;
  height: 12vw;
  line-height: 12vw;
  padding: 0 4vw;
  color:#fff;
  h1 {
    .fz(font-size,36);
    letter-spacing: .3vw;
    font-weight: 600;
  }
  .rtBtn{
    position: absolute;
    top:0;
    right:15px;
  }
  i {
    display: inline-block;
    .fz(font-size,46);
    line-height: 12vw;
    float: left;
    &::before {
      color:#fff;
    }
  }
}


</style>



