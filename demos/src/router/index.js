import Vue from 'vue'
import Router from 'vue-router'
import options from './route-opt.js'
const router = new Router({
  mode: 'hash',
  routes: options // （缩写）相当于 routes: routes
})
Vue.use(Router)

export default router
