const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
// const STORAGE_CARTLIST_KEY = 'STORAGE_CARTLIST_KEY'
// const STORAGE_QUERYMYLIST_KEY = 'STORAGE_QUERYMYLIST_KEY'
import { JSEncrypt } from "jsencrypt";
export default {
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
        }
    }
    return fmt;
},
padLeftZero(str) {
  return ('00' + str).substr(str.length);
},
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
  let publicKey = `MIIEowIBAAKCAQEArpYtq59Sd+XavUZJ11wvEOxGODlXtPcc8xEVsEbPHYrzu5km
  HYUVV38lD7sv1QlS5gEAK5OOs2wZX1x63EDEldEeP2JF2hbWeS9e3wrljN0+d0aj
  obXfvg3Cd6NXdeIKspFQtoQSz3W1NIRigfdREipXWZezE3MCynnY7HUsVJ76pTzb
  6KJrGhNFBgwjfzIg8mdcm6+ivesVSVnXB/z2tcYLbc8AlL99EuGIgQQjlXHHUFIa
  mzBdvCQhyfvbUwLhsJdxbsVNMfoaw3F2rmQ1BFWkbCedVZMh7lPoU5t5sqy2qfDa
  2nR7JLqwfCngH+WC4QSsBbtAtxxmjMIgtuP36QIDAQABAoIBAFFz33riqicmJheI
  Y4sGhy7uDRTOLA1R/T+qCORlJNwzp+MuYIoFPR/FQhVEz9wkrXiBnwK1pS4wkOXc
  z7VSwmTjW6lWwCAv54BCiZCmFNLTpgEgA9e+ctTItqH6oyNsgnEtOursU5pW4GPQ
  H+Vi7X/8ISS7keDRF8w/bOVlBXm0rLrR6gKVV6GVc7H48zdBgZKrUQriHhsg4lQD
  /ZrLRQggGoFKM4q2yJqUtFv0iFf8OSyG0+VtJ2zwHpsF7adGbFBrO9Im7Eyd6Aon
  eA0/gG6l8Z50ocIEP8ITqaFpZ0m8s4HiqVB/DgFSqgHYwjSbmX6l81jTh1kZhJpy
  StOcOcECgYEA4Jep4/J6eUbrLs3h0EmrE8nlJStBJxshAZDolbJC9Bd5Gfotr8Ri
  s/2IVqJR5ENhfuR3yUOwBAWrbnJHasvu1djy2GHecJL6xtVyJT6gqkYMoqJwz3i5
  rvIB/bBXepMKw3biGPKvNYsN246pQ3yV24l/6danxQVdakokBJXVJlMCgYEAxwBS
  wr3Dhaj7s4/N2SssSSNPagZOyvbKolkknaT1Fq8i/cOzF5JAfetw6jHyHGLFQT+C
  +LDYQWGcXx8infbEk8F55UvXM4hFwKOE2+m9Q+Stvl5b17hclRfA31evoOwoeF5o
  0dH/sQi5Mf45ccrZHSRZmzYeVSRGksysiJad6VMCgYBCLm7xrNJKSoujDygrqImx
  Gx1bBpP8YhIn0/u1oQH5y7Dz5rTvxn8PavZyEQLwsKpaKhjiRf/oL4OE2EgTQGTw
  vy1QdgaGRcmALgWk0/+kLWArzJJRkNGmq8nKZ9xfUlUppC6cC2d177P1ruRR7rR6
  LNp0nbxyYlJUr+RNNZnJ4QKBgDRsuGDHPygKEW0HeFI61mraG4Sx7rX3eAB2/Xdu
  SobUUqKJmLef9s91ZAS+baretlpvEeDULdRjk59Xg3Yb2UOXl7Y5WZMg1kdejJSm
  qg6lwsPA9e8JiZJZdJ0h64m4TR0Qugp0iSipRKiP8bAxoSrVNan3AtypNtJbiyRc
  kXMzAoGBAJRjEnJcm41Siz+qWKh1MrNYeTSJHreCDgwZQOLdJGpJkVN/nuDj+4TP
  4LH98+cyQRh/PFSwrLeu4dP8lyI+iOUSexcMnY9BvwYSrYrepaeZOZiTa45n4Lpb
  5AhdG04bAzC3ut7zKlK1MG5KWDXCzG0ewAeAJsobtTucX7fsehjG`;
  let jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  return jsEncrypt.encrypt(params);
}
}


