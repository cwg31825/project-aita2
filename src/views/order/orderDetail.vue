<template lang="html">
  <div class="order">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
           <div class="time_box" v-if="order_list[0].order_status=='1'">
              <h3 class="bigText">等待买家付款</h3>
              <p>剩下23小时59分自动关闭</p>
           </div>
            <div class="text_box" v-if="order_list[0].order_status!='1'">
              <h2 class="bigText">物流信息</h2>
              <p class="midText">地址：<span class="darkgray">一汽大众</span></p>
              <p class="midText">时间：2014-45-15 12：13:14</p>
            </div>
            <div class="address">
              <p class="midText"><span>收货人：{{order_list[0].consignee}}</span><span class="rt">{{order_list[0].mobile}}</span></p>
              <p>
                <i class="icon iconfont icon-weizhi adIcon" ></i>
                <span class="rtText">收货地址：{{order_list[0].address}}</span>
              </p>
            </div>
            <v-orderItem :order_list="order_list" :order_id="order_id" ></v-orderItem>
      </div>
    </section>

  </div>
</template>

<script>
import { getInfo } from "@/utils/auth";
import { orderInfo} from '@/api/order'
import orderItem from "./item.vue";
  export default {
    components:{
      "v-orderItem": orderItem
    },
    data(){
      return {
        title:this.$route.name,
        pickerVisible:false,
        selected:'',
        order_id:'',
        order_list:[],
      }
    },
    created(){
      this.order_id = this.$route.query.order_id;
      let key = getInfo()
      orderInfo({ key:key,order_id: this.order_id}).then((res) => {
        this.order_list = res.data.data;
      })
    },
    methods:{
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fonts/iconfont.css';
  @import '../../assets/fz.less';
  .order {
    background-color: @color-back-gr;
    color:@col-text-gr;
    font-size:12px;
    margin-top:12vw;
    .mint-cell{
      background: #fff;
      padding:0 20px;
    }
    .time_box{
      width:100%;
      height:100px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      background: url("/static/user/dai_bg.png") no-repeat;
      background-size: cover;
      padding:32px 0 0 40px;

    }
    .text_box{
      background: #fff;
      padding:15px 20px;
      line-height: 25px;
    }
    .address{
      margin-top:10px;
      background: #fff;
      padding:15px 20px;
      p{
        line-height:19px;
        &:first-child{
          margin-left:19px;
          margin-bottom: 12px;
        }
        .adIcon{
          height:34px;
          float: left;
          font-size:14px;
          position: relative;
          margin-right:4px;
        }

      }
    }


  }
</style>
