import {_get, _post,_file} from './index'

//获取用户所有地址
export const getAllAddress = (data) => {
  let req = {
    data,
    url: 'goods/addresslist'
  };
  return _get(req);
}

//获取指定收货地址
export const getAddrdetail = (data) => {
  let req = {
    data,
    url: 'goods/addrdetail'
  }
  return _post(req)
}
//设置默认地址
export const setAddressDefault = (data) => {
  let req = {
    data,
    url: 'goods/addrdefault'
  }
  return _post(req)
}

//添加收获地址
export const add_address = (data) => {
  let req = {
    data,
    url: 'goods/address'
  }
  return _post(req);
}

//删除收货地址
export const deleteAddress = (data) => {
  let req = {
    data,
    url: 'goods/deladdress'
  }
  return _post(req)
}

//登录
export const login = (data) => {
  let req = {
    data,
    url: 'user/login'
  }
  return _post(req);
}

//手机注册
export const phoneRegister = (data) => {
  let req = {
    data,
    url: 'user/phone_register'
  }
  return _post(req);
}

//找回密码
export const forgotPwd = (data) => {
  let req = {
    data,
    url: 'user/forget_pass'
  }
  return _post(req);
}

//发送验证码
export const getverifycode = (data) => {
  let req = {
    data,
    url: 'user/getverifycode'
  }
  return _post(req);
}

//获取用户信息
export const userInfo = (data) => {
  let req = {
    data,
    url: 'user/userinfo'
  }
  return _get(req);
}

//savefile
export const savefile = (data) => {
  let req = {
    data
  }
  return _file(req)
}

//改变用户头像
export const changeAvatar = (data) => {
  let req = {
    data,
    url: 'user/profile_headimg'
  }
  return _post(req)
}

//注销
export const logout = (data) => {
  let req = {
    data,
    url: 'user/logout'
  }
  return _get(req);
}
//用户实名
export const realName = (data) => {
  let req = {
    data,
    url: 'user/real_message'
  }
  return _post(req);
}

//修改登录密码
export const updateLoginPwd = (data) => {
  let req = {
    data,
    url: 'user/update_login_pwd'
  }
  return _post(req);
}

//修改支付密码
export const updatePayPwd = (data) => {
  let req = {
    data,
    url: 'user/update_pay_pwd'
  }
  return _post(req);
}

// 绑定第三方账号
export const isWallet = (data) => {
  let req = {
    data,
    url: 'user/is_wallet_account'
  }
  return _post(req);
}

//修改昵称
export const editNickname = (data) => {
  let req = {
    data,
    url: 'user/profile_username'
  }
  return _post(req);
}

//修改出生日期
export const editBirthday = (data) => {
  let req = {
    data,
    url: 'user/profile_birthday'
  }
  return _post(req);
}

//修改性别
export const editSex = (data) => {
  let req = {
    data,
    url: 'user/profile_sex'
  }
  return _post(req);
}