<template>
  <div id="home">
    <!-- 这里单独给一个类来设置背景颜色，是为了使得NavBar组件的独立性不受到影响 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        ref="tabControl1"
        @tabClick="tabClick"
        :class="{ifxed: isTabFixed}"
        v-show="isTabFixed"/>
    <scroll id="content" ref="scroll" 
    :probe-type="3"
    :pull-up-load="true"
    @scroll="contentScroll" 
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature />
      <!-- :probe-type 加冒号作用 使得3是Number 而不是字符串 -->
      <!-- :class boolen值决定此类是否存在 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @tabClick="tabClick"
        :class="{ifxed: isTabFixed}"
      />
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- @click.native:给组件绑定原生事件；不可以直接监听，必须要.native， -->
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from 'components/content/backTop/BackTop'

import { getHomeGoods, getHomeMultidata } from "network/home";
import {debounce} from 'common/utils'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }, 
      },
      currentType: "pop",/* 默认值 */
      isShowBack: false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY: 0,
      itemImgListener:null
    };
  },
  /* 生命周期函数 */
  created() {
    //1. 请求多个数据
    this.getHomeMultidata();

    //2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  mounted() {
    /* ！！这里也可以使用混入！！ */

    //1. 图片加载完成的事件监听
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 对事件监听做保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    //2.获取tabControl的offsetTop
    //所有的组件都有一个$el，获取组件中的元素
     

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {/* 来到home页面时 */
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    /* 刷新一次，保证稳定 */
    this.$refs.scroll.refresh()
  },
  deactivated() {/* 离开home页面时 */
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods: {
    /* 事件监听相关 */
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    },
    tabClick(index) {
      /* 这里的index是$emit传来的参数 */
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      /* this.$refs.scroll 就可以拿到组件对象 */
      /* 直接跨组件访问Scroll.vue中的scroll , 500ms回到顶部*/
      console.log('back');
      /* this.$refs.scroll 组件 scroll 属性 scrollTo 属性的方法 */
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // console.log(position);
      // this.isShowBack = (-position.y)>1000
      this.isShowBack = position.y < (-1000)?true:false

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y)> this.tabOffsetTop
      
    },
    loadMore(){
      /* 上拉加载更多 */
      /* Scroll.vue中的scroll.on监听到上拉动作事件,就触发此函数，加载数据 */
      this.getHomeGoods(this.currentType);
      /* 图片加载完成后 刷新页面 */
      this.$refs.scroll.scroll.refresh();
    },

    /* 网络请求相关 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        /* ...可变参数 */
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        /* $refs:父组件调用子组件的方法, */
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1; */
}

#content {
  /* ！！！需要注意的是，运算符前后都需要保留一个空格，
  例如：width: calc(100% - 10px)； */
   height: calc(100% - 44px); 
  overflow: hidden;
  /* margin-top: 44px;  */
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>