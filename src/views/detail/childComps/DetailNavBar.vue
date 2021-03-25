<template>
  <div>
    <nav-bar class="navbar">
      <div slot="left" @click="back()">
        <img src="~assets/img/common/back.svg" alt="" class="backImg">
      </div>
      <div slot="center" class="title">
        <div 
        v-for="(item,index) in titles" 
        class="title-item"
        :class="{isActive: currentIndex === index}"
        @click="itemClick(index)"
        :key="index">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      /* titleClick 传入的名：@titleClick ，index 传入的参数 */
      this.$emit('titleClick',index)
    },
    back(){
      /* bug:返回后点击另一个详情页，里面的图片是之前第一次点击进去的图片 */
      this.$router.back()
    }
  },
}
</script>

<style>
  .title {
    display: flex;
    /* background-color: red; */
  }
  .title-item {
    flex: 1;
    color: black;
    font-size: 14px;
  }
  .isActive {
    color: var(--color-high-text);
  }
  .backImg {
    margin-top: 12px;
    margin-left: 12px;
  }
</style>