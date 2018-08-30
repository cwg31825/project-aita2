<template>
  <header>
    <slot name="back"></slot>
    <slot name="title"></slot>
    <slot name="rtBtn" ></slot>
  </header>
</template>


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


<script>
export default {

}
</script>
