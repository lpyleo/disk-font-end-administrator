import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',  //  路由路径，即浏览器地址栏中显示的URL
    name: 'Home', //  路由名称
    component: () =>
      import("../views/Home/Index.vue"), //  路由所使用的页面
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/company',
    name: 'Company',
    component: () => 
      import("../views/CompanyInfo.vue")
  },
  {
    path: "/login", //  登录页面
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    props: true
  },
  {
    path: "/register", //  注册页面
    name: "Register",
    component: () =>
      import("../views/Register.vue"),
  },
  {
    path: "*", //  404页面
    name: "Error_404",
    component: () =>
      import("../views/Error_404.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
