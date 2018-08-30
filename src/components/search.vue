<template>
  <div class="">
    <mt-search autofocus v-model.trim="search_val" :placeholder="placeholder"></mt-search>
  </div>
</template>

<script>
  export default {
    props: ["placeholder", "fun_click"],
    data() {
      return {
        search_val: "",
        btnActive: false
      }
    },
    watch: {
      search_val(data) {
        if (data !== "") {
          this.btnActive = true;
          this.fun_click(data);
        }
        else {
          this.btnActive = false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_687988_72mjq1o2tsi.css';
.mint-search {
  height: auto;
}
  .search-container {
    display: flex;
    padding-bottom: 0.2rem;
    background: #fff;
    .search-input, .btn-search {
      //@include px2rem(line-height, 60);
      font-size: 0.2rem;
    }
    .search-input {
      flex: 1;
      background: rgb(239, 238, 244);
      border-radius: 0.4rem;
      margin: 0 10px;
      padding-left: 10px;
      input {
        width: 85%;
        height: 100%;
        border: none;
        text-indent: 20px;
        outline: none;
        background: rgba(237, 237, 237, 0.1);
        line-height: normal;
        &::-webkit-input-placeholder {
          font-size: 0.3rem;
        }
      }
    }
    .btn-search {
      font-size:0.4rem;
      display: inline-block;
      color: #fff;
      background: rgb(145, 145, 145);
      //@include px2rem(width, 145);
      text-align: center;
      border-radius: 0.1rem;
      margin-right:5px;
      &.active {
        //color: $mtYellow;
        background: rgb(242, 242, 242);
      }
    }
  }
</style>
