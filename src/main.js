// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from "./store";
import interceptor from "./interceptor";

import Navigation from './components/Navigation.vue'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(router)
Vue.use(store)
Vue.prototype.$axios = interceptor

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
  mounted() {
    if(localStorage.getItem('Authorization')){
      this.is_login = true;
    }
  },
  components: { App },
  render: h => h(App),
  template: '<App/>',
})
