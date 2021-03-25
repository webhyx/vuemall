import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
/* vue实例作为一个事件总线 */
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)
//懒加载
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

