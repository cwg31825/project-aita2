<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header :title="name" :fixed="false" :search="2"></v-header>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :auto-fill="false" ref="loadmore">
       <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
            <span v-show="topStatus === 'drop'">释放更新</span>
        </div>
    <v-stores :num="10" :supplieslist="supplieslist" :getList="getList"></v-stores>
    </mt-loadmore>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { getInfo } from "@/utils/auth";
import { getSuppliers } from "@/api/restaurant";
export default {
  components: {},
  data() {
    return {
      name: "店铺",
      topStatus: "",
      supplieslist: ""
    };
  },
  methods: {
    loadTop() {
      // 刷新数据的操作
      this.getList();
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    getList() {
      let key = getInfo();
      var data = {
        key: key
      };
      getSuppliers(data).then(res => {
        if (res.data.code == "1") {
          this.supplieslist = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>



<style lang="less" scoped>
.index {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f8fcff;
}
</style>