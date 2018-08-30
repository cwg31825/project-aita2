import {_get, _post, _put} from './index'

//获取首页 banner 广告/商品
export const getIndex = (data) => {
  let req = {
    data
  };
  req.url = 'first/index'
  return _get(req);
}

//获取一定数量的公告
export const getNotice = (data) => {
  let req = {
    data
  };
  req.url = 'first/get_notice_message'
  return _get(req);
}

//商品分类
export const getClassify = (data) => {
  let req = {
    data
  };
  req.url = 'first/classify'
  return _get(req);
}

//获取一定数量的商品
export const getGoodslist = (data) => {
  let req = {
    data
  };
  req.url = 'goods/goodslist'
  return _get(req);
}

//商品详情
export const getGoodsinfo = (data) => {
  let req = {
    data
  };
  req.url = 'goods/goodsinfo'
  return _get(req);
}

//收藏商品
export const setCollect = (data) => {
  let req = {
    data
  };
  req.url = 'goods/collect'
  return _post(req);
};

//取消收藏商品
export const setCollects = (data) => {
  let req = {
    data
  };
  req.url = 'goods/qcollect'
  return _post(req);
};

//新增收货地址
export const addAddress = (data) => {
  let req = {
    data
  };
  req.url = 'admin/address'
  return _post(req);
};

//获取收货地址
export const getAddress = (data) => {
  let req = {data};
  req.url = 'admin/address'
  return _get(req);
};

//获取购物车列表 goods/cartlist
export const getCartlist = (data) => {
  let req = {data};
  req.url = 'goods/cartlist'
  return _get(req);
};

//添加进购物车 addcart
export const addShoppingCart = (data) => {
  let req = {
    data
  };
  req.url = 'goods/addcart'
  return _post(req);
}

//从购物车减少商品数量
export const reduceShoppingCart = (data) => {
  let req = {
    data
  };
  req.url = 'goods/delcart'
  return _post(req);
}
