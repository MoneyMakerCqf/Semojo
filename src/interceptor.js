import axios from "axios";
import Vue from 'vue';

const vm = new Vue()
let loading // loading

var interceptor = axios.create();

interceptor.interceptors.request.use(
  config => {
    if(config.url==='/login'||config.url==='/register'){  //如果是登录和注册操作，则不需要携带header里面的token
    }else{
      if (localStorage.getItem('Authorization')) {
        config.headers.authorization = localStorage.getItem('Authorization');
      }
    }
    if(config.url.includes('/product/') && config.url.includes('/artifacts/')){
      startLoading();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

interceptor.interceptors.response.use((response) => {
  let {status} = response
  if (status == 200) {
    endLoading()
  }
  return response
}, (error) => {
  return Promise.reject(error)
});



function startLoading() {
  let options = {
    lock: true,
    fullScreen: true,
    text: 'loading......',
    background: 'rgba(0, 0, 0, .4)'
  }
  loading = vm.$loading(options)
}

function endLoading() {
  loading && loading.close()
}

export default interceptor;
