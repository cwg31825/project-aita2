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



## 预览




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
