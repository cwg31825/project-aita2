<!--订单收货地址-->
<template>
  <div id="address">
    <v-header :title="title" :fixed="true"></v-header>
    <div class="address" v-for="item in addressLists" :key="item.address_id"  @click.stop="selectAddress(item)" >
       <mt-cell
        :title="item.address"
        to="/confirmOrder/address"
        :label="item.username+' '+item.telnumber">
        <i class="iconfont icon-weizhi" slot="icon"></i>
          <label class="true" v-if="item.is_default=='1'">
              <input type="checkbox" v-model="item.is_default">
            </label>
    </mt-cell>
    </div>
   <mt-button class="add" size="large" type="danger" @click="$router.push({path: '/add_address'})">新增收获地址</mt-button>

    <div class="empty-address" v-show="emptyAddress">
      <span>一个地址都没有哦</span>
    </div>
  </div>
</template>

<script>
import { getInfo } from "@/utils/auth";
  import {getAllAddress} from '@/api/user'

  export default {
    data() {
      return {
        title:this.$route.name,
        addressLists: [],
        selectAddressId: '',
        emptyAddress: false
      }
    },
    methods: {
      selectAddress(item) {
        this.select_address_id = item.address_id;
        this.$store.dispatch('recodeDeliveryAddress', item); //地址信息由vuex管理
        this.$router.go(-1);                //返回上一个路由
      },
    },
    created() {
      let key = getInfo()
      getAllAddress({key:key}).then((res) => {    //获取用户地址
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
      })
    }
  }
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_687988_72mjq1o2tsi.css';
  @import '../../../assets/fz.less';
  #address {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background-color: @color-back-gr;
    padding-top: 12vw;
    .address {
      label {
          float: left;
          background: url("../../../assets/car/images/t.svg") no-repeat center
            center/50% 50%;
          input {
            height: 14vw;
            width: 14vw;
            opacity: 0;
            filter: alpha(opacity=0);
          }
        }
        .false {
          background: url("../../../assets/car/images/f.svg") no-repeat center
            center / 50% 50% !important;
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
