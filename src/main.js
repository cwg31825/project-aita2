import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'   //vuex
import less from 'less'
import Mint from 'mint-ui';//移动端UI

import 'vueg/css/transition-min.css'

import 'mint-ui/lib/style.css';
import '@/assets/css/style.css';

import Header from "@/common/_header";
import Footer from "@/common/_footer";
import Goods from "@/common/_goods";
import Stores from '@/common/_stores.vue';
import Baseline from "@/common/_baseline";
import Star from '@/common/star'
import AlertTip from '@/common/alertTip'
import Loading from '@/common/loading'
import FastClick from 'fastclick'

//全局注册组件
Vue.component('v-header', Header);
Vue.component('v-footer', Footer);
Vue.component('v-baseline', Baseline);
Vue.component('v-goods', Goods);
Vue.component('v-stores', Stores);
Vue.component('v-star', Star);
Vue.component('alert-tip', AlertTip);
Vue.component('v-loading', Loading);

Vue.use(Mint);
Vue.config.productionTip = false

// 用钩子函数beforeEach()对路由进行判断

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
    if (store.state.login.userData) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {    //如果没有权限,重定向到登录页,进行登录
      next({
        path: '/user',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else { //不需要权限 直接跳转
    next();
  }
})

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android)/i)
  return flag;
}

// if (_isMobile()) {
//   /* eslint-disable no-new */
// document.addEventListener("deviceready", function (){
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     template: '<App/>',
//     components: { App },
//   })
// }, false);
// } else {
  
// }
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})



