<!--增加收货地址-->
<template>
  <div id="address">
    <v-header :title="title" :fixed="true" :ok="save"></v-header>
    <address-info :formData.sync="formData"></address-info>
    <router-view></router-view>
    <v-loading v-show="loading"></v-loading>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {add_address,getAddrdetail} from '@/api/user'
  import {mapGetters} from 'vuex'
  import addressInfo from '@/components/addressInfo'
  import { getInfo } from "@/utils/auth";
  export default {
    components: {
      'address-info': addressInfo
    },
    data() {
      return {
        title:this.$route.name,
        formData: {
          key:getInfo(),
          address_id:this.$route.params.id?this.$route.params.id:'',
          username:'',
          address_p:'',
          telnumber:''
        },
        satisfySubmit: false,
        alertText: '',      //提示
        showTip: false,
        loading: false,
        preventRepeat: false   //阻止重复提交
      }
    },
    computed: {
      ...mapGetters(['deliveryAddress'])
    },
    created() {
      let id = this.$route.params.id
      if(id){
this.getAddrdetail(id)
      }
      
    },
    methods: {
      getAddrdetail(id){
        var data={
          key:getInfo(),
          address_id:parseFloat(id)
        }
        getAddrdetail(data).then(res=>{
          if(res.data.code=='1'){
            this.formData= {
              key:getInfo(),
              address_id:id,
              username:res.data.data.username,
              address_p:res.data.data.address,
              telnumber:res.data.data.telnum,
              province:res.data.data.province,
              city:res.data.data.city,
              district:res.data.data.district
            }
          }
        })
      },
      save() {
        if (this.preventRepeat) {
          return
        }

          this.preventRepeat = true;
          let {location} = this.deliveryAddress
          let form = {...this.formData, ...location};
          
          add_address(form).then((res) => {
            if (res.data.code == '1') {
              this.$router.go(-1);
            }
            this.preventRepeat = false;
          })

      }
    },
  }
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_687988_72mjq1o2tsi.css';
@import '../../../../assets/fz.less';
  #address {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: @color-back-gr;
    padding-top: 12vw;
    .btn-save {
      position: absolute;
      right: 15px;
      top: 2px;
      font-size: 0.5rem;
      font-weight: 600;
    }
  }
</style>
