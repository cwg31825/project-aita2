const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
// const STORAGE_CARTLIST_KEY = 'STORAGE_CARTLIST_KEY'
// const STORAGE_QUERYMYLIST_KEY = 'STORAGE_QUERYMYLIST_KEY'
import { JSEncrypt } from "jsencrypt";
export default {
  // 获取
  getLocal (key = STORAGE_USER_KEY) {
    // console.log('get local operation')
    return JSON.parse(window.localStorage.getItem(key))
  },
  // 设置用
  setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    //第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    if (isSaveOldData) {
      if(this.getLocal(key)) {
        let oldData = this.getLocal(key);
        return window.localStorage.setItem(key, JSON.stringify(oldData.concat(res)))
      }
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
  },
  rotateImg (img, direction,canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    let step = 2;
    if (step == null) {
      step = min_step;
    }
    if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
    } else {
      step--;
      step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    let degree = step * 90 * Math.PI / 180;
    let ctx = canvas.getContext('2d');
    switch (step) {
      case 0:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
        break;
      case 1:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -height);
        break;
      case 2:
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, -height);
        break;
      case 3:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, 0);
        break;
    }
  },
  compress(img,Orientation) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
    //瓦片canvas
    let tCanvas = document.createElement("canvas");
    let tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
      console.log("大于400万像素")
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
      console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
      //            计算每块瓦片的宽和高
      let nw = ~~(width / count);
      let nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    //修复ios上传图片的时候 被旋转的问题
    if(Orientation != "" && Orientation != 1){
      switch(Orientation){
        case 6://需要顺时针（向左）90度旋转
          rotateImg(img,'left',canvas);
          break;
        case 8://需要逆时针（向右）90度旋转
         rotateImg(img,'right',canvas);
          break;
        case 3://需要180度旋转
          rotateImg(img,'right',canvas);//转两次
          rotateImg(img,'right',canvas);
          break;
      }
    }
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
  },
  //base64转换为二进制
  dataUrlToBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    let image= new Blob([u8arr], {type:mime});

    return image;
  },
  //转换位键值对
  toQueryString(obj) {
    let result = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        result = result.concat(queryValues);
      } else {
        result.push(this.toQueryPair(key, values));
      }
    }
    return result.join('&');
  },
  toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
},
 //RSA加密
 encrypt(params) {
  let publicKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEA4SpV55MWyurkPEPaTOUYjobEi1L2Gx2VxfCJeK6wUZO/uyOZ
  goRz7wdt8KJHqe9wliA+QjTWJYNJ2wy5ZZ55X/6QY6xgVdSQrnkGlAM5pjqlk8Bp
  ObhpV/IlSUauuBGRHuZuer/tfDfOhtaNi5ez/MAMrFKIQYFmgq0CqzYLgsEG7UJ+
  iwMOUBy9A692i0eveijS/TZbClYfWrBCTe1jId0UV00Hu8xxk2Kq1UJRtCyars7z
  8zeLc+OYG/GiMXk/VW7pAD0pOVUm4NA25BQmHuC72UAjG8kEybZxey7gWyDLQIu2
  1OBz2qL7Nvh2GSpjdTJ3Q36Ga50YCrHJ7pIPfQIDAQABAoIBABpedd7/18x9w6rX
  G2qj7cNLPxs95Pp59X9P0xmiA54aGnsVCTZCwrz8dsCWkKPzGZFLR19Dhsyv2mdf
  zxp6e6ZlTo2Ns1553VPBcqbE1eyEs71g7DHJSfT1s64oK+/8hq1CuS+A6JQCiRo7
  aCov4vE3oIRRygk52UJ2dniMhL6UGh91mnnYT2hE2pPMdurSQ06hdS569B2WC+Ox
  Jb34vz+oALhimgpot/MTIu9gvuwBvBoxU5IQ2W9/XCDoXAL5CWxpru4KB1vrqTac
  pUE+PGQ28oc7jzikSdh0YgMzvGsbQDlwdDHU6NlD+21UarkHw5qIgF4G0C3m3271
  M1DzpQECgYEA/05XMVZYmjhMxF7Epr1KNOcgj1vR6UmVtPGgLFLKQd7aOCTGVYes
  xhJQURYf4UfjUbwJ+UZaZkLndwJEJbXyV6vLtWHyIKPR25H/VdEbV+s5Z3KhR5+P
  8dstYTm81p0wRezI4cxcZksVL4BzQYCuldIrzKWkr73nxyZS9z5CpD0CgYEA4ccF
  Yyv3oO+tdDPxObKIboDck0jL/e0bwmBbHshjTDWpJ+Z/z45B0ESyOJMVSYoM6J8R
  PJrnoqlWM02g6gJpxdNccbOKqWPyVCNK1Gckx5UbFI2knNZ29vSZMRdCfIWdJ89a
  LR1K5KDWYve8EqASg3qHjb8zMJz+4tN4uxF5jEECgYEA55bv3zBdVSAG+wagSkRh
  IRYb4g8/negDJk0cp7g+Anyd5NnvE7zsDAym0LdKGfg1C3qQbY/VBvhfsQPcP30J
  pV+QfSupENSp1Axe20DBFgKpYt6H0Em8sH7KbmyKkP+rv3JoUvMnSh+Hyzww0NVj
  CULKOmxztHuG2Y85KVBP8V0CgYAgO1Vdjw1PAGh2ymOJpR8tB2B19lKI8ayg1ziq
  8FicrJx1gcaFTv2+SdBXm0fSs86b9vly+XpQEnSn5lEulyGaiE4OPV9yRz51HIS2
  RfNOOs8e5Am4CjX5k3m7NGLdfAWvhT6Oajwi34M7pbpHvmpmMrvfVIhuTDtnDmGR
  8zCzAQKBgEGYizj5ZooMSWJsQBmbxbgYM7OFL0ySrcdGw641bAnUT5lvHRlcX6Zm
  Mvva11hg+XGeh3Dzn8ZGKyfT1UV6O3bVcedbyRiUA+vMqo0Sj0VEmJUAdQvZXyHv
  htyHUzI+kDwyjUnPjGzMC1Bk9NpgueyBTNLD9VOJZIw7QPQhAy9m
  -----END RSA PRIVATE KEY-----
  `;
  let jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  return jsEncrypt.encrypt(params);
}
}


