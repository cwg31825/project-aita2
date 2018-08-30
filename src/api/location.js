import {_get} from './index'

//定位搜索建议
export const suggestion = (data) =>{
  let req = {
    data:data
  };
  req.url = '//39.108.3.12:3000/v1/suggestion'
  return _get(req);
}

//定位当前位置
export const location = (data) =>{
  let req = {
    data
  }
  req.url = '//39.108.3.12:3000/v1/location'
  return _get(req)
}
