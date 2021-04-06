<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <!-- <div class="sells-count">{{shop.sells | sellCountFilter}}</div> -->
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="sore" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailShopInfo",
  props: {
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    sellCountFilter(value){
      let result = value;
      if(value > 10000) {
        result = (result / 10000).toFixed(1) + '万'
      }
      return result
    }
  }
}
</script>

<style> 
  .shop-info {
    padding: 5px;
    border-bottom: 6px solid #eee ;
  }
  .shop-info img {
    width: 45px;
    height: 45px;
  }
  .shop-info .title {
    padding-left: 10px;
    margin: auto 0;
  }
  .shop-top {
    display: flex;
  }
  .shop-middle {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .shop-middle-left {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-right: 0.5px solid rgb(241, 236, 236);
  }
  .info-sells {
    display: flex;
    flex-direction: column;
    
  }
  .info-goods {
    display: flex;
    flex-direction: column;
  }

  .sells-count, .goods-count {
    font-size: 24px;
    text-align: center;
    
  }
  .sells-text, .goods-text {
    text-align: center;
  }
  .shop-middle-right {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .shop-middle-right table tr td {
    padding-top: 5px;
    padding-left: 5px;
  }
  .shop-bottom {
    display: flex;
    margin-top: 20px;
  }
  .enter-shop {
    margin: 20px auto;
    padding: 2px;
    border-radius: 10%;
    border: 1px solid #999;
  }
</style>