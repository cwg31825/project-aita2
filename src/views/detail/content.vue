<template lang="html">
  <section class="content">
    <div class="mint-content" v-html="content"></div>
  </section>

</template>

<script>
export default {
  props:['content'],
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/css/style.css';
@import '../../assets/fonts/iconfont.css';
  .content {
    width: 100%;
    box-shadow: 1px 0 10px rgba(0,0,0,0.1);
    margin-top: 5px;
    border-top: 5px solid #F8FCFF;
    .mint-content {
      img{
        .fz(width, 100%);
      }
    }
  }
</style>
