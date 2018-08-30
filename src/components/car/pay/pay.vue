<template lang="html">

  <div class="pay">
    <v-header :title="name" :fixed="true"></v-header>
    <v-addressList :list="list" :pay="pay"></v-addressList>
    <div class="pay-product">
      <ul v-if="carList">
        <li v-for="k in carList">
          <a>
            <img :src="k.goods_img" alt="">
            <div>
              <h2> {{k.goods_name}} -</h2>
              <p>{{k.goods_price}} 元 * {{k.number}}</p>
            </div>
          </a>
        </li>
      </ul>

    </div>
<footer class="footer" v-if="carList">
    <div class="footer-result">
      <p><span><i>￥</i>{{allpay}}</span></p>
    </div>
    <a class="footer-pay" @click="payConfirm">
      提交订单
    </a>
  </footer>

  </div>
</template>

<script>
import Util from '@/util/common'
import Header from '@/common/_header.vue'
import AddressList from '@/components/user/addressList.vue'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import {submitOrder} from '@/api/order'
export default {
  components: {
    'v-header': Header,
    'v-addressList':AddressList
  },
  data() {
    return {
      name:"确认订单",
      confirm: '',
      list:'',
      pay:true
    }
  },
  mounted() {
// 防止页面刷新后数据丢失
    if (this.$store.state.detail.selectedList == '') {
      this.$store.commit('SET_SELECTEDLIST')
    }
  },
  created(){
      this.getList()
    },
  computed: {

    //所有商品列表
    carList() {
      return this.$store.state.detail.selectedList
    },

    // 商品价格总和
    allpay() {
      let allpay = 0;
      if(this.$store.state.detail.selectedList&&this.$store.getters.selectedList){
for (let i = 0; i < this.$store.state.detail.selectedList.length; i++) {
        allpay += (this.$store.getters.selectedList[i].goods_price*1)*(this.$store.getters.selectedList[i].number*1);
      }
      }
      
      return allpay
    }
  },

  methods: {
    getList(){
        var data={
          key:this.$store.state.login.data.key
        }
        this.$api({
          method: 'post',
          url: '/goods/addresslist',
          data:Util.toQueryString(data)
        }).then((res) => {
          var obj=res.data;
          if(obj.code=='1'){
           // Toast(obj.msg)
            this.list=obj.data
          }if(obj.code=='-220'){
            Toast(obj.msg)
            this.$store.commit('CHANGE_TOKEN',0);
            this.$router.replace({path: 'login'})
          }
        }).catch(function(error) {
          alert(error)
        })
      },
    payConfirm() {
      //submitOrder
      let rec_id = '';
      for (let i = 0; i < this.$store.state.detail.selectedList.length; i++) {
        rec_id += this.$store.getters.selectedList[i].rec_id+','
      }
      var reg=/,$/gi; 
      rec_id=rec_id.replace(reg,""); 
      //
      let address_id = '';
      this.list.map(function (item) {
        if (item.is_default=='1') {
          address_id += item.address_id
        }
        })

      var data = {
          key: this.$store.state.login.data.key,
          rec_id: rec_id,//商品id
          address_id: address_id,//收获地址
          shipping_fee: '0',//配送费用
          expressage_id: '3',//配送方式id
          bonus_id: '',//红包id
          bonus_type_id: '',//红包类型id
          message: '',//订单留言
        };
        submitOrder(data).then((res) => {
          if (res.data.code === 1) {
            Toast(res.data.msg);
            this.$store.dispatch('resetCarList')
            this.$store.dispatch('resetCount')
            this.$store.dispatch('cutCarList')
            this.$store.dispatch('resetSelectedList')
            this.$store.commit('SET_SELECTEDLIST')
            //this.$router.push({path: '/pay', query: {order_id: response.data.order_id}})
            //     this.$router.push({name:'待付款',params:{id:'1'}})
          }
        })
    }
  }

}
</script>

<style lang="less" scoped>
@import '../../../assets/fz.less';
.pay {
    width: 100%;
    background-color: #F7F7F7;
padding-top: 12vw;
    .pay-address {
        background-color: #fff;
        padding: 30*10vw/75;
        background-image: url('/static/address/address_bg.png');
        background-size: contain;
        > div {
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            justify-content: space-between;

            p {
                color: #868686;
                .fz(font-size,32px);
            }
        }

        > p {
            .fz(font-size,28px);
            color: #868686;
            letter-spacing: 3*10vw/75;
            line-height: 40*10vw/75;
        }
    }
    .pay-product {
        background-color: #fff;
        overflow: auto;

        li {
            a {
                display: -webkit-flex;
                display: -ms-flex;
                display: flex;
                box-sizing: border-box;
                padding: 20*10vw/75 30*10vw/75;
                color: #4D4D4D;
                .fz(font-size,30px);
                border-bottom: 1*10vw/75 solid #DEDEDE;

                > img {
                    display: block;
                    width: 2.5*10vw;
                    height: 2.5*10vw;
                }

                > div {
                    box-sizing: border-box;
                    padding-left: 50*10vw/75;
                    width: 70%;
                    h2 {
                        padding-top: 0.09*10vw;
                        overflow: hidden;
                        word-break: keep-all;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    p {
                        text-align: right;
                        .fz(font-size,24px);
                        padding-top: 1.4*10vw;
                    }
                }
            }
        }
    }

    .pay-allpay {
        text-align: right;
        margin-top: 6vw;
        padding: 4vw 5vw;
        .fz(font-size,32px);
        color: #999999;
        background-color: #fff;
        i,
        span {
            color: @cl;
        }
    }

    .pay-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 4vw;
        span {
            display: block;
            width: 85%;
            background-color: #fd729c;
            border-radius: 1.3vw;
            color: #fff;
            font-size: 17px;
            padding: 4vw;
            margin: 0 auto;
            text-align: center;
            &:active {
                background-color: @cl;
            }
        }

    }

    .pay-confirm {
        padding: 20px 0;
        background-color: @cl;
        text-align: center;
        color: #fff;
        line-height: 30px;
        .fz(font-size,40);
    }

     .footer {
    width: 100%;
    height: 16vw;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    .footer-result,a {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
    }

    .footer-result {
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-goon {
      background-color: #F4F4F4;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color:#fff;
    }

  }
}
</style>
