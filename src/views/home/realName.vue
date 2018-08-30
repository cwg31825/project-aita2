<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
        <div class="s-one">
           <mt-cell
            title="证件类型"
            is-link
            :value="idType"
            @click.native='showSex'
          >
          </mt-cell>
          <mt-field
            label="姓名"
            :disabled='is_real'
            placeholder="请输入真是姓名"
            type = "text"
            v-model = "real_name"
          ></mt-field>
          <mt-field
            label="身份证号"
            :disabled='is_real'
            placeholder="请输入正确的身份证号"
            type = "text"
            v-model = "card"
          ></mt-field>

        </div>

      </div>
    </section>
    <mt-button
      plain
      size="large"
      :disabled="is_real"
      @click="ok"
      class="loginBtn"
    >实名认证</mt-button>
<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="slots"  ref="picker" value-key="name" @change="onValuesChange" :visible-item-count="5" v-model="popupValue"></mt-picker>
    </mt-popup>
  </div>

</template>

<script>
import { getInfo, removeInfo } from "@/utils/auth";
import { userInfo, realName } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      title: "实名认证",
      is_real: false,
      is_card: "1",
      idTypeID: "",
      card: "",
      real_name: "",
      idType: "",
      name: "",
      slots: [
        {
          flex: 1,
          values: [{ id: "1", name: "身份证" }, { id: "2", name: "护照" }],
          className: "slot1",
          textAlign: "center"
        }
      ],
      popupVisible: false,
      popupValue: ""
    };
  },
  created() {
    this.userData = this.$store.state.login.userData;
    if (this.userData.is_card) {
          this.card = this.userData.card;
          this.real_name = this.userData.real_name;
          this.is_real = true;
          if (this.userData.is_card == 1) {
            this.idType = "身份证";
          } else {
            this.idType = "护照";
          }
        }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.getSlotValue(1, values[0]);
      }
      this.idType = values[0].name;
      this.idTypeID = values[0].id;
      //console.log(this.idTypeID)
    },
    showSex() {
      if (!this.userData.is_card) {
        this.popupVisible = true;
      }
    },
    //
    ok() {
      this.key = getInfo();
      var data = {
        key: this.key,
        is_card: this.idTypeID,
        card: this.card,
        real_name: this.real_name
      };

      realName(data).then(res => {
        if (res.data.code == "1") {

          userInfo({key:getInfo()}).then(res => {
            if (res.data.code == "1") {
              this.$store.commit("SET_USERDATA", res.data.data);
            }
          });
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fonts/iconfont.css";
@import "../../assets/fz.less";
.login {
  height: 100%;
  background-color: @color-back-gr;
  padding-top: 12vw;
  > section {
    .content {
      height: 100%;
    }
    .mint-cell-value {
      margin-right: 36px !important;
    }
    .mint-cell {
      padding: 0 20px;
      background-color: #fff;
      position: relative;
      margin-bottom: 10px;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
