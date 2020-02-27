<template>
  <div class="introduce">
    <div class="header">
      <span class="avatar-wrapper">
        <img class="avatar" :src="seller.avatar" alt="商店图片" ref="img" />
      </span>
      <span class="right">
        <div class="top">
          <span class="img"></span>
          <span>{{seller.name}}</span>
        </div>
        <div class="center">
          <span>{{seller.description}}</span>
        </div>
        <div class="bottom" v-if="seller.supports">
          <Icon class="icon" :type="seller.supports[0].type"></Icon>
          <span>{{seller.supports[0].description}}</span>
        </div>
      </span>
      <div class="more" @click="show" v-if="seller.supports">
        <span class="text">{{seller.supports.length}}个</span>
        <span class="icon"><i class="icon-keyboard_arrow_right"></i></span>
      </div>
    </div>
    <div class="footer" @click="show">
      <span class="icon"><i class="icon-keyboard_arrow_right"></i></span>
      <span class="bulletin"></span>
      <span>{{seller.bulletin}}</span>
    </div>
    <div class="bg-img">
      <img class="img" :src="seller.avatar" alt="商店图片">
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon/Icon.vue'
export default {
  components:{
    Icon
  },
  props: ['seller'],
  computed: {
    imgClass() {
      return ['decrease', 'discount', 'special',  'invoice', 'guarantee']
    }
  },
  methods: {
    show(){
      this.$emit('show', true)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './introduce.styl';
</style>
