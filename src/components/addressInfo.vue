<template>
  <div id="address-info">
    <form>
      <h3>联系人</h3>
      <mt-field
              label="收货人"
              placeholder="请输入收货人"
              type = "text"
              v-model = "formData.username"
            ></mt-field>
            <mt-field
              label="联系电话"
              placeholder="请输入联系电话"
              type="number"
              v-model = "formData.telnumber"
              ></mt-field>

            <h3>收货地址</h3>
          <mt-cell title="省市区:" :value="result" is-link @click.native="_showLinkage"></mt-cell>
          <mt-field
              label="详细地址"
              placeholder="例:小区、楼栋号、单元室等"
              type="text"
              v-model = "formData.address_p"
            ></mt-field>
          <transition name="fade">
            <linkage @getLinkage='_showChildMsg' v-show="showLinkage" :formData="formData"></linkage>
          </transition>
    </form>
  </div>
</template>

<script>

import Linkage from '@/common/_linkage.vue' //引入子组件
import { timeout } from 'async';

export default {
  props: ["formData"],
  components:{
    Linkage, //注册子组件 
  },
  data() {
    return {
      showLinkage:false, //控制子组件的显示隐藏
        result:'请选择所在省市'
    };
  },

  methods: {
    _showChildMsg(msg){ //接收子组件数据
    this.$store.dispatch('recodeDeliveryAddress', {location:msg.id})
      this.result = msg.region_name
      this.showLinkage=false
    },
    _showLinkage(){
      this.showLinkage=true
    },
  },
  watch: {
    formData(val) {
      this.$emit("update:formData", val);
      this.result=this.formData.area
    }
  },
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_687988_72mjq1o2tsi.css";

#address-info {
 
  form {
    h3 {
      font-size: 0.4rem;
      font-weight: 600;
      margin: 0.4rem 0.2rem;
    }
    
  }
}
</style>
