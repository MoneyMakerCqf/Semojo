import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import Home from "../components/Home";
import register from "../components/register";
import product from "../components/product";
import search from "../components/search";
import Profile from "../components/Profile.vue";

Vue.use(Router)

export default new Router({
  routes: [
    //初始界面:登录
    {
      path: '/',
      name: 'login',
      component: login,
    },
    //主页
    {
      path: '/homepage',
      name: 'home',
      component: Home,
    },
    //注册
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    //所有项目界面
    {
      path: '/product',
      name: 'product',
      component: product,
    },
    //搜索界面
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    //用户界面
    {
      path: '/:name/userpage',
      name: 'Profile',
      component: Profile,
    },
  ]
})
