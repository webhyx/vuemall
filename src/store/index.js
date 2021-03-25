import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

const state = {
    cartList:[]
}
// 2.创建store对象
const store = new Vuex.Store({
  state,
  // 修改任何state里的内容 都要通过mutation,
  mutations,
  actions,
  getters
})
// 3.挂载
 export default store
// export default new Vuex.Store({
//   store
// });
