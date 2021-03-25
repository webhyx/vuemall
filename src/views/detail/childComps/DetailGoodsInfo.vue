<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !==0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" 
      :key="index"  
      :src="item" 
      @load="imgLoad"
      alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad(){
      // 判断所有图片都加载完了，那么进行一次回调就可以了
      if(++this.counter === this.imagesLength){
        this.$emit('imageLoad');
      }
      // this.$emit('imageLoad');
      // console.log('加载图片成功');
    }
  },
  watch:{
    // 监听，获取图片的最新个数
    detailInfo(){
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style>
  .goods-info {
    width: 100%;
  }
  .info-list img {
    width: 100%;
  }
</style>