<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header :title="name" :fixed="true"></v-header>
    <v-goods :goods="userData.collect_content_result" :num="10" :title="false"></v-goods>
  </div>
</template>

<script>
import { userInfo } from "@/api/user";
import {getInfo} from '@/utils/auth'
export default {
  components: {

  },
  data() {
    return {
      name:"收藏的商品",
      topStatus: "",
      userData:'',
      }
  },
  methods: {
  },
  mounted() {
this.userData = this.$store.state.login.userData;
  }
}
</script>



<style lang="less" scoped>
.index {
    width: 100%;
    background-color: #F8FCFF;
    padding-top: 13vw;
}
</style>