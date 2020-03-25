<template>
  <div class="my-header">
    <span class="icon" @click="close">
      <i class="icon-arrow_lift"></i>
    </span>
    <div class="tittle">{{tittle}}</div>
  </div>
</template>

<script>
export default {
  props: ["tittle", "routerName"],
  methods: {
    close() {
      if (this.routerName && this.routerName != "") {
        this.$router.push({ name: this.routerName });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './myHeader.styl';
</style>