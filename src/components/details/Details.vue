<template>
  <div class="details">
    <Tab :tab-data="tabData" class="tab" @on-click='jump'></Tab>
    <transition name="fade">
      <component :is="componentName" class="contain"></component>
    </transition>
  </div>
</template>

<script>
import Tab from '@/components/tab/Tab.vue'
import Goods from '@/views/Goods/Goods.vue'
import Ratings from '@/views/Ratings/Ratings.vue'
import Seller from '@/views/Seller/Seller.vue'
export default {
  components: {
    Tab, Goods, Ratings, Seller
  },
  data() {
    return {
      componentName: 'Goods',
      tabData: ['商品', '评价', '商家'],
      componentNameList: ['Goods', 'Ratings', 'Seller']
    }
  },
  methods: {
    jump(index) {
      this.componentName = this.componentNameList[index]
      //this.$router.push({path: url})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './details.styl'
</style>