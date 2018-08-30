<template lang="html">

  <div class="wrap">
    <ul class="something" v-if='list'>
        <li v-for="(k, i) in list.data">
          <div class="something-left" @click.stop="aa(k,k.choseBool,i)">
            <label class="true" :class="{false:!k.choseBool}">
              <input type="checkbox" v-model="k.choseBool">
            </label>
          </div>
          <div class="something-middle">
            <img :src="k.goods_img">
          </div>
          <div class="something-right">
             <router-link :to="{name:'详情页',params:{id:k.goods_id}}">{{k.goods_name}}</router-link>
            <!-- <p style="color:rgb(199, 108, 28)"> {{k.col}} - {{k.size}}</p> -->
            <p>售价：{{k.goods_price}}元 * {{k.number}}</p>
            <div class="something-right-bottom" @click="delcart(k.rec_id)">
              <span></span>
            </div>
          </div>
      </li>
    </ul>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
import { getInfo } from "@/utils/auth";
import { reduceShoppingCart } from "@/api/request";

export default {
  props: ["list","getCartlist"],
  data(){
      return {
        alertText:'',
      showTip: false,
      totalPrice: 0,
      number:0,
      choseBool:true,
      selectFood: {data:[],totalNum:0,totalPrice:0},   //选中列表
      }
  },
  computed: {},
  mounted() {
      
  },
  methods: {
    //8)	购物车删除产品delcart
    delcart(rec_id) {
      let key = getInfo();
      var data = {
        key: key,
        rec_id: rec_id
      };
      reduceShoppingCart(data).then(res => {
        if (res.data.code == "1") {
          this.alertText = res.data.msg;
          this.showTip = true
          this.getCartlist(key);
        }
      });
    },
    aa(k,b,i) {
        let food = new Array();　//创建一个数组
        if(b==true){
            this.totalPrice -= k.number * k.goods_price;  //修改价格
            this.number -= k.number*1
            let row 
            this.selectFood.data.map(el =>{
                if(el.rec_id == k.rec_id){
                  row += el
                }
            })
             this.selectFood.data.splice(row,1);
            this.$emit('childByValue', this.selectFood)
        }else{
            this.totalPrice += k.number * k.goods_price;  //修改价格
            this.number += k.number*1
            let row
            this.selectFood.data.map(el =>{
                if(k.rec_id != el.rec_id){
                   row += k
                }
            })
            this.selectFood.data.push(k)
            this.$emit('childByValue', this.selectFood)
        }
        this.selectFood.totalNum=this.number
        this.selectFood.totalPrice=this.totalPrice
        
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.wrap {
  width: 100%;
  .something {
    width: 100%;
    > li {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 4vw 2vw;
      position: relative;
      height: 26vw;
      .bd();
      .something-left {
        -ms-flex: 2;
        -webkit-box-flex: 2;
        flex: 2;

        label {
          float: left;
          background: url("../../assets/car/images/t.svg") no-repeat center
            center/50% 50%;
          input {
            height: 14vw;
            width: 14vw;
            opacity: 0;
            filter: alpha(opacity=0);
          }
        }
        .false {
          background: url("../../assets/car/images/f.svg") no-repeat center
            center / 50% 50% !important;
        }
      }
      .something-middle {
        -ms-flex: 3;
        -webkit-box-flex: 3;
        flex: 3;
        height: 26vw;
        padding-left: 2vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .something-right {
        -ms-flex: 7;
        -webkit-box-flex: 7;
        flex: 7;
        height: 100%;
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column wrap;
        flex-flow: column wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding-left: 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          .fz(font-size,26);
        }
        p:last-of-type {
          .fz(font-size,22);
          color: rgb(168, 168, 168);
        }
        .something-right-bottom {
          > div {
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            input {
              width: 6vw;
              text-align: center;
            }

            span {
              height: 7vw;
              line-height: 7vw;
              width: 8vw;
              display: inline-block;
              border: 0.2vw solid #f1f1f1;
              border-radius: 1vw;
              text-align: center;
              font-size: 20px;
              cursor: pointer;
            }
          }
          > span {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 13vw;
            height: 13vw;
            background: url("../../assets/car/images/laji.svg") no-repeat
              center/50%;
          }
        }
      }
    }
  }
  label,
  span {
    &:active {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }
}
</style>
