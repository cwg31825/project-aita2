<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">

        <div class="s-one">
      
            <mt-cell
              title="工部头像"
              is-link
               @click.native='showPicture'
             >
              <div class="show" >
               
                <img :src="headerImage" alt="" class="picture">
            </div>
          </mt-cell>

          <mt-cell
            title="用户昵称"
            to="/setNickName"
            is-link
            :value="userData.user_name"
          >
          </mt-cell>
          <mt-cell
            title="出生日期"
            is-link
            @click.native="openPicker"
            :value="dates"

          >
          </mt-cell>
          <mt-cell
            title="性别"
            is-link
            :value="sex.name"
            @click.native='showSex'
          >
          </mt-cell>
        </div>

      </div>
    </section>
    <mt-datetime-picker
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      :startDate="startDate"
      :endDate="endDate"
      v-model="dateTime"
    >
    </mt-datetime-picker>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="slots" value-key="name" @change="onValuesChange" :visible-item-count="5" ></mt-picker>
    </mt-popup>
    <mt-popup v-model="TakePictureType" position="bottom" style="width: 100%;">
      <div>
        <div class='popup-item' @click='cameraTakePicture(1)'>相机</div>
        <div class='popup-item' @click='cameraTakePicture(2)'>图库</div>
      </div>
  </mt-popup>
  </div>

</template>

<script>
import { getInfo } from "@/utils/auth";
import {
  userInfo,
  changeAvatar,
  editBirthday,
  editSex,
  savefile
} from "@/api/user";
import Utils from "@/utils/common";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      title: "个人资料",
      headerImage: "",
      userData: "",
      picValue: "",
      dates: "",
      dateTime: "",
      startDate: new Date("1950-1-1"),
      endDate: new Date(),
      sex: { name: "", id: "" },
      slots: [
        {
          flex: 1,
          values: [
            { name: "请选择", id: "0" },
            { name: "男", id: "1" },
            { name: "女", id: "2" }
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
      popupVisible: false,
      TakePictureType: false,
      myImage: "",
      popupValue: "2"
    };
  },

  watch: {
    imgUrls: "toggleAddPic"
  },
  created() {
    this.userData = this.$store.state.login.userData;
    this.sex.name = this.userData.sex == "2" ? "女" : "男";
          this.dates = moment(new Date(this.userData.birthday)).format(
            "YYYY-MM-DD"
          );
          this.headerImage = this.userData.headimg
            ? this.userData.headimg
            : "./static/index/2@2x.png";
  },
  methods: {
    /*
    sourceType
        PHOTOLIBRARY 或 0 打开照片库。
        CAMERA 或 1 打开本机相机。
        SAVEDPHOTOALBUM 或 2 打开已保存的相册。
    destinationType
      DATA_URL 或 0 返回base64编码字符串。
      FILE_URI 或 1 返回图片文件URI。
      NATIVE_URI 或 2 返回图片本机URI。
    */
    cameraTakePicture(mySourceType) {
      const options = {
        quality: 50, // 0-100, 默认的100是最高质量的
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: mySourceType,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        allowEdit: true,
        targetWidth: 200,
        targeHeight: 200
      };
      let self = this;
      // 打开图片库
      navigator.camera.getPicture(onSuccess, onFail, options);
      function onSuccess(imageData) {
        //判断图片是否大于100K,是就直接上传，反之压缩图片
        self.postImg(imageData);
        this.TakePictureType = false;
      }
      function onFail(message) {}
    },
    postImg(userAvatar) {
      let data = {
        info: JSON.stringify({ filecontent: userAvatar })
      };

      savefile(data).then(res => {
        let fileinfo =
          "https://file.tongyongjifen.cn/readfileNew?info=" + res.data.fileinfo;
        this.headerImage = fileinfo;
        this.profile(fileinfo);
      });
    },
    profile(fileinfo) {
      var data = {
        key: getInfo(),
        headimg: fileinfo
      };

      changeAvatar(data).then(res => {
        if (res.data.code == "1") {
          this.userinfo();
        }
      });
    },
    userinfo() {
      var data = {
        key: getInfo()
      };
      userInfo(data).then(res => {
        if (res.data.code == "1") {
          this.$store.commit("SET_USERDATA", res.data.data);
        }
      });
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(date) {
      var t = moment(date).format("YYYY-MM-DD");

      var t2 = moment(date, "YYYY-MM-DD").valueOf();

      this.dates = t;
      var data = {
        key: getInfo(),
        birthday: t
      };
      editBirthday(data).then(res => {
        if (res.data.code == "1") {
          this.userinfo();
        }
      });
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.sex = { id: values[0].id, name: values[0].name };
    },
    showSex() {
      this.popupVisible = true;
    },
    showPicture() {
      this.TakePictureType = true;
    },
    editSex(id) {
      var data = {
        key: getInfo(),
        sex: id
      };
      editSex(data).then(res => {
        if (res.data.code == "1") {
          this.userinfo();
        }
      });
    }
  },
  watch: {
    // 监控a变量变化的时候，自动执行此函数
    sex: function(val, oldVal) {
      if (oldVal.id) {
        this.editSex(this.sex.id);
      }
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
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      position: relative;
      &:last-child {
        border-bottom: none;
      }

      &:first-child {
        padding: 10px 20px;
        border-bottom: 1px solid #dedede;
      }
    }
  }

  .show {
    width: 14vw;
    height: 14vw;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    input {
      display: none;
    }
  }
  .picture {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .popup-item {
    padding: 10px 20px;
  }
}
</style>
