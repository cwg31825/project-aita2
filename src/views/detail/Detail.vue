<template lang="html">
  <div class="detail">
    <v-swiper :swiper="swiper"> </v-swiper>
    <v-chose :goodsInfo="goodsInfo" :getGoodsInfo="getGoodsInfo"></v-chose>
    <v-content :content="content"></v-content>
    <v-footer :goodsInfo="goodsInfo"></v-footer>
  </div>
</template>

<script>

import Swiper from './swiper.vue'
import Chose from './chose.vue'
import Content from './content.vue'
import Footer from './footer.vue'
import { getInfo } from '@/utils/auth'
import { getGoodsinfo } from "@/api/request";

  import { Toast } from 'mint-ui';
export default {
  components:{
    'v-swiper':Swiper,
    'v-chose':Chose,
    'v-content':Content,
    'v-footer':Footer,
  },
data() {
    return {
      swiper: '',
      content:'',
      goodsInfo:'',
      loading:true
    }
},
 created(){
      this.getGoodsInfo()
      
    },
methods: {
    getGoodsInfo() {
      var id=this.$route.params.id;
        var data={
          key:getInfo()?getInfo():'',
          goods_id:id,
          attrvalue_id:''
        }
         getGoodsinfo(data).then(res => {
        if (res.data.code == "1") {
          this.goodsInfo = res.data.data;
          this.swiper=res.data.data.album
          this.content = res.data.data.content
        }
      });
    }
  },
}
</script>

<style lang="less" scoped>

.detail {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
