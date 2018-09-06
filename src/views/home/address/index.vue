<template lang="html">
  <div class="address">
<v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
            <v-addressList :list="list" :getList="getList"></v-addressList>
          <div class="no" v-if="list.length<=0">
            <img v-lazy="'../../static/user/nodaaaress@2x.png'"/>
            <p>暂无收货地址</p>
          </div>

      </div>
    </section>
    <mt-button
      plain
      size="large"
      @click="add"
      class="loginBtn"
    >{{btnText}}</mt-button>
  </div>
</template>

<script>
import { getInfo } from "@/utils/auth";
import { getAllAddress } from "@/api/user";
import AddressList from "./addressList.vue";
export default {
  components: {
    "v-addressList": AddressList
  },
  data() {
    return {
      title: this.$route.name,
      btnText: "",
      list: [],
      options: [],
      value: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let key = getInfo();
      getAllAddress({ key: key }).then(res => {
        //获取用户地址
        let data = res.data;
        if (data.code == "1") {
          var newdata = data.data;
          //根据（is_default）排序
          function sortprice(a, b) {
            return b.is_default - a.is_default;
          }
          //利用js中的sort方法
          this.list = newdata.sort(sortprice);
          if (this.list.length == "0") {
            this.btnText = "添加地址";
          } else {
            this.btnText = "添加新地址";
          }
        }
      });
    },
    add() {
      this.$router.push({
        name: "添加地址"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_687988_72mjq1o2tsi.css";
.address {
  height: 100%;
  padding-top: 14vw;
  .no {
    text-align: center;
    img {
      width: 100%;
    }
    p {
      font-size: 22px;

      padding-top: 10vw;
    }
  }
}
</style>
