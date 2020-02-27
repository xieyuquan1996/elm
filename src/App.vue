<template>
  <div class="app">
    <router-view class="contain" />
    <ShopCart class="foot"></ShopCart>
  </div>
</template>

<script>
import ShopCart from "@/components/ShopCart/ShopCart.vue";
export default {
  components: {
    ShopCart
  }
};
</script>
<style lang="stylus" scoped>
.app
  height: 100%
  .foot
    position: fixed
    width: 100%
    z-index: 10
    height 1.28rem
    bottom: 0
    background-color: #141d27
</style>
