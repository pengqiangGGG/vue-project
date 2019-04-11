// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from "vant"
import "../node_modules/vant/lib/index.css"
require('./mock.js')
import{Lazyload} from "vant";
import {Waterfall} from "vant";
import store from '../src/store/index'

Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(Waterfall)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//添加全局过滤器
Vue.filter('getYMD', function(input) {
    return input.split(' ')[0];
})

