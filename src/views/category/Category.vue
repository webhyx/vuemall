<template>
    <div id="wrapper">
      <h2>分类</h2>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        // bscroll: null
      }
    },
   
    mounted() {
      const bscroll = new BScroll(document.querySelector('#wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      bscroll.on('scroll',(position) => {
        console.log(position);
      })
      bscroll.on('pullingUp', () => {
        console.log('上拉加载');
      })
    },
  }
</script>

<style scoped>
  #wrapper {
    height: 200px;
    background-color:red;
    overflow: hidden;
  }
</style>