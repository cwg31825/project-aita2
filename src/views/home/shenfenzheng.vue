<template lang="html">
  <div class="login">
    <v-header> <h1 slot="title">上传身份证照片</h1></v-header>
    <section>
      <div class="content">
        <p class="biaoti">请上传<span>{{username}}</span>本人身份证照片</p>
        <div class="s-one">
          <label for="shenz">
            <div  class="show">
              <input type="file"  accept="image" @change="upload" id="shenz">
              <img :src="upHeaderImage?upHeaderImage:'../../static/user/shenfen_z.jpg'" alt="" class="picture">
            </div>
          </label>
          <label for="shenb">
            <div  class="show">
              <input type="file"  accept="image" @change="upload" id="shenb" >
              <img :src="upHeaderBImage?upHeaderBImage:'../../static/user/shenfen_b.jpg'" alt="" class="picture">
            </div>
          </label>
        </div>

      </div>
    </section>
    <mt-button
      plain
      size="large"
      @click="ok"
      class="loginBtn"
    >确认上传</mt-button>

  </div>

</template>

<script>

  import Header from '@/common/_header.vue'
  import { Toast,Lazyload,Actionsheet   } from 'mint-ui';
  import Exif from 'exif-js';
  import moment from 'moment';
  import Utils from '@/utils/common';
  export default {
    components:{
      'v-header':Header,
    },
    data(){
      return {
        headerImage:'',
        headerBImage:'',
        upHeaderImage:'',
        upHeaderBImage:'',
        picValue:'',
        username:'',
      }
    },
    watch: {
      imgUrls: 'toggleAddPic'
    },
    created(){
      this.username=this.$route.params.username;
    },
    methods: {
      upload (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue,e.target.id);
      },
      imgPreview (file,id) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              if(id==='shenz'){self.headerImage = this.result;}else{self.headerBImage = this.result;}
              self.postImg(id);
            }else {
              img.onload = function () {
                let data = Utils.compress(img,Orientation);
                if(id==='shenz'){self.headerImage = data;}else{self.headerBImage = data;}
                self.postImg(id);
              }
            }
          }
        }
      },
      postImg () {
        //这里写接口
      },

      ok(){},

    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fonts/iconfont.css';
  @import '../../assets/fz.less';
  .login {
    height:100%;
    background-color: @color-back-gr;

    >section {
      .content{
        height: 100%;
        .biaoti{
          text-align: center;
          font-size:16px;
          color:@col-text-gr;
          padding:6vw 0 4vw;
          span{
            color:@color-text;
          }
        }
      }

    }

    .show {
      width: 70%;
      height:45vw;
      overflow: hidden;
      position: relative;
      margin:0 auto 10px;
      border:2px solid #047abc;
      input{
        display: none;
      }

    }
    .picture {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }


  }
</style>
