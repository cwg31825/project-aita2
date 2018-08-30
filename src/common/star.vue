<template>
  <div id="star">
    <span class="on" v-for="(item, ind) in  on" :key="ind" ></span>
    <span class="half" v-for="(item, ind) in half" :key="ind"></span>
    <span class="off" v-for=" (item, ind) in (5 - on - half)" :key="ind"></span>
  </div>
</template>

<script>
  export default {
    props:{
      score:{
        type:Number,
        default:0
      }
    },
    computed:{
      on(){
        return  parseInt(this.score);
      },
      half(){
        return this.score - this.on >=0.5 ? 1 : 0;
      },
      off(){
        return 5 - this.on - this.half;
      }
    },
  }
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
  #star{
    display: inline-block;
    font-size:0;
    .on,.half,.off{
      display: inline-block;
      margin-right:3px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .on{
      background-image: url("../assets/star24_on@2x.png");
    }
    .half{
      background-image: url("../assets/star24_half@2x.png");
    }
    .off{
        background-image: url("../assets/star24_off@2x.png");
    }
  }
</style>
