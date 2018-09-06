<!--订单收货地址-->
<template>
  <div id="address">
    <v-header :title="title" :fixed="true"></v-header>
    <ul class="list">
      <li @click.stop="selectAddress(item)" class="item" :class="item.is_default=='1'?'on':'off'" v-for="item in addressLists" :key="item.address_id" >
      <p class="first">
        <span >收货人:{{item.username}}</span>
        <span class="rt">联系电话:{{item.telnumber}}</span>
      </p>
      <p>收货地址：{{ item.address}}</p>
      <div class="operation">
        
      </div>
    </li>
  </ul>
   <mt-button class="add" size="large" type="danger" @click="$router.push({path: '/add_address'})">新增收获地址</mt-button>

    <div class="empty-address" v-show="emptyAddress">
      <span>一个地址都没有哦</span>
    </div>
  </div>
</template>

<script>
import { getInfo } from "@/utils/auth";
import { getAllAddress } from "@/api/user";

export default {
  data() {
    return {
      title: this.$route.name,
      addressLists: [],
      selectAddressId: "",
      emptyAddress: false
    };
  },
  methods: {
    selectAddress(item) {
      this.select_address_id = item.address_id;
      this.$store.dispatch("recodeDeliveryAddress", item); //地址信息由vuex管理
      this.$router.go(-1); //返回上一个路由
    }
  },
  created() {
    let key = getInfo();
    getAllAddress({ key: key }).then(res => {
      //获取用户地址
      let data = res.data;
      if (data.code == "1") {
        if (!data.data.length) {
          this.emptyAddress = true;
        } else {
          this.emptyAddress = false;
          this.addressLists = res.data.data;
          this.selectAddressId = this.addressLists[1].address_id;
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_687988_72mjq1o2tsi.css";
@import "../../../assets/fz.less";
#address {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 202;
  background-color: @color-back-gr;
  padding-top: 12vw;
  .list {
    .item.on,
    .item.off {
      background-image: url("/static/address/address_bg.png");
      background-size: contain;
      background-position-y: bottom;
      background-repeat: repeat-x;
    }
    .item.off {
      background-image: -webkit-linear-gradient(
        top,
        #ffffff,
        #ffffff 0%,
        transparent 100%
      );
      background-image: linear-gradient(
        120deg,
        #ffffff,
        #ffffff 0%,
        transparent 100%
      );
    }
    .item {
      margin-bottom: 10px;
      padding: 6px 0 6px;
      font-size: 14px;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
      .first {
        font-size: 16px;
        margin-bottom: 6px;
      }
      p {
        line-height: 22px;
        padding: 0 20px;
      }
      .operation {
        border-top: 1px dashed @border-color;
        padding: 6px 20px 0;
        height: 2vw;
        margin-top: 6px;
        color: #666;
        span.label {
          position: relative;
          top: -4px;
          .icon-xuanzhong {
            color: @color-text;
          }
        }
        .rt {
          span {
            &.mar-r {
              margin-right: 12px;
            }
            i {
              font-size: 18px;
              margin-right: 2px;
            }
          }
        }
      }
    }
    .rt {
      float: right;
    }
  }
  .empty-address {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3D(-50%, -50%, 0);
    span {
      font-size: 0.4rem;
    }
  }

  .add {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    .icon {
      font-size: 0.6rem;
      margin: 0 0.1rem;
    }
    span {
      font-size: 0.5rem;
      font-weight: 400;
    }
  }
}
</style>
