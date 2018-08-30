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

export default {
  props: ["formData"],
  components:{
    Linkage, //注册子组件
  },
  data() {
    return {
      showLinkage:false, //控制子组件的显示隐藏
        result:'请选择所在省市',
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
    }
  },
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_687988_72mjq1o2tsi.css";

#address-info {
  .getCity{
  font-size: 20px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
  form {
    h3 {
      font-size: 0.3rem;
      font-weight: 600;
      margin: 0.4rem 0.2rem;
    }
    .name,
    .phone,
    .location,
    .house-number {
      background: #fff;
      border-bottom: 1px solid;
    }
    label {
      //@include px2rem(line-height, 85);
      float: left;
      font-size: 0.4rem;
      font-weight: 600;
      margin-left: 0.2rem;
    }
    .input-container {
      display: block;
      margin-left: 3rem;
    }
    input {
      width: 100%;
      //@include px2rem(height, 85);
      border: none;
      font-size: 0.45rem;
      text-indent: 10px;
      outline: none;
      &::-webkit-input-placeholder {
        font-size: 0.4rem;
        color: #9d9d9d;
      }
    }
    /*定位*/
    .location {
      font-size: 0.4rem;
      .select-address-container {
        //@include px2rem(line-height, 85);
        .icon-right {
          float: right;
          margin-right: 10px;
        }
      }
      .to-locate {
        flex: 1;
        color: #9d9d9d;
      }
    }
    /*选择性别*/
    .gender {
      text-align: center;
      padding: 0.1rem 0;
      background: #fff;
      border-bottom: 1px solid;
      div {
        display: inline-block;
        margin: 0.5rem 0.5rem;
        .iconfont,
        .circle {
          //@include px2rem(width, 36);
          //@include px2rem(height, 36);
          display: inline-block;
          color: #fff;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          font-size: 0.4rem;
          font-weight: 600;
          margin: 0 0.1rem;
        }
        .iconfont {
          //background: ;
          font-size: 0.6rem;
          //@include px2rem(line-height, 36);
          text-align: center;
        }
        .circle {
          border: 1px solid;
        }
      }
    }
  }
}
</style>
