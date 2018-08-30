<template lang="html">


  <div class="car">
    <v-header :userData="userData"> <router-link to="/setting" slot="icon"><i class="iconfont icon-shezhi rt"></i></router-link></v-header>
     <v-service :serviceData="service.list"></v-service>
    <!--<i>-->
    <div class="main">
        <section class="my-vip">
          <!-- <mt-cell
            title="账户余额"
            :to="{name:'用户页'}"
            is-link
            :value="userData.user_money"
          >
            <i class="iconfont icon-zhanghuyue use-icon" slot="icon"></i>
          </mt-cell> -->
          <mt-cell
            title="我的竞拍"
            :to="{name:'用户页'}"
            is-link
            value="待开发"
          >
            <i class="iconfont icon-wodejingpai use-icon" slot="icon"></i>
          </mt-cell>
          <mt-cell
            title="商品收藏"
            :to="{name:'收藏页'}"
            is-link
            :value="userData.collect_count"
          >
            <i class="iconfont icon-dianpuguanzhu use-icon" slot="icon"></i>
          </mt-cell>
          <mt-cell
            title="店铺关注"
            :to="{name:'关注页'}"
            is-link
            :value="userData.guanzhu_supplier_count"
          >
            <i class="iconfont icon-like_fill use-icon" slot="icon"></i>
          </mt-cell>
          <mt-cell
            title="我要开店"
            :to="{name:'用户页'}"
            is-link
            value="未开通"
          >
            <i class="iconfont icon-woyaokaidian use-icon" slot="icon"></i>
          </mt-cell>

          </section>



      </div>

      <v-footer></v-footer>
    </div>
</template>

<script>

  import Service from '@/common/_service.vue';
  import Header from './header';
  import {getInfo} from '@/utils/auth'
  import { userInfo } from "@/api/user";
  export default {
    components: {
      'v-service': Service,
      'v-header': Header,
    },
    created(){
        
        if(!this.userData){
          this.$store.commit("SET_USERDATA",'');
          userInfo({key:getInfo()}).then(res => {
          if (res.data.code == "1") {
            this.userData =res.data.data
            this.$store.commit("SET_USERDATA", res.data.data);
          }
        });
        }else{
          this.userData = this.$store.state.login.userData;
        }
    },
    data(){
      return {
         key:'',
        headerImage:'',
        userData:'',
        service:{
          'list':[{
            'imgPath':'./static/index/order-type-11.png','name':'待付款','path': "/myOrder",'bool':false,'id':'1',
          },{
            'imgPath':'./static/index/order-type-12.png','name':'待收货','path': "/myOrder",'bool':false,'id':'8',
          },{
            'imgPath':'./static/index/order-type-13.png','name':'已完成','path': "/myOrder",'bool':false,'id':'6',
          },{
            'imgPath':'./static/index/order-type-15.png','name':'全部订单','path': "/myOrder",'bool':false,'id':'0',
          }]
        },
      }
    },
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/css/style.css';
  @import '../../assets/user/icon/carstyle.css';


  .car {
    width: 100%;
    height:100%;
    padding-bottom: 14vw;
    background-color: @color-back-gr;
    .rt{
      position: absolute;
      top:10px;
      right:10px;
    }


    .main {
      width: 100%;
      background-color: #fff;
      .my-vip{
        .mint-cell-value{
          margin-right:36px!important;
        }
        .mint-cell{
          padding:0 10px;
          border-bottom: 1px solid #ccc;
          &:last-child{
            border-bottom:none;
          }
          .use-icon{
            .fz(font-size,40);
            color:@color-text;
            margin-right:7px;
          }

        }
      }


    }
  }
  /*图标大小不一，重新定义*/



</style>
