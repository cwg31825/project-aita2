<template lang="html">
  <div class="main" v-if="datasList">
    <v-goods :goods="datasList" v-if="type=='1'" :num="20" :title="false"></v-goods>
    <v-stores :num="20"  v-if="type=='2'" :supplieslist="datasList" :getList="getList"></v-stores>
    <h1 v-if="datasList.length=='0'" style="text-align: center;">没有找到想要的</h1>
    
  </div>
  
</template>

<script>
import { Lazyload } from 'mint-ui';
import goods from "@/common/_goods.vue";
export default {
  props:['datasList','type','getList'],
  computed:{
    // 获取当前aside栏选择的是第几个
    tabIndex(){
      return this.$store.state.category.tabIndex
    }
  }
}
</script>

<style lang="less" scoped>

</style>
