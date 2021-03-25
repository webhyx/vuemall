<template>
  <div id="app" class="wrapper">
    <!-- detail页面每次进去都要更新数据，否则每次点击加载的都是刚开始第一次进去的detail页面数据 -->
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
