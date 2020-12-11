// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from "./store";
import axios from 'axios'

import Navigation from './components/Navigation.vue'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(router)
Vue.use(store)
Vue.use(axios)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data () {
    return {
      is_login: false,
      username: " ",
      img_src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      search: "",
    }
  },
  components: { App },
  render: h => h(App),
  template: '<App/>',
})

//异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    if(config.url==='/'||config.url==='/register'){  //如果是登录和注册操作，则不需要携带header里面的token
    }else{
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorizatior = localStorage.getItem('Authorization');
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
//异步请求后，判断token是否过期
// axios.interceptors.response.use(
//   response =>{
//     return response;
//   },
//   error => {
//     if(error.response){
//       switch (error.response.status) {
//         case 401:
//           localStorage.removeItem('Authorization');
//           this.GLOBAL.is_login = false;
//           this.$router.push('/login');
//       }
//     }
//   }
// )
//异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log("我是浏览器本地缓存的token: "+token);
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});
