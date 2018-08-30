<template lang="html">
  <div class="main" v-if="hotdatas">
    <v-goods :goods="hotdatas.data" :num="99" :title="false"></v-goods>
  </div>
</template>

<script>
import { Lazyload } from 'mint-ui';
import goods from "@/common/_goods.vue";
export default {
  props:['hotdatas'],
  components: {
    "v-goods": goods,
  },
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
