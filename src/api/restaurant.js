import {_get, _post} from './index'

//获取一定数量的商家
export const getSuppliers = (data) => {
  let req = {
    data: data,
    url: 'supplier/supplieslist'
  };
  return _get(req);
}


//获取某个商家 轮播图接口
export const getSlideshow = (data) => {
  let req = {
    data: data,
    url: 'supplier/get_flash_xml'
  };
  return _get(req);
}
//获取某个商家 首页介绍
export const getSupplierDesc = (data) => {
  let req = {
    data: data,
    url: 'supplier/get_supplier_index_desc'
  };
  return _get(req);
}

//获取某个商家 推荐分类
export const getSupplierCat = (data) => {
  let req = {
    data: data,
    url: 'supplier/get_supplier_index_cat'
  };
  return _get(req);
}

//获取某个商家的商品
export const getSupplierGoods = (data) => {
  let req = {
    data: data,
    url: 'supplier/supplier_goodslist'
  };
  return _get(req);
}

//输入关键词搜索餐馆
export const searchRestaurant = (data) => {
  let req = {
    data,
    url: 'v1/search/restaurant'
  }
  return _get(req);
}

//关注商家
export const collect = (data) => {
  let req = {
    data,
    url: 'supplier/supplier_collect'
  };
  return _post(req);
}
//取消关注商家
export const deleteCollect = (data) => {
  let req = {
    data,
    url: 'supplier/supplier_delete_collect'
  };
  return _post(req);
}

