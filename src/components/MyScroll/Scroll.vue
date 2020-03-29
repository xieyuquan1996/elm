<template>
  <div class="scoll" ref="scroll" @scroll="_scroll($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 滚动延迟的时间
    delayTime: {
      type: Number,
      default: 500
    },
    scrollY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      lastScrollTime: new Date()
    };
  },
  methods: {
    // 提交滚动事件
    _scroll(event) {
      if (+new Date() - +this.lastScrollTime > this.delayTime) {
        this.$emit("scroll", event);
      }
    }
  },
  watch: {
    scrollY(newScroolY) {
      this.$refs.scroll.scrollTop = newScroolY;
    }
  }
};
</script>

<style lang="stylus" scoped>
.scoll {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>