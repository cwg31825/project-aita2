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

  import Header from '@/common/_header.vue'
  import AddressList from '@/components/user/addressList.vue'
  import { Toast,Lazyload,Checklist,MessageBox      } from 'mint-ui';
  import Util from '@/util/common';
  export default {
    components:{
      'v-header':Header,
      'v-addressList':AddressList
    },
    data(){
      return {
        title:'地址管理',
        btnText:'添加新地址',
        list:[],
        options:[],
        value:[],
      }
    },
    created(){
      
      if(!!this.$store.state.login.data){
        this.getList();
      }

      var info = this.$store.state.address.data
      console.log(info)
    },
    methods:{
      getList(){
        var data={
          key:this.$store.state.login.data.key
        }
        this.$api({
          method: 'post',
          url: '/goods/addresslist',
          data:Util.toQueryString(data)
        }).then((res) => {
          var obj=res.data;
          if(obj.code=='1'){
           // Toast(obj.msg)
            var newdata=obj.data
            //根据（is_default）排序
            function sortprice(a,b){
              return b.is_default-a.is_default
            }
            //利用js中的sort方法
            this.list = newdata.sort(sortprice);
            //打印排序后的数据到控制台
            //console.log(this.list);

            if(this.list.length == '0'){
              this.btnText='添加地址';
            }else{
              this.btnText='添加新地址';
              
            }
          }if(obj.code=='-220'){
            Toast(obj.msg)
            this.$store.commit('CHANGE_TOKEN',0);
            this.$router.replace({path: 'login'})
          }
        }).catch(function(error) {
          alert(error)
        })
      },
      add(){
        this.$router.push({
          name:"添加地址"
        })
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '//at.alicdn.com/t/font_687988_72mjq1o2tsi.css';
  @import '../assets/fz.less';
  .address {
    height:100%;
    background-color: @color-back-gr;
    color:@col-text-gr;
    padding-top: 12vw;
    .no{
      text-align: center;
      img{
        width:100%;
      }
      p{
        font-size:22px;

        padding-top:10vw;
      }
    }
   




  }
</style>
