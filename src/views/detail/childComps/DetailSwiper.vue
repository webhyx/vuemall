<template>
    <swiper class="detail-swiper" >
    <swiper-item v-for="(item,index) in topImage" class="detailSwiperItem" :key="index">
      <img :src="item" alt="" @click="clickImage">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },

  props: {
    topImage:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    clickImage(){
      console.log('点击图片');
    }
  },
}
</script>

<style>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>