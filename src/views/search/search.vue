<template lang="html">
  <div class="wrap">
    <v-header :title="title" :fixed="true"></v-header>
      <v-aside :datas="allData" :getList="getList" :type="type"></v-aside>
      <router-view :datasList="datasList" :type="type" :getList="getList"></router-view>
  </div>
  
</template>

<script>
import Aside from "./aside.vue";
import { getGoodslist,getClassify } from "@/api/request";
import { getSuppliers } from "@/api/restaurant";
import { getInfo } from "@/utils/auth";
export default {
  
  components: {
    "v-aside": Aside
  },
  data() {
    return {
      title:this.$route.params.type=='1'?'搜索商品':'搜索店铺',
      type:this.$route.params.type,
      datasList: "",
      allData: "",
    };
  },
  mounted() {
    this.getList();
    this.getFitrate();
  },
  computed:{

},
  methods: {
    
    getList(id, key) {
      
      if(this.type=='1'){
        let data = {
        cat_id: id,
        keyword: key
      };
        getGoodslist(data).then(res => {
        if (res.data.code == "1") {
          this.datasList = res.data.data;
        }
      });
      }
      if(this.type=='2'){
        let data = {
          key:getInfo(),
          keyword: key
        };
        getSuppliers(data).then(res => {
        if (res.data.code == "1") {
          this.datasList = res.data.data;
        }
      });
      }
    },
    getFitrate() {
      var data = {
        parent_id: 0,
        type: 0
      };
      getClassify(data).then(res => {
        if (res.data.code == "1") {
          this.allData = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
 
}
</style>
