import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index/Index'], resolve) // 首页
const Supplier = resolve => require(['@/views/supplier/index'], resolve) // 商家列表
const SupplierDetail = resolve => require(['@/views/supplier/storesDetail'], resolve)// 商家详情
const Search = resolve => require(['@/views/search/search.vue'], resolve) // 搜索
const SearchMain = resolve => require(['@/views/search/main.vue'], resolve) // 搜索内容

const Pay = resolve => require(['@/views/pay/pay'], resolve)      //支付
const Cart = resolve => require(['@/views/cart/cart'], resolve)   //购物车

const MyOrder = resolve => require(['@/views/order/myOrder'], resolve) // 我的订单
const OrderDetail = resolve => require(['@/views/order/orderDetail'], resolve) // 订单详情

const ConfirmOrder = resolve => require(['@/views/confirmOrder/confirmOrder'], resolve)   //确认下单
const Address = resolve => require(['@/views/confirmOrder/children/address'], resolve) //收货地址
const Add_Address = resolve => require(['@/views/confirmOrder/children/children/add_Address'], resolve) //添加收货地址

const Detail = resolve => require(['@/views/detail/Detail'], resolve) // 商品详情
//login
const Login = resolve => require(['@/views/login/login'], resolve) // 登录
const Register = resolve => require(['@/views/login/register'], resolve) // 注册
const PassWord = resolve => require(['@/views/login/passWord'], resolve) // 忘记密码
//home
const User = resolve => require(['@/views/home/User'], resolve) // 我的
const Collect = resolve => require(['@/views/home/collect'], resolve) //收藏商品
const UserSupplier = resolve => require(['@/views/home/supplier'], resolve) //关注店铺
const Setting = resolve => require(['@/views/home/setting'], resolve) //  设置
const AddressManage = resolve => require(['@/views/home/address/index'], resolve) //  地址管理
const Personal = resolve => require(['@/views/home/personal'], resolve) //  个人资料
const SetNickName = resolve => require(['@/views/home/setNickName'], resolve) // 昵称
const RealName = resolve => require(['@/views/home/realName'], resolve) //实名 
const LoginPsd = resolve => require(['@/views/home/loginPsd'], resolve) // 登录密码
const Shenfenzheng = resolve => require(['@/views/home/shenfenzheng'], resolve) // 身份证
const PayPsd = resolve => require(['@/views/home/payPsd'], resolve) // 支付密码
const HuLianTong = resolve => require(['@/views/home/huLianTong'], resolve) //wallt
const AcountSecurity = resolve => require(['@/views/home/acountSecurity'], resolve) // 账户安全



export default new Router({
  //mode: 'history',//默认 hash 模式 如果不想要很丑的 hash，我们可以用路由的 history 模式
  routes: [
    {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '首页',
    component: Index,
  },{//
      path: '/supplier',
      name: '店铺',
      component: Supplier,
    },{
      path: '/supplierDetail/:id',
      name: '店铺详情',
      component: SupplierDetail
    },{
      path: '/user',
      name: '用户页',
      component: User,
    }, {
      path: '/',
      name: '兑换',
      component: Index
    }, {
      path: '/',
      name: '预售',
      component: Index
    }, {
      path: '/',
      name: '拍卖',
      component: Index
    }, {
      path: '/',
      name: '新店',
      component: Index
    },
    {
      path: '/cart',
      name: '购物车',
      component: Cart
    },
    {
      path: '/confirmOrder',
      name: '确认订单',
      component: ConfirmOrder,
      children: [{
        path: 'address',
        name: '订单收货地址',
        component: Address
      }]
    },
    {
      path: '/pay',
      name: '支付',
      component: Pay
    },{
      path: '/collect',
      name: '收藏页',
      component: Collect,
    },{
      path: '/userSupplier',
      name: '关注页',
      component: UserSupplier,
    }, {
      path: '/detail/:id',
      name: '详情页',
      component: Detail
    }, {
      path: '/search/:type',
      name: '搜索页',
      component: Search,
      children: [{
        name: '分类',
        path: '/search/:type',
        component:SearchMain
      }]
    },{
      path: '/login',
      name: '登录页',
      component: Login
    },{
      path: '/register',
      name: '注册',
      component: Register
    }, {
      path: '/passWord',
      name: '忘记秘密',
      component: PassWord
    }, {
      path: '/setting',
      name: '设置',
      component: Setting,
      meta: {
        requireAuth: true,
    }
    },{
      path: '/addressManage',
      name: '地址管理',
      component: AddressManage,
      meta: {
        requireAuth: true,
    }
    },{
      path: '/add_address',
      name: '添加地址',
      component: Add_Address,
      meta: {
        requireAuth: true,
    }
    },{
      path: '/add_address/:id',
      name: '编辑地址',
      component: Add_Address,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/personal',
      name: '个人资料',
      component: Personal,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/setNickName',
      name: '修改昵称',
      component: SetNickName,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/realName',
      name: '实名认证',
      component: RealName,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/shenfenzheng',
      name: '上传身份证照片',
      component: Shenfenzheng,
    }, {
      path: '/acountSecurity',
      name: '账户安全',
      component: AcountSecurity,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/loginPsd',
      name: '登录密码',
      component: LoginPsd,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/payPsd',
      name: '支付密码',
      component: PayPsd,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/huLianTong',
      name: '互联通',
      component: HuLianTong,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/myOrder',
      name: '待付款',
      component: MyOrder,
      meta: {
        requireAuth: true,
    }
    }, {
      path: '/myOrder',
      name: '待收货',
      component: MyOrder,
    }, {
      path: '/myOrder',
      name: '已完成',
      component: MyOrder,
    }, {
      path: '/myOrder',
      name: '全部订单',
      component: MyOrder,
    }, {
      path: '/orderDetail',
      name: '订单详情',
      component: OrderDetail,
      meta: {
        requireAuth: true,
    }
    }

  ]
})
