import {debounce} from "./utils" 

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,200)

    this.itemImgListener=() => {
      this.newRefresh()
    }
    // 参数1 自定义事件名，参数2 需要传入事件总线的函数
    // 注意！要先去main.js创建一个空的vue实例作为中央事件总线的实例
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}