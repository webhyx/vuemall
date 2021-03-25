<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    data() {
      return {
        isLoad:false
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          /* 只发一次 因为只需要监听到加载一个值就可以 */
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    },
  }
</script>

<style scoped>

</style>
