<template>
  <div class="details">
    <Tab :tab-data="tabData" class="tab" @on-click='jump'></Tab>
    <transition name="fade">
      <router-view class="contain"/>
    </transition>
  </div>
</template>

<script>
import Tab from '@/components/tab/Tab.vue'
export default {
  components: {
    Tab
  },
  data() {
    return {
      tabData: ['商品', '评价', '商家'],
      taburl: ['goods', 'ratings', 'seller']
    }
  },
  created(){
    this.$router.push({path: 'goods'})
  },
  methods: {
    jump(index) {
      const url = this.taburl[index]
      this.$router.push({path: url})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './details.styl'
</style>