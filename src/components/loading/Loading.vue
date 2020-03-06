<template>
  <div class="loading">
      <div class="cicle"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.loading
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  background-color rgb(200,200,200)
  .cicle
      width .533333rem /* 40/75 */
      height .533333rem /* 40/75 */
      border-radius 50%
      border-width .053333rem /* 4/75 */
      border-style solid 
      border-color rgb(255,255,255) rgb(255,255,255) rgb(4,117,200)
      animation: loading 1s infinite linear;
  @keyframes loading
    0%
      border-color rgb(255,255,255) rgb(255,255,255) rgb(4,117,200) rgb(4,117,200)
      transform: rotate(0deg)
    33.3%
      border-color rgb(255,255,255) rgb(255,255,255) rgb(4,117,200)
    66.6%
      border-color rgb(255,255,255) rgb(4,117,200) rgb(4,117,200)
    100%
      border-color rgb(255,255,255) rgb(255,255,255) rgb(4,117,200) rgb(4,117,200)
      transform: rotate(360deg)

</style>