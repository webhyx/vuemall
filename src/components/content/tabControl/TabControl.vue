<template>
  <div class="tab-control">
    
    <div v-for="(item,index) in titles" 
    class="tab-control-item"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)"
    :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type:Array,
      /* type 是数组或对象时default必须是函数 */
      default(){
        return []
      }
    }
  },
  /*  */
  data() {
    return {
      currentIndex: 0/* 记录是否选中 */
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      /* index 传出去的参数 */
      this.$emit('tabClick',index)
      
    }
  },
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color:#fff;
  }
  .tab-control-item {
    height: 40px;
    line-height: 40px;
    flex: 1;
    font-size: 15px;
  }
  .tab-control-item  span {
    padding: 5px;
  }


  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

</style>