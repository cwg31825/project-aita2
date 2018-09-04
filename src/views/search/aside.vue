<template lang="html">
<div class="jmc-search" v-if="datas">
    <!-- 当点击确定按钮时，触发submit事件 -->
    <div class="page-search" v-on:keyup.13="submit">
      <mt-search autofocus v-model="value" placeholder="请输入关键字" :result="filterResult" @keyup.enter="submit()">
      </mt-search>
      <div class="hotkey-wrapper" v-if="type=='1'">
        <ul class="hotkey-list" >
          <a v-for="k in datas.classify" @click='changeTabIndex(k.classify_id)' :class='{speical:k.classify_id==tabIndex}' >
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
  props: ["datas", "getList","type"],
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
      this.$emit('childByValue', this.value)
     setTimeout(this.getList(this.tabIndex,this.value),800)
      
      this.$router.push({ name: "分类", params: { tab:0} });
    },
    changeTabIndex(i) {
      this.$store.commit("CHANGE_TABINDEX", i);
     this.$emit('childByValue', this.value)
     setTimeout(this.getList(this.tabIndex,this.value),800)
     this.$router.push({ name: "分类", params: { tab:i} });
    }
  }
};
</script>

<style lang="less" scoped>
.jmc-search{
  margin-top: 12vw;
}
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
