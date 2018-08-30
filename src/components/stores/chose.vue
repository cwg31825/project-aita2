<template lang="html">
  <section class="chose">
  <!-- 添加空函数 解决Safari浏览器 :active无效 -->
    <div class="chose-mychosed" ontouchstart="" v-if="chose!=''">
      <ul>
        <li :class="{active:colSelected==0}" @click="colChose(0)">全部</li>
        <li v-for="(k,i) in chose" :class="{active:colSelected==k.cat_id}" @click="colChose(k.cat_id)">{{k.cat_name}}</li>
      </ul>
    </div>

  </section>

</template>

<script>
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
export default {
  props: ["chose","getGoods"],
  data() {
    return {
      colSelected: "0",
    };
  },
  methods: {
    //点击后把i赋值给colSelected,再通过判断决定是否添加选中样式 (active)
    colChose(i) {
     this.colSelected = i;
      this.getGoods(i)
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.chose {
  padding: 3vw;
  .chose-mychosed {
    background-color: #fff;
    > ul {
      padding-top: 5px;
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;

      li {
        .fz(font-size,26);
        padding: 3px 6px;
        border: 1px solid white;
        border-width: 1px 1px 3px;
        margin-right: 1vw;
        color: rgb(111, 111, 111);
        &.active,
        &:active {
          color: @color-text;
          border-color: white white #BC0404;
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
