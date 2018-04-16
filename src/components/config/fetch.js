
import { baseUrl } from './env'
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url+'.do';
  // console.log(url);
  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method == 'fetch'){
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        // 'content-type': 'application/x-www-form-urlencoded'
        // 'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      mode: "cors",
      cache: "default"
    }

    if (type == 'POST'){
      let str = '';
      Object.keys(data).forEach(key => {
        str += key + '=' + data[key] + '&';
      });
      Object.defineProperty(requestConfig, 'body', {
        value:str
      });
    }
    // console.log("传递的参数");
    // console.log(requestConfig);
    try {
      var response = await fetch(url,requestConfig);
      var responseJson = await response.json();
      if(responseJson.code == '999'){
        window.location.href = '/';
        document.title = "登录"
      }
    
    } catch (error) {
       throw new Error(error)
    }

    return responseJson
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        // requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
