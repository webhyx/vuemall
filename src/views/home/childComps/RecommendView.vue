<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style>
  .recommend {
    display: flex;
    width: 100%;
    /* 文本子元素水平居中 */
    text-align: center;
    font-size: 12px;
    /* 上 左右 下 */
    padding: 10px 0 22px;
    border-bottom: 7px solid #eee;
  }
  .recommend-item {
    /* 每一个元素都占据剩余全部 也就是平分宽度 */
    flex: 1;
  }
  .recommend-item img {
    width:69px ;
    height: 69px;
    margin-bottom: 10px;
  }
</style>