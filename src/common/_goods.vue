<template lang="html">
  <section class="section" v-if='goods'>
    <h1 class="section-title" v-if="title">
      <i class="iconfont icon-shanzi"></i>
      {{title}}
    </h1>
    <ul class="section-list">
      <router-link  tag="li" v-for="(k, ind) in goods" :key="k.goods_id" v-if="ind < num" :to="{name:'详情页',params:{id:k.goods_id}}">
          <img v-lazy="k.goods_img" alt="">
          <div class="product-specifics">
                <p class="category-name">{{k.goods_name}}</p>
                <div class="product-specifics-left">
                  <p>￥{{k.shop_price}}</p>
                </div>
                <!-- 添加到购物车按钮 -->
                <div v-if="k.sell_num" class="product-specifics-right">
                  <span>已售: {{k.sell_num}}</span>
                </div>
              </div>
      </router-link>
    </ul>
  </section>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Lazyload } from "mint-ui"; //Lazyload

export default {
  props: ["goods", "num", "title"],
  data() {
    return {
      avatar: "../../static/index/2@2x.png"
    };
  },
  methods: {
    //判断图片是否存在
    isHasImg(pathImg) {
      var ImgObj = new Image();
      ImgObj.src = pathImg;
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/fonts/iconfont.css";
.section {
  .section-title {
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

  .section-list {
    display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-pack: distribute;
      justify-content: space-between;
      padding:0 1vw;
      li {
        width: 49%;
        margin-bottom: 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        box-shadow: 0 0px 1px rgba(0, 0, 0, .2);
        a,
        img {
          width: 100%;
          display: block;
          height: 40vw;
        }
      }
  }
  .product-specifics {
    overflow: hidden;
    padding: 4px;
    background: rgba(255, 255, 255, 0.75);
    border-top: 1px solid @border-color;
  }
  .product-specifics-left {
    float: left;
    text-align: left;
  }
  .product-specifics-right {
    float: right;
    font-size: 12px;
    span {
      padding: 3vw;
    }
    i {
      color: @color-text;
    }
  }
  .product-specifics-left > p:nth-child(1) {
    color: @color-text;
    font-size: 14px;
  }
  .product-specifics-left > p:nth-child(2) {
    color: #e44619;
  }
  .category-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
    text-align: left;
    font-size: 14px;
  }
  .section1-banner {
    display: block;
    width: 100vw;
    img {
      width: 100%;
      height: 24vw;
    }
  }
}
</style>
