<template lang="html">
<!--店铺 LIST -->
  <section class="stores" v-if='supplieslist'>
    <ul class="stores-list">
      <router-link tag="li" :to="{name:'店铺详情',params:{id:k.supplier_id,name:k.supplier_name}}"  v-for="(k, ind) in supplieslist" :key="k.supplier_id" v-if="ind < num" class="product-specifics">
        <div class="product-specifics-left">
          <img v-lazy="k.logo" alt="">
        </div>
        <div class="product-specifics-right">
          <h1 class="store-name" >{{k.supplier_name}}</h1>
          <span class="desc">{{k.supplier_title}}</span>
          <p>地址：{{k.supplier_address}}</p>
          <p>
            <!--37)	店铺关注接口 -->
          <span class="right" @click.stop="collect(k.supplier_id,k.is_collect)">
            <i class="iconfont" :class="k.is_collect=='0'?'icon-dianpuguanzhu':'icon-like_fill'" ></i> 
            <span>{{collectTxt}}</span>
          </span>
          <span>宝贝数量：{{k.goods_num}}件</span>
          </p>
        </div>
      </router-link>
    </ul>
  </section>
</template>

<script>
import { Toast } from "mint-ui";
import { getInfo } from '@/utils/auth'
import {collect,deleteCollect} from '@/api/restaurant'

export default {
  props: ["num", "supplieslist", "getList"],
  data() {
    return {
      collectTxt: "关注",
      avatar: "../../static/index/storesLogo.png"
    };
  },
  methods: {
    //supplier/supplier_collect
    //判断图片是否存在
    isHasImg(pathImg) {
      var ImgObj = new Image();
      ImgObj.src = pathImg;
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
      } else {
        return false;
      }
    },
    collect(k, c) {
      var data = {
        key: getInfo(),
        supplier_id: parseFloat(k)
      };
      if (c == 0) {
        //关注
        collect(data).then((res) => {
          if (res.data.code == '1') {
            this.getList();
            //Toast(res.data.msg)
            Toast({
              message: res.data.msg,
              iconClass: 'icon icon-success'
            });
          }
        })
      } else {
        //取消关注
        deleteCollect(data).then((res) => {
          if (res.data.code == '1') {
            this.getList();
            Toast(res.data.msg)
          }
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/fonts/iconfont.css";
.stores {
  .stores-title {
    .bt();
    text-align: left;
    padding: 2vw 9vw;
    .fz(font-size, 30);
    color: #333;
    position: relative;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2vw;
    i {
      position: absolute;
      left: 2vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);
      &::before {
        color: @color-text;
      }
    }
  }

  .stores-list {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 2vw 0;
    li {
      width: 100%;
      margin-bottom: 2vw;
      height: 112px;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      a,
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .product-specifics {
    overflow: hidden;
    position: relative;
    background: rgba(255, 255, 255, 0.75);
    border-top: 1px solid @border-color;
  }

  .product-specifics-left {
    flex: 2;
  }
  .product-specifics-right {
    flex: 5;
    font-size: 12px;
    padding: 0 10px;
    overflow: hidden;
    .store-name {
      font-size: 16px;
      line-height: 8vw;
      .text1();
    }
    p {
      margin: 1vw 0;
    }
    span {
      display: block;
      .text2(2);
    }
    i {
      color: @color-text;
    }
    .desc {
      min-height: 32px;
    }
    .right {
      float: right;
      margin-top: -25px;
    }
  }
  .product-specifics-left > p:nth-child(1) {
    color: @color-text;
    font-size: 14px;
  }
  .product-specifics-left > p:nth-child(2) {
    color: #e44619;
  }
}
</style>
