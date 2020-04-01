<template>
  <div class="content">
    <img class="img" v-for="img of imgs" :key="img" :src="img">
  </div>
</template>

<script>
export default {
props:['imgs']
}
</script>

<style lang="stylus" scoped>
.content
  width 100%
  white-space nowrap
  overflow-x scroll
  .img
    width 3.2rem
    height 2.4rem
    margin-right .16rem
  .img:last-child
    margin 0
</style>