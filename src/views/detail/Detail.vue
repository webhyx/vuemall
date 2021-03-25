<template>
  <div class="detail">
    <detail-nav-bar  ref="navIndex"  :currentIndex="currentIndex" class="detailNav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" :probeType="3"  @scroll="cententScroll"> 
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
      <toast :message="message" :show="show"></toast>
      <back-top @click.native="backClick" v-show="isShowBack"></back-top>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>


<script>
import DetailNavBar from "./childComps/DetailNavBar";
import detailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import GoodList from "components/content/goods/GoodList"
import DetailBottomBar from "./childComps/DetailBottomBar"
import BackTop from "components/content/backTop/BackTop"
import Toast from "components/common/toast/Toast"

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop , GoodsParam, getRecommend} from "network/detail";
import {debounce} from 'common/utils'
import {itemListenerMixin} from "common/mixin"

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    // NavBar
    DetailNavBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    BackTop,
    Toast,
    Scroll,
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      themeTopYs:[],
      themeTopY:null,
      currentIndex: 0,
      isShowBack: false,
      message: '',
      show:false
    };
  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //1.获取顶部的图片轮播图数据
      console.log(res);
      const data = res.result;
      //1.去除轮播图数据
      this.topImage = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //6.取出评论的信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
      //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    //4.给getThemeTopY赋值(赋值防抖)
    this.themeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0),
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
    })
  },
  mounted() {
    
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    // 映射， 将这actions的addCart方法映射到这里直接用
    ...mapActions(['addCart']),

    imageLoad(){
      this.newRefresh()
      this.themeTopY()  
    },
    titleClick(index){
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    cententScroll(position){
      
      const positionY = -position.y;
      // console.log(positionY);
      let Ylength = this.themeTopYs.length;

      for(let i=0;i<Ylength;i++){
        // this.currentIndex !== i 防止赋值过于频繁
        if(this.currentIndex !== i && (i< Ylength-1 && positionY >= this.themeTopYs[i] && (positionY <this.themeTopYs[i+1]) || (i === Ylength-1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          //  console.log(this.currentIndex);
          this.$refs.navIndex.currentIndex = this.currentIndex;
        }
      }
      // backTop
      this.isShowBack = position.y < (-1000)?true:false;
      // console.log(this.isShowBack);
    },
    backClick(){
      console.log('back')
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      //直接该state不好 this.$state.cartList.push(product)
      //dispatch 调用actions actions可以返回一个promise

      // 未使用映射
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

      // 使用映射
      this.addCart(product).then(res => {
        this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = ''
        },1500)
        console.log(res);
      })

    }
  },
  
}

</script>



<style scoped>
.detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  /* calc 100%是相对于父元素 要这设置100视口高度 */
  height: 100vh;
}
.detailNav {
  /* 相对定位,保持自己原来的位置 */
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content {
  height: calc(100% - 44px - 58px);
}
</style>