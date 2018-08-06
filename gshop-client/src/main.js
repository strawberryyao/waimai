// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {Button} from 'mint-ui'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import loading from './common/imgs/loading.gif'
import router from './router'
import App from './App.vue'
import store from './store'
import './mock/MockServer'
import Split from './components/Split/Split'



// 注册全局组件标签
Vue.component(Button.name, Button)
Vue.component('Split',Split)

//加载中的gif图
Vue.use(VueLazyload, {
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
