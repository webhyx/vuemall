<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  //局部组件
  components: {
    BScroll,
  },
   data() {
      return {
        scroll:null,
        /* probeType:3,
        pullUpLoad:true */
      }
    },
  mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 监听卷去的距离
      probeType: this.probeType,
      // 开启上拉加载更多
      pullUpLoad: this.pullUpLoad,
      // 新版配置 不用也可以
      mouseWheel: true,
      observeImage: true,
      observeDOM: true,
    });

      // 2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
        //  console.log(position);
        // 当监听到位置时，就会触发scroll绑定的事件contentScoll
        // 只传递一个参数时就是绑定的事件名，第二个参数就是作为事件的参数的值
        this.$emit('scroll', position)
      })
      }

      // 3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        console.log('dayin');
      })
      }
    },
    methods: {
      /* 封装监听触发后要执行的事件 */
      /* 默认值为300 */
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },    
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    },
  
}
</script>

<style scoped>
</style>