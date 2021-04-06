<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
      class="check-content" 
      :is-checked="isSelectAll"
      @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div>
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price*item.count 
      },0)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0) return false

      // filter  遍历方法：没被选中的过滤出来，将这部分的长度取反，也就是有未选择的就是false
      // return !(this.cartList.filter(item => !item.checked).length)

      // find()查找到某个元素就返回
      return !this.cartList.find(item => !item.checked)

    }
  },
  methods: {
    checkClick(){
      // 判断 isSelectAll  全选中=>取反 全不选  ；部分选中/一个没选=>全选
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    }
  },
}
</script>

<style>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    /* better-scroll不起效果时用的： */
    /* bottom: 40px;  */
    justify-content: space-around;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 3px;
  }
</style>