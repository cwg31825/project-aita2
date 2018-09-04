<template lang="html">
  <footer class="footer">
    <router-link :to="{name:'首页'}" class="footer-index">
      <i class="iconfont icon-shouye-xuanzhong"></i>
    </router-link>
    <router-link  :to="{name:'购物车'}" class="footer-gocar">
      <i class="iconfont icon-caigou"></i>
      <span v-if="count">{{count}}</span>
    </router-link>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>
  </footer>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import { mapGetters } from "vuex";
import { getInfo } from "@/utils/auth";
import { addShoppingCart, getCartlist } from "@/api/request";

export default {
  props: ["goodsInfo"],
  created() {},
  computed: {
    ...mapGetters(["cartList"]),
    count() {
      //页面刷新后 数据会消失,解决:加判断
      return this.cartList.totalNum ? this.cartList.totalNum : 0;
    },
    productDatasView() {
      return this.$store.state.detail.productDatas.view;
    },
    colSelected() {
      return this.$store.state.detail.colSelected;
    },
    sizeSelected() {
      return this.$store.state.detail.sizeSelected;
    },
    // 返回当前选择颜色的值(innerText)
    colText() {
      var select = this.colSelected;
      if (this.goodsInfo.attribute[0]) {
        var col = "";
        this.goodsInfo.attribute[0].attr_value.map(item => {
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
        this.goodsInfo.attribute[1].attr_value.map(item => {
          if (item.attr_value_id == select) {
            size += item.attr_value_name;
          }
        });
        return size;
      }
    }
  },

  methods: {
    getCartlist(key) {
      getCartlist({ key: key }).then(res => {
        if (res.data.code == "1") {
          this.$store.dispatch("addCart", res.data.data);
        }
      });
    },
    addcart(goods_id, attrvalue_id) {
      let key = getInfo();

      var data = {
        key: key,
        num: "1",
        goods_id: goods_id,
        attrvalue_id: JSON.stringify([this.colSelected, this.sizeSelected])
      };
      addShoppingCart(data).then(res => {
        if (res.data.code == "1") {
          this.getCartlist(key);
        }
      });
    },
    addIntoCar() {
      if (this.goodsInfo.attribute.length > 0) {
        if (this.colSelected > 0 && this.sizeSelected > 0) {
          MessageBox.confirm(
            `名称:${this.goodsInfo.goods_name}</br>` +
              `价格:${this.goodsInfo.shop_price}</br>` +
              `规格:${this.colText}-${this.sizeText}</br>` +
              `商品ID:${this.goodsInfo.goods_id}</br>`
          ).then(
            action => {
              this.addcart(this.goodsInfo.goods_id, this.goodsInfo.attribute);
            },
            function(err) {}
          );
        } else {
          Toast("请选择规格");
        }
      } else {
        MessageBox.confirm(
          `名称:${this.goodsInfo.goods_name}</br>` +
            `价格:${this.goodsInfo.shop_price}</br>` +
            `商品ID:${this.goodsInfo.goods_id}</br>`
        ).then(
          action => {
            this.addcart(this.goodsInfo.goods_id, this.goodsInfo.attribute);
          },
          function(err) {}
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/css/style.css";
@import "../../assets/fonts/iconfont.css";
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
  .footer-index,
  .footer-gocar,
  .footer-addcar {
    text-align: center;
  }

  .footer-index {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    line-height: 12vw;
    height: 14vw;
    padding-top: 1.5vw;
    border-right-color: #f7f7f7;
    border-right-style: solid;

    i {
      color: @color-text;
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
      background-color: @cl;
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
    background-color: @cl;
    letter-spacing: 0.2vw;
    &:active {
      background-color: #ff7d00;
    }
  }
}
</style>
