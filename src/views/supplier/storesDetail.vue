<template lang="html">

  <div class="index">
    <v-header :title="name" :fixed="true"></v-header>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :auto-fill="false" ref="loadmore">
      <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
            <span v-show="topStatus === 'drop'">释放更新</span>
        </div>
    <v-swiper :swiperData="datas.data"></v-swiper>
    <!-- <section class="content">
    <div class="mint-content" v-html="desc.data"></div>
  </section> -->
  <v-chose :chose="cat.data" :getGoods="getGoods" v-on:childByValue="childByValue"></v-chose>
  <v-goods :goods="goodsList.data" :num="99"></v-goods>
  </mt-loadmore>
  </div>
</template>

<script>

import Swiper from "./swiper.vue";
import Chose from './chose.vue';

import {getSlideshow,getSupplierDesc,getSupplierCat,getSupplierGoods} from '@/api/restaurant'

export default {
  components: {
    "v-swiper": Swiper,
    'v-chose':Chose,
  },
  data() {
    return {
      data:{supplier_id: this.$route.params.id},
      datas: "",
      desc: "",
      cat: "",
      catSelect: "",
      goodsList:"",
      topStatus: "",
      name: this.$route.params.name
    };
  },
  mounted() {
    this.getSwiper()
    this.getCat()
    this.getGoods()
  },
  methods: {
    childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.catSelect = childValue
      },
    loadTop() {
      // 刷新数据的操作
      this.getSwiper()
      this.getCat()
      this.getGoods(this.catSelect);
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    getSwiper(){
      //39)	获取店铺轮播图接口
      getSlideshow(this.data).then(res => {
        if (res.data.code == "1") {
          this.datas = res.data;
        }
      });
    },
    getDesc(){
      //40)	获取店铺首页店铺介绍
      getSupplierDesc(this.data).then(res => {
        if (res.data.code == "1") {
          this.desc = res.data;
        }
      });
    },
    
    getCat(){//41)	获取店铺首页店铺分类
      getSupplierCat(this.data).then(res => {
        if (res.data.code == "1") {
          this.cat = res.data;
        }
      });
    },
    //2) 店铺商品列表
    getGoods(cat_id){
      var id = this.$route.params.id;
      var data = {
      supplier_id: id,
      cat_id:cat_id
    };
    getSupplierGoods(data).then(res => {
        if (res.data.code == "1") {
          this.goodsList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.index{
  padding-top: 12vw;
}
</style>