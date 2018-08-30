<template lang="html">

  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="首页">
      <i slot="icon" class="iconfont icon-shouye"></i>
        首页
    </mt-tab-item>
    <mt-tab-item id="店铺">
      <i slot="icon" class="iconfont icon-dianpu"></i>
      店铺
    </mt-tab-item>
    <mt-tab-item id="购物车">
      <!-- <span v-if="count">{{count}}</span> -->
      <i slot="icon" class="iconfont icon-gouwuche-mokuai"></i>
      购物车
    </mt-tab-item>
    <mt-tab-item id="用户页">
      <i slot="icon" class="iconfont icon-wode1"></i>
      我的
    </mt-tab-item>
  </mt-tabbar>
  </footer>
</template>

<script>
  export default {
    computed:{

     count(){
       //页面刷新后 数据会消失,解决:加判断
       if(this.$store.state.detail.count=='') {
          this.$store.commit('CHANGE_COUNT');
       }
       return this.$store.state.detail.count
     }
     },
    methods: {
      gotoRouter() {
        this.$router.push({
          name: this.selected
        })
      }
    },
    data() {
      return {
        //对应mt-tab-item 的id值
        selected: '首页'
      }
    },
    mounted() {

      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;
      switch (Rname) {
        case '首页':
          this.selected = '首页';
          break;
        case '店铺':
          this.selected = '店铺';
          break;
        case '分类页':
          this.selected = '分类页';

          break;
        case '购物车':
          this.selected = '购物车';

          break;
        case '用户页':
          this.selected = '用户页';
          break;
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/fonts/iconfont.css';

  .footer {


    .mint-tabbar {
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      
      .is-selected {
        color: @color-text;
        
        background-color: #fff;
        i {
          filter: grayscale(0);
          opacity: 1;
          &::before {
            color: @color-text;
          }
        }
      }
      i {
        .fz(font-size, 42);
      }
      
      span {
      height: 5.5vw;
      width: 5.5vw;
      line-height: 5.5vw;
      position: absolute;
      top: -10.5vw;
      right: 5.5vw;
      background-color: @color-text;
      border-radius: 50%;
      color: #fff;
      .fz(font-size,24);
    }
    }
  }
</style>
