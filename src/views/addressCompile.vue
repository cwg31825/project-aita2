<template lang="html">
  <div class="login">
    <v-header :title="title" :fixed="true"></v-header>
    <section>
      <div class="content">
            <mt-field
              label="收货人"
              placeholder="请输入收货人"
              type = "text"
              v-model = "username"
            ></mt-field>
            <mt-field
              label="联系电话"
              placeholder="请输入联系电话"
              type="number"
              v-model = "phone"
              ></mt-field>
              <mt-cell
                title="所在地区"
                is-link
                :value="areaString"
                @click.native="choseAdd"
              ></mt-cell>
            <mt-field
              label="详细地址"
              placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"
              type="textarea"
              v-model = "xaddress"
            ></mt-field>

            <mt-checklist
              v-model="value"
              :options="options" class="check_bg" >
            </mt-checklist>
           <!--地址选择-->
            <section class="showChose" v-show="showChose">
              <section class="address">
                <section class="title center">
                  <h4>居住地址</h4>
                  <span @click="closeAdd()">×</span>
                </section>
                <section class="title">
                  <div class="area" @click="provinceSelected()">{{Province?Province:info[province].region_name}}</div>
                  <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
                  <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
                </section>
                <ul>
                  <li class="addList" v-for="v in info" @click="getProvinceId(v.region_id, v.region_name,v.children)" v-show="showProvince" :class="v.selected ? 'active' : ''">1{{v.region_name}}</li>
                 <li class="addList" v-for="v in showCityList" @click="getCityId(v.region_id, v.region_name)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.region_name}}</li>
                </ul>
              </section>
            </section>
      </div>

    </section>
    <mt-button
      plain
      size="large"
      @click="ok"
      class="loginBtn"
    >提交</mt-button>
    <!--居住地址三级联动选项-->

  </div>

</template>

<script>

  import Header from '@/common/_header.vue';
  import { Toast,Lazyload,Checklist  } from 'mint-ui';
  import Util from '@/util/common';

  export default {
    name: 'index',
    components:{
      'v-header':Header
    },
    data(){
      return {
        title:'编辑地址',
        username:'',
        phone:'',
        xaddress:'',
        pickerVisible:false,
        options : [
          {
            label: '设为默认地址',
            value: true,
          }],
        value:[false],
        areaString:'请选择',
        data:null,
        showChose: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: 2,
        city: 3,
        district: 57,
        GetProvinceId: 2,
        District: false,
        Province: false,
        City: false,
        // v-for循环判断是否为当前
        selected: false,
        info:{}
      }
    },
    created(){
      var id=this.$route.params.id,addr=this.$store.state.address.data.data;
      this.info=addr;
      if(id){
        var data={
          key:this.$store.state.login.data.key,
          address_id:parseFloat(id)
        }
        this.$api({
          method: 'post',
          url: '/goods/addrdetail',
          data:Util.toQueryString(data)
        }).then((res) => {
          var obj=res.data;
          if(obj.code=='1'){
            this.data=obj.data;
            this.info=addr;
            console.log(this.info)
            this.username=obj.data.username;
            this.phone=obj.data.telnum;
            this.areaString=obj.data.area;
            this.xaddress=obj.data.address;
            this.city=obj.data.city;
            this.district=obj.data.district;
            this.province=obj.data.province;
          }else{
            Toast(obj.msg)
          }
        }).catch(function(error) {
          alert(error)
        })
      }


    },

    methods:{
      // 登ok录按钮
       ok(){
        if(this.$store.state.login.data){
        var id=this.$route.params.id;
        var data={
          key:this.$store.state.login.data.key,
          address_id:id,
          province:this.province,
          city:this.city,
          district:this.district,
          username:this.username,
          address_p:this.xaddress,
          telnumber:this.phone
        }
        this.$api({
          method: 'post',
          url: '/goods/address',
          data:Util.toQueryString(data)
        }).then((res) => {
          var obj=res.data;
          if(obj.code=='1'){
            Toast(obj.msg)
            this.$router.push({
              name:"地址管理"
            })
          }else{
            Toast(obj.msg)
          }
        }).catch(function(error) {
          alert(error)
        })
      }else{
            this.$store.commit('CHANGE_TOKEN',0);
            this.$router.replace({path: 'login'})
          }
      },

      choseAdd: function() {
        this.showChose = true;
      },
      closeAdd: function() {
        this.showChose = false;
      },
      _filter(add,code) {
        console.log(add.length)
        let result = [];
        for(let i=2;i<add.length;i++) {
          if(code == add[i].region_id){
            result = add[i].children[52];
          }
        }//this.info[2].children[52].children;
        console.log(result)
        return result;
      },
      getProvinceId: function(code,input,children) {
        this.province = code;
        this.Province = input;
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
        this.showCityList = children[52].children;
       console.log(this.showCityList)
        // 点击选择当前
        this.info.map( a => a.selected = false );
        this.info[index].selected = true;
      },
      provinceSelected: function() {
        // 清除市级和区级列表
        this.showCityList = false;
        this.showDistrictList = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
      },
      getCityId: function(code, input, index) {
        this.city = code;
        this.City = input;
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
        this.showDistrictList = this._filter(this.showCityList,'district',this.city);
        // 选择当前添加active
        this.showCityList.map( a => a.selected = false );
        this.showCityList[index].selected = true;
      },
      citySelected: function() {
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
      },
      getDistrictId: function(code, input, index) {
        this.district = code;
        this.District = input;
        // 选择当前添加active
        this.showDistrictList.map( a => a.selected = false );
        this.showDistrictList[index].selected = true;
        // 选取市区选项之后关闭弹层
        this.showChose = false;
        this.areaString=(this.Province?this.Province:this.info[this.province-1].region_name)+this.City+this.District;
      },
      districtSelected: function() {
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/fonts/iconfont.css';
  @import '../assets/fz.less';
  .login {
    padding-top: 12vw;
    height:100%;
    background-color: @color-back-gr;
    .mint-cell{
      background: #fff;
      padding:0 20px;
      border-bottom:1px solid @border-color;
    }
    .myAddress{
      width: 100%;
      background-color: white;
      border-top: 4px solid rgba(245,245,245,1);
      color:#333;
      font-size:15px;
    }
    .myAddress .cont{
      border-bottom: 1px solid rgba(245,245,245,0.8);
    }
    .myAddress .cont span{
      display: inline-block;
      font-size: 0.28rem;
      color: #333;
      line-height: 0.88rem;
      margin-left: 0.32rem;
    }
    .myAddress .cont section{
      float:left;
    }
    .myAddress .cont p{
      display: inline-block;
      font-size: 0.28rem;
      color: #333333;
      line-height: 0.88rem;
      margin-left: 1rem;
    }
    .myAddress .cont .pic2{
      float: right;
      width: 0.14rem;
      height: 0.24rem;
      margin: 0.32rem 0.32rem 0.32rem 0;
    }
    .myAddress .cont p.text{
      margin-left: 0.72rem;
    }
    .showChose{
      width:100%;
      height:100%;
      position:fixed;
      top:0;
      left:0;
      z-index:120;
      background:rgba(77,82,113,0.8);
    }
    .address{
      position:absolute;
      bottom:0;
      left:0;
      z-index:121;
      background:#fff;
      width:100%;

    }
    .center{
      text-align: center;
      line-height:40px;
    }
    .title h4{
      display:inline-block;
      font-weight:normal;
      color:#999;
      font-size:20px;
    }
    .title span{
      font-size:24px;
      color:#D8D8D8;
      float: right;
      margin-right:20px;
    }
    .area{
      display:inline-block;
      font-size:14px;
      line-height:32px;
      margin-left:20px;
      color:#333;
    }
    .addList{
      width:100%;
      padding-left:0.32rem;
      font-size:16px;
      line-height:30px;
      color:#333;
    }
    /* 修改的格式 */
    .address ul{
      width:95%;
      height:100%;
      max-height: 60vw;
      overflow:auto;
    }
    .address ul li{
      margin-left:5%;
    }
    .address .title .active{
      color:#0071B8;
      border-bottom:0.02rem solid #0071B8;
    }
    .address ul .active{
      color:#0071B8;
    }


  }
</style>
