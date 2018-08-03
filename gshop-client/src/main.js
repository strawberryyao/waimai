// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {Button} from 'mint-ui'
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import './mock/MockServer'

// 注册全局组件标签
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
