import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'
import Login from "../views/login/index";
import Order from "../views/order/index"
import Home from "../views/home/index"
Vue.use(VueRouter)

// 路由解释 path ：访问路径  name : 自己定义的名称 component : 组件 导入时的名称
const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
  {
    path: '/',
    // 命名路由 layout 有一个默认子路由，这个名字没有意义，所以警告
    // 正确的做法是：如果有默认子路由，就不要给父路由起名字了
    // name: 'layout',
    component: Layout,
    children: [
      {
        // 我们通常会把根路径 / 设置为网站的首页
        // 为啥呢？因为我们在手动输入网址访问网站的时候，可以省略 /
        // 如果你是别的名称，则必须加上
        path: '', // path 为空，会作为默认子路由渲染

        // 路由的名字是干啥的？
        // 参考：https://gitee.com/lipengzhou/toutiao-publish-admin/issues/I1F1BA
        name: 'home',
        component: Home
      },
      {
        path: '/order',
        name: 'order',
        component: Order
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由导航守卫（拦截器）的作用就是控制页面的访问状态
// beforeEach 是全局前置守卫，任何页面的访问都要经过这里
// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
