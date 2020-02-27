<template>
  <nav ref="nav">
    <span
      class="contains"
      v-for="(item, index) in tabData"
      :key="item + index"
      :class="isBold(index)"
      @click="clickContain(index)"
      ref="contains"
    >{{item}}</span>
    <div class="animation" ref="animation"></div>
  </nav>
</template>

<script>
export default {
  props: ["tab-data"],
  data() {
    return {
      tabWidth: [],
      currentIndex: 0
    }
  },
  mounted() {
    for (const ref in this.$refs.contains) {
      this.tabWidth.push({
        width: this.$refs.contains[ref].offsetWidth,
        left: this.$refs.contains[ref].offsetLeft + 1
      });
    }
    if (this.tabWidth.length > 0) {
      this.$refs.animation.style.width = this.tabWidth[0].width + "px";
    }
    
  },
  methods: {
    clickContain(index) {
      if (index === this.currentIndex) {
        return;
      }
      this.currentIndex = index;
      this.$refs.animation.style.left = this.tabWidth[index].left + "px";
      this.$refs.animation.style.width = this.tabWidth[index].width + "px";
      this.$emit("on-click", index);
    },
    isBold(index) {
      if (index === this.currentIndex) {
        return 'bold'
      }
      return ''
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './tab.styl'
</style>