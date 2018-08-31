import {_get, _post} from './index'

//提交订单
export const submitOrder = (data) => {
  let req = {
    data,
    url: 'order/cartTocreate'
  };
  return _post(req);
}

//准备支付
export const initPay = (data) => {
  let req = {
    data,
    url: '//openapi.alipay.com/gateway.do'
  }
  return _post(req);
}

//请求支付
export const requestPay = (data) => {
  let req = {
    data,
    url: '//pay.ispay.cn/core/api/request/pay/'
  }
  return _post(req)
}

//监听扫码支付状态
export const listenStatus = (data) => {
  let req = {
    data,
    url: 'v1/listen_status'
  }
  return _get(req)
}

//获取订单信息
export const orderInfo = (data) => {
  let req = {
    data,
    url: 'order/lorder'
  }
  return _post(req);
}

//获取我的订单
export const orders = (data) => {
  let req = {
    data,
    url: 'user/order'
  }
  return _get(req);
}

//取消订单
export const cancelOrder = (data) => {
  let req = {
    data,
    url: 'order/qorder'
  }
  return _post(req)
}

//确认收货
export const received = (data) => {
  let req = {
    data,
    url: 'order/received'
  }
  return _post(req)
}

//申请退货
export const backgoods = (data) => {
  let req = {
    data,
    url: 'user/backgoods'
  }
  return _post(req)
}



