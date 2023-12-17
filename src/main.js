import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import uploader from 'vue-simple-uploader'
import "element-ui/lib/theme-chalk/index.css"
import "./assets/style/base.styl"
import "@/router/before.js"
import all from '@/libs/globalFunction.js'
import * as echarts from 'echarts'

Vue.use(ElementUI)
Vue.use(uploader)
Vue.use(all)


Vue.prototype.$bus = new Vue();
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
