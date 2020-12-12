import axios from "axios";

var interceptor = axios.create();

interceptor.interceptors.request.use(
  config => {
    if(config.url==='/login'||config.url==='/register'){  //如果是登录和注册操作，则不需要携带header里面的token
    }else{
      if (localStorage.getItem('Authorization')) {
        config.headers.authorization = localStorage.getItem('Authorization');
      }
    }

    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  });


export default interceptor;
