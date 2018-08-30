<template lang="html">
  <section class="message">
    <div class="marquee_title">
      <i class="iconfont icon-guangbo-"></i>
       <span>广播:</span>
        </div>
    <div class="message-list">
      <ul ref="con1" :class="{anim:animate==true}">
        <li v-for="k in marqueeList" :key="k.article_id">
            {{k.title}}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { Lazyload } from "mint-ui";

export default {
  props: ["marqueeList"],
  data() {
    return {
      animate: false
    };
  },
  created() {
    setInterval(this.showMarquee, 2000);
  },
  methods: {
    showMarquee() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.marqueeList.push(this.marqueeList[0]); // 将数组的第一个元素添加到数组的
        this.marqueeList.shift(); //删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.message {
  font-size: 14px;
  height: 32px;
  display: flex;
  background-color: white;
  padding-left: 2vw;
  i {
    font-size: 18px;
    color: @color-text;
    float: left;
    margin-right: 2vw;
    margin-top: 2vw;
  }
  span {
    line-height: 30px;
  }
  .message-list {
    height: 32px;
    overflow: hidden;
    padding-left: 2vw;
    > ul {
      background-color: transparent;
      .anim {
        transition: all 0.5s;
        margin-top: -30px;
      }
      li {
        list-style: none;
        line-height: 30px;
        height: 30px;
        background-color: transparent;
      }
    }
  }
}
</style>
