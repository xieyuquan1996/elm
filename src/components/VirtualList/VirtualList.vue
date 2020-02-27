<template>
  <div class="virtual-list">
    <div class="top"></div>
    <div class="contain" ref="contain">
      <slot></slot>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  /**
  sameHeight:高度是否都相同
   */
  props: {
    sameHeight: {
      type: Boolean
    }
  },
  data() {
    return {
      heightList: []
    }
  },
  mounted() {
    if (!this.sameHeight) {
      this.$refs.contain.childNodes.map(item => {
        this.heightList.push(item.offsetTop)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './VirtualList.styl'
</style>