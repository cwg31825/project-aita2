<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header :title="name" :fixed="true"></v-header>
    <v-stores :num="10" :supplieslist="userData.guanzhu_supplier_content_result" :getList="getList"></v-stores>
  </div>
</template>
<script>
import { userInfo } from "@/api/user";
import { getInfo } from '@/utils/auth'
export default {
  components: {
  },
  data() {
    return {
      name:"收藏的店铺",
      topStatus: "",
      userData:'',
      }
  },
  methods: {
    getList() {
      this.key= getInfo()
      if(this.key){
        var data={
          key:this.key
        }
        userInfo(data).then(res => {
        if (res.data.code == "1") {
          this.$store.commit("SET_USERDATA", res.data.data);
          this.userData = res.data.data;
        }
      });
      }
    }
  },
  mounted() {
this.userData = this.$store.state.login.userData;
  }
}
</script>



<style lang="less" scoped>
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
    padding-top: 12vw;
}
</style>