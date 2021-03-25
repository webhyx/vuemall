<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list class="cart-list"></cart-list>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar.vue";
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import Scroll from "components/common/scroll/Scroll";

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
      /* 长的放到计算属性中去 */
      ...mapGetters({
        // 起别名
        length: 'cartLength',
        // list: 'cartList'
      })
    },
    deactivated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: ; */
  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    
  }
  .cart-list {
    height: 100%;
    overflow: hidden;
  }
</style>
