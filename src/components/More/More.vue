<template>
  <div class="more">
    <div class="title">{{seller.name}}</div>
    <Star class="stars" :score="seller.score">
    </Star>
    <div class="info">
      <div class="title">
        <div class="border"></div>
        <span class="text">优惠信息</span>
        <div class="border right"></div>
      </div>
      <div class="contains">
        <div v-for="item of seller.supports" :key="item.description" class="info">
          <Icon class="icon" :type="item.type"></Icon>
          <span class="text">{{item.description}}</span>
        </div>
      </div>
    </div>
    <div class="notice">
      <div class="title">
        <div class="border"></div>
        <span class="text">商家公告</span>
        <div class="border right"></div>
      </div>
      <div class="contains">
        <div class="text">{{seller.bulletin}}</div>
      </div>
    </div>
    <div class="close">
      <span class="icon" @click="close"><i class="icon-close"></i></span>
    </div>
  </div>
</template>

<script>
import Star from '@/components/star/Star.vue'
import Icon from '@/components/icon/Icon.vue'
export default {
  components: {
    Star,Icon
  },
  props:['seller'],
  methods: {
    close() {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './more.styl'
</style>