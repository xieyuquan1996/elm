<template>
  <div class="parent">
    <div class="child">{{showData}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
computed: 
  mapState(['showData'])

}
</script>

<style lang="stylus" scoped>
.parent
  height 100%
  width 100%
  background-color rgba(220,220,220,0.5)
  display flex
  justify-content center
  align-items center
  .child
    padding 0.26666666666666666rem
    line-height .5333333333333333rem
    font-size 0.4266666666666667rem
    color #fff
    background-color rgb(103,103,103)
    text-align center
    border-radius 0.06666666666666667rem
</style>