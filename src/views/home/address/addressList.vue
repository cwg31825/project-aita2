
<template lang="html">
  <ul class="list">
    <li class="item" :class="item.is_default=='1'?'on':'off'" v-for="(item, index) in list" v-if="pay?item.is_default==1:true">
      <p class="first">
        <span >收货人:{{item.username}}</span>
        <span class="rt">联系电话:{{item.telnumber}}</span>
      </p>
      <p>收货地址：{{ item.address}}</p>
      <div class="operation" v-if="pay?false:true">
        <span class="label" @click="getValue(item.address_id)"> 
          <i class="iconfont" :class="item.is_default=='1'?'icon-xuanzhong':'icon-yuanxingweixuanzhong'"> </i>
          {{item.is_default=='1'?'默认地址':'设为默认地址'}}</span>
        <div class="rt">
          <span class="mar-r" @click="goCompile(item.address_id)"><i class="icon iconfont icon-bianji-"></i>编辑</span>
          <span  @click="deleteOne(item.address_id)"><i class="icon iconfont icon-qingchu"></i>删除</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { getInfo } from "@/utils/auth";
import { setAddressDefault,deleteAddress } from "@/api/user";
import { MessageBox } from "mint-ui";
export default {
  props: ["list","getList","pay"],
  methods:{
    getValue(id){
        var data={
          key:getInfo(),
          address_id:parseFloat(id)
        }
        setAddressDefault(data).then(res=>{
          if(res.data.code=='1'){
            this.getList();
          }
        })
      },
      goCompile(id){
        this.$router.push({
          name:"编辑地址",
          params:{id:id}
        });
      },
      deleteOne(id){
        MessageBox({
          title: '提示',
          message: '确认删除此收货地址吗?',
          showCancelButton: true
        }).then(action => {
          if(action=='confirm'){
            let data ={
              key:getInfo(),
              address_id:parseFloat(id)
            }
            deleteAddress(data).then(res=>{
              if(res.data.code=='1'){
                this.getList();
              }
            })
          }
        });
      },
  }
};

</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";
@import "../../../assets/css/style.css";
.list {
  .item.on,.item.off{
    background-image: url('/static/address/address_bg.png');
    background-size: contain;
    background-position-y: bottom;
    background-repeat: repeat-x;
  }
  .item.off{
    background-image: -webkit-linear-gradient(top, #fafafa, #fafafa 0%, transparent 100%);
    background-image: linear-gradient(0deg, #fafafa, #fafafa 0%, transparent 100%);
  }
  .item {
    background: #fff;
    margin-bottom: 10px;
    padding: 6px 0 6px;
    font-size: 14px;
    box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
    .first {
      font-size: 16px;
    margin-bottom: 6px;
    }
    p {
      line-height: 22px;
      padding: 0 20px;
    }
    .operation {
      border-top: 1px dashed @border-color;
      padding: 6px 20px 0;
    margin-top: 6px;
      color: #666;
      span.label {
        position: relative;
        top: -4px;
        .icon-xuanzhong {
          color: @color-text;
        }
      }
      .rt {
        span {
          &.mar-r {
            margin-right: 12px;
          }
          i {
            font-size: 18px;
            margin-right: 2px;
          }
        }
      }
    }
  }
  .rt {
    float: right;
  }
}
</style>
