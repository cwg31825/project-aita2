<template lang="html">

  <mt-header title="工部">

  <router-link :to="{name:''}" slot="right">
    <mt-button icon="search"></mt-button>
  </router-link>
</mt-header>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.mint-header {
    background-color: @color-background;
    .fz(font-size, 36)!important;
}
</style>
