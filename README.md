# 技术栈

vue2.0 + cordova + mint-ui + vue-router + vuex + axios + mock.js(模拟数据) + ES6 + less

## 简介

vuex + webStorage 实现了购物车功能,axios拦截统一处理 ajax 请求错误

通过使用cordova，我们可以使混合移动应用程序，可以使用摄像头，地理位置，文件系统和其他本地移动功能。

使用cordova之前，我们需要安装以下组件：

1-Node.js

2-java SDK

3-Android SDK

camera插件

cordova plugin add cordova-plugin-camera

通过照相机API、我们可以拍摄或者访问照片库中的照片，返回图片的base64编码字符串或者图片的url文件路径。

    cordova plugin add cordova-plugin-alipay-v2 --variable APP_ID=[your AppId]

    支付宝《APP支付》功能说明

    根据支付宝的说明文档的建议，为保证安全，签名都放到后端去做，前端只需要接收后台传入签名字符串，使用该插件调用支付宝SDK完成支付

    APP_ID：对应开放平台中应用的APPID，主要用于iOS平台xcode构建URL Schemes

第一步：订单在服务端签名生成订单信息，具体请参考官网进行签名处理 https://docs.open.alipay.com/204/105465/

    var payInfo = "app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D"

第二步：调用支付插件

    cordova.plugins.alipay.payment(payInfo,function success(e){},function error(e){});
    
* e.resultStatus  状态代码  e.result  本次操作返回的结果数据 e.memo 提示信息

* e.resultStatus  9000  订单支付成功 ;8000 正在处理中  调用function success

* e.resultStatus  4000  订单支付失败 ;6001  用户中途取消 ;6002 网络连接出错  调用function error

* 当e.resultStatus为9000时，请去服务端验证支付结果

* 同步返回的结果必须放置到服务端进行验证（验证的规则请看https://doc.open.alipay.com/doc2/
* detail.htm?spm=0.0.0.0.xdvAU6&treeId=59&articleId=103665&
* docType=1) 建议商户依赖异步通知

* 如要使用沙箱环境，请自行参考官方文档https://docs.open.alipay.com/200/105311/
* android支持沙箱环境的方法：

* * 在项目中找到android平台对于的插件源码文件，位于应用根目录下：

* platforms/android/src/cn/hhjjj/alipay/alipay.java

* 在payment中的PayTask前面加一行代码：

* com.alipay.sdk.app.EnvUtils.setEnv(com.alipay.sdk.app.EnvUtils.EnvEnum.SANDBOX);

* 重新编译运行，就可以了！


## 经验

1. 事先一定要先想好整个页面组成，怎样去分组件开发，这样在开发阶段会事半功倍

2. 本质上vuex只是一个全局变量,所以刷新路由,state数据会清空,可配合webStorage实现响应式

3. 所有webStorage存储应该通过dispatch操作

4. 只做数据渲染,不做数据修改,不需要用vuex

5. 简单的父子通信不需要用vuex

## 待完成

1. 购物车内编辑(增减商品)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:1322
npm start

# build for production with minification
npm run android
