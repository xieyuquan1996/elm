<template>
  <div>
    <span v-for="(item,index) of sorceClass" :key="'stars' + index" :class="item" :style="starStyle"></span>
  </div>
</template>

<script>
export default {
  props: ['score', 'starStyle'],
  computed: {
    sorceClass() {
      let list = [];
      for (var i = 1; i <= this.score; i++) {
        list.push("on");
      }
      if (i - this.score <= 0.5) {
        list.push("half");
        i += 1;
      }
      for (; i <= 5; i++) {
        list.push("off");
      }
      return list;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './star.styl'
</style>