import config from '../config'
import router from '@/router'
import { removeInfo } from '@/utils/auth'
import { MessageBox, Toast ,Indicator} from "mint-ui";
import axios from 'axios'
import qs from 'qs'
const api = axios.create();

api.defaults.baseURL = config.baseURL; //api请求的baseURL
api.defaults.timeout = 5000; // 超时时间, 单位毫秒
api.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

// 请求拦截
api.interceptors.request.use(request => {
  // 在发送请求之前做些什么
  // 如果有token,添加到请求报文 后台会根据该报文返回status
  //request.headers.Authorization = `token ${store.state.login.token}`;
  Indicator.open();
  return request;

}, error => {
  // 对请求错误做些什么
  alert('网络错误,请稍后再试');

  return Promise.reject(error);
});

// 添加响应拦截器
api.interceptors.response.use(response => {
  // 对响应数据做点什么
  Indicator.close();
  let data = response.data
  if (data.code === '-220' || data.code === '-210') {//登录超时或没有登录
    removeInfo();
    MessageBox.confirm(
      `请先登录`
    ).then(
      action => {
        router.push('/login');
      },
      function (err) { }
    );
  }
  if (data.code === '200') {//注销成功
    Toast(data.msg)
    router.push('/login');
  }
  if (data.code === '0' || data.code === '3' || data.code === '4' || data.code === '5' || data.code === '6' || data.code === '7' || data.code === '8') {
    //业务数据错误
    Toast(data.msg)
  }
  return response;
}, error => {// 这里是返回状态码不为200时候的错误处理
  // 对响应错误做点什么
  // 这里我们把错误信息扶正, 后面就不需要写 catch 了
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        alert(error.message);
        break

      case 401:
        error.message= '未授权，请登录'
        alert(error.message);
        break

      case 403:
        error.message= '拒绝访问'
        alert(error.message);
        break

      case 404:
        error.message= `请求地址出错: ${error.response.config.url}`
        alert(error.message);
        break

      case 408:
      error.message = '请求超时'
      alert(error.message);
        break

      case 500:
      error.message = '服务器内部错误'
      alert(error.message);
        break

      case 501:
        error.message= '服务未实现'
        alert(error.message);
        break

      case 502:
        error.message= '网关错误'
        break

      case 503:
        error.message= '服务不可用'
        alert(error.message);
        break

      case 504:
        error.message= '网关超时'
        alert(error.message);
        break

      case 505:
        error.message= 'HTTP版本不受支持'
        alert(error.message);
        break

      default:
    }
  }

  return Promise.reject(error);
});

// get
export const _get = (req) => {
  return api.get(req.url, { params: req.data })
}

// post
export const _post = (req) => {
  return api({ method: 'post', url: `/${req.url}`, data: qs.stringify(req.data) })
}
// file
export const _file = (req) => {
  return api({ method: 'post', url: 'https://file.tongyongjifen.cn/moniter/savefile', data: qs.stringify(req.data) })
}
//patch
export const _put = (req) => {
  return api({ method: 'put', url: `/${req.url}`, data: req.data })
}
