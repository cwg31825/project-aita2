
<template lang="html">

  <div  v-if="dianpuData">
        <div class="lfBox">
          <img v-lazy="dianpuData.goods_thumb?dianpuData.goods_thumb:'./static/user/dianpu@2x.png'" alt="">
        </div>
        <div class="rtBox">
          <p class="dianName">{{dianpuData.goods_name}}</p>
          <p class="guige">规格：<span class="gray">{{dianpuData.goods_attr?dianpuData.goods_attr:'无'}}</span></p>
          <p class="price">价格：<span class="red">&yen; {{dianpuData.goods_price}}</span> <span class="rt"><span class="ceng">*</span>{{dianpuData.goods_number}}</span></p>
        </div>
  </div>
</template>

<script>

  export default {
    props:['dianpuData'],

  }


</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/css/style.css';
  .dianpu{
    display: flow-root;
    .red{
      color:@color-text;
    }
    .dianpu_item{
      border-bottom:1px solid @border-color;
      padding:15px 20px;
      color:#666;
      .lfBox{
        width:100px;
        float: left;
        img{
          width:100px;
          height:80px;
        }
      }
      .rtBox{
        margin-left:110px;
        font-size:12px;
        line-height:20px;
        .dianName{
          font-size:14px;
          margin-right:20px;
          .text2(2);
        }

        p{
          .gray{
            color:#3F3F3F;
          }
          .rt{
            float: right;
            position: relative;
            .ceng{
              font-size:21px;
              position: absolute;
              top:4px;
              left:-8px;
            }
          }
        }
      }
    }
  }

</style>
