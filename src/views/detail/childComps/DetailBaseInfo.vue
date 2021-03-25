<template>
  <div class="base-Info" v-if="Object.keys(goods).length !== 0" >
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="?">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },
}
</script>

<style>
  .base-Info {
    margin-top: 10px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    
    color: #222;
  }
  .info-price {
    margin-top: 10px;
  }
  .info-price .n-price {
    
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 13px;
    margin-left:5px ;
    text-decoration: line-through;
  }
  .discount {
    position: absolute;
    background-color: var(--color-high-text);
    padding: 3px;
    font-size: 13px;
    color: #f2f5f8;
    border-radius: 20%;
    margin-left: 4px;
  }
  .info-other {
    display: flex;
    justify-content: space-between;
    padding: 24px 0;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: rgb(71, 68, 68);
    padding: 24px 0;
    border-bottom: 2px solid #eee;
  }
  .info-service-item img {
    height: 13px;
    width: 13px;
    margin-right: 1px;
  }
</style>