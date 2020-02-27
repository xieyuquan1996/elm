<template>
  <Scroll :scrollX="true">
    <div class="content">
      <img class="img" v-for="img of imgs" :key="img" :src="img">
    </div>
  </Scroll>
</template>

<script>
import Scroll from "@/components/scroll/Scroll.vue";
export default {
components:{
  Scroll
},
props:['imgs']
}
</script>

<style lang="stylus" scoped>
.content
  width 100%
  white-space nowrap
  .img
    width 3.2rem
    height 2.4rem
    margin-right .16rem
  .img:last-child
    margin 0
</style>