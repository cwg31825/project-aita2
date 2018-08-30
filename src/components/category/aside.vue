<template lang="html">
<div class="jmc-search" v-if="datas">
    <!-- 当点击确定按钮时，触发submit事件 -->
    <div class="page-search" v-on:keyup.13="submit">
      <mt-search autofocus v-model="value" :result="filterResult" @keyup.enter="testsearch()">
      </mt-search>
      <div class="hotkey-wrapper">
        <ul class="hotkey-list" >
          <a v-for="k in datas.data.classify" @click='changeTabIndex(k.classify_id)' :to="{path:'/category/'+k.classify_id}" :class='{speical:k.classify_id==tabIndex}' >
          {{k.classify_name}}
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "mint-ui";
export default {
  name: "page-search",
  props: ["datas", "getList"],
  data() {
    return {
      value: "",
      // 默认数据
      defaultResult: []
    };
  },
  computed: {
    tabIndex() {
      return this.$store.state.category.tabIndex;
    },
    //onchange
    filterResult() {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, "i").test(value)
      );
    }
  },
  methods: {
    //点击确定按钮时，弹出打印search的值
    submit() {
      this.getList(this.tabIndex,this.value)
    },
    changeTabIndex(i) {
      this.$store.commit("CHANGE_TABINDEX", i);
      console.log(i)
      this.getList(i,this.value);
    }
  }
};
</script>

<style lang="less" scoped>
.hotkey-wrapper {
  padding: 2vw;
}

.hotkey-wrapper p:first-child {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
}

.hotkey-wrapper .hotkey-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.hotkey-wrapper .hotkey-list > a {
  font-size: 14px;
  margin-right: 5px;
  margin-bottom: 10px;
  text-align: center;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 16px;
  border: 1px solid #d7d7d7;
}

.hotkey-wrapper .hotkey-list > a.speical {
  border-color: #24b6ff;
  color: #24b6ff;
}
.mint-search {
  height: auto;
}
</style>
