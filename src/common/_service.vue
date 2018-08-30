
<template lang="html">

  <div class="service"  v-if='serviceData'>
    <ul class="type-list clearfix">
      <li v-for="k in serviceData" :style="{width:WIDTH}">
        <router-link :to="{ name: k.name,params:{id:k.id}}">
          <i class="type-img" v-show="k.bool">
            <img v-lazy="k.imgPath" alt="">
          </i>
          <img v-lazy="k.imgPath" alt=""  v-show="!k.bool" class="img">
          <span class="type-name">{{k.name}}</span>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>

  export default {
    props:['serviceData'],
    data(){
      return{
        WIDTH:100/this.serviceData.length+'%'
      }

    },
  }


</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/css/style.css';
  .service {
    display: flow-root;
    .type-list{
      li{
        float:left;
        padding:6px 0;
        text-align:center;
        font-size:0;
        .img{
          width:70%;
        }
        .type-img{
          display:inline-block;
          height:15vw;
          width:15vw;
          background-image: url("/static/index/type-li-bg@2x.png");
          background-size: cover;
          margin-bottom: 2vw;
          img{
            width:7vw;
            margin-top: 3vw;
          }
        }
        .type-name{
          font-size:15px;
          color:#555;
          display: block;
        }
      }
    }
  }

</style>
