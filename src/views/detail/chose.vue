<template lang="html">
  <section class="chose" v-if="goodsInfo">
    <div class="chose-view">
      <h1 class="chose-view-title">
        {{goodsInfo.goods_name}} 
        <span v-if="goodsInfo.attribute[0]">(已选 {{colText}} - {{sizeText}})</span>
      </h1>
      <span>{{goodsInfo.shop_price}}元</span>
      <p class="chose-view-intro">{{goodsInfo.exchange_price}}</p>
    </div>
  <!-- 添加空函数 解决Safari浏览器 :active无效 -->
    <div class="chose-mychosed" ontouchstart="" v-if="goodsInfo.attribute!=''">
      <div class="colChose">
        <span
           v-for="(k,i) in goodsInfo.attribute[0].attr_value"
           :class="{active:colSelected==k.attr_value_id}"
           @click="colChose(k.attr_value_id)"
         >{{k.attr_value_name}}</span>
      </div>
      <div class="sizeChose" >
        <span
          v-for="(k,i) in goodsInfo.attribute[1].attr_value"
          :class="{active:sizeSelected==k.attr_value_id}"
          @click="sizeChose(k.attr_value_id)"
        >
          {{k.attr_value_name}}
        </span>
      </div>
    </div>
    <p>
      <span>已售：{{goodsInfo.sales?goodsInfo.sales:'0'}}</span>

      <span class="right" v-if="goodsInfo.is_attention==0" @click="collect(goodsInfo.goods_id)">
        <i class="iconfont icon-dianpuguanzhu"></i>收藏
        </span>
      <span class="right" v-if="goodsInfo.is_attention==1" @click="qcollect(goodsInfo.goods_id)">
        <i class="iconfont icon-like_fill"></i>已收藏</span>
    </p>
  </section>

</template>

<script>
import { Toast } from "mint-ui";
import { mapState } from "vuex";
import { getInfo } from "@/utils/auth";
import { setCollect, setCollects } from "@/api/request";
export default {
  props: ["goodsInfo", "getGoodsInfo"],

  computed: mapState({
    colSelected: state => state.detail.colSelected,
    sizeSelected: state => state.detail.sizeSelected,
    // 返回当前选择颜色的值(innerText)
    colText() {
      var select = this.colSelected;
      if (this.goodsInfo.attribute[0]) {
        var col = "";
        this.goodsInfo.attribute[0].attr_value.map((item) => {
          if (item.attr_value_id == select) {
            col += item.attr_value_name;
          }
        });
        return col;
      }
    },
    // 返回当前选择规格的值(innerText)
    sizeText() {
      var select = this.sizeSelected;
      if (this.goodsInfo.attribute[1]) {
        var size = "";
        this.goodsInfo.attribute[1].attr_value.map((item) => {
          if (item.attr_value_id == select) {
            size += item.attr_value_name;
          }
        });
        return size;
      }
    }
  }),
  methods: {
    collect(goods_id) {
      var data = {
        key: getInfo(),
        goods_id: goods_id
      };
      setCollect(data).then(res => {
        if (res.data.code == "1") {
          this.getGoodsInfo();
          Toast(res.data.msg)
        }
      });
    },
    qcollect(goods_id) {
      var data = {
        key: getInfo(),
        goods_id: goods_id
      };
      setCollects(data).then(res => {
        if (res.data.code == "1") {
          this.getGoodsInfo();
          Toast(res.data.msg)
        }
      });
    },
    //点击后把i赋值给colSelected,再通过判断决定是否添加选中样式 (active)
    colChose(i) {
      this.$store.commit("CHANGE_COL_SELECTED", i);
    },
    sizeChose(i) {
      this.$store.commit("CHANGE_SIZE_SELECTED", i);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.chose {
  padding: 3vw;
  .right {
    float: right;
    color: @color-text;
  }
  .chose-view {
    > h1 {
      .fz(font-size,36);
      color: #2c3e50;
      > span {
        color: rgb(238, 113, 80);
      }
    }
    > span {
      line-height: 10vw;
      color: @color-text;
      .fz(font-size,34);
      font-weight: 600;
    }
  }

  .chose-mychosed {
    background-color: #fff;
    > div {
      padding-top: 20px;
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;

      span {
        .fz(font-size,26);
        padding: 6px 10px;
        border: 1px solid rgb(111, 111, 111);
        margin-right: 6vw;
        color: rgb(111, 111, 111);
        &.active,
        &:active {
          color: @color-text;
          border-color: @color-text;
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
    }
  }

  .footer {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    height: 14vw;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    -moz-user-select: none;
    -webkit-user-select: none;
    .bt();
    .footer-addcar,
    .footer-gocar,
    .footer-index {
      text-align: center;
    }

    .footer-index {
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      line-height: 14vw;
      height: 14vw;
      padding-top: 1.5vw;
      border-right-color: #f7f7f7;
      border-right-style: solid;
      .fz(border-right-width,1);

      i {
        .fz(font-size,45);
      }
      &:active {
        background-color: #f1f1f1;
      }
    }

    .footer-gocar {
      position: relative;
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      height: 14vw;
      line-height: 14vw;
      padding-top: 1.6vw;
      span {
        height: 5.5vw;
        width: 5.5vw;
        line-height: 5.5vw;
        position: absolute;
        top: 0.5vw;
        right: 5.5vw;
        background-color: @color-background;
        border-radius: 50%;
        color: #fff;
        .fz(font-size,24);
      }
      &:active {
        background-color: #f1f1f1;
      }
      i {
        .fz(font-size,48);
      }
    }

    .footer-addcar {
      -webkit-flex: 6;
      -ms-flex: 6;
      flex: 6;
      line-height: 14vw;
      height: 14vw;

      color: #fff;
      background-color: @color-background;
      letter-spacing: 0.2vw;
      &:active {
        background-color: #ff7d00;
      }
    }
  }
}
</style>
