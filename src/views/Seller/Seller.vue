<template>
<div class="seller">
    <div class="shop-info">
      <div class="first-wrapper">
        <div class="left-wrapper">
          <div class="up">{{seller.name}}</div>
          <div class="down">
            <div class="star">
              <Star :score="seller.score" :starStyle="starStyle"></Star>
            </div>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="right-wrapper" @click="clickFavorite">
          <div class="icon" :class="{'high-light': isFavorite}">
            <i class="icon-favorite"></i>
          </div>
          <div class="text">{{favorite}}</div>
        </div>
      </div>
      <div class="second-wrapper">
        <div class="content-wrapper" v-for="item of content" :key="item.tittle">
          <div class="tittle">{{item.tittle}}</div>
          <div class="number-wrapper">
            <span class="number">{{item.number}}</span>
            <span class="unit">{{item.unit}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="notice-wrapper">
      <div class="tittle">公告与活动</div>
      <div class="desc">{{seller.bulletin}}</div>
      <div class="supports" v-for="item of seller.supports" :key="item.description">
        <Icon class="icon" :type="item.type"></Icon>
        <span class="text">{{item.description}}</span>
      </div>
    </div>
    <div class="real-wrapper">
      <div class="tittle">商家实景</div>
      <Carousel class="img" :imgs="seller.pics"></Carousel>
    </div>
    <div class="seller-info">
      <div class="tittle">商家信息</div>
      <div class="info" v-for="item of seller.infos" :key="item">{{item}}</div>
  </div>
</div>
</template>

<script>
import Star from "@/components/star/Star.vue";
import Icon from '@/components/icon/Icon.vue'
import Carousel from "@/components/carousel/Carousel.vue"
export default {
  data() {
    return {};
  },
  computed: {
    content(){
      return [
        {
          tittle: '起送价',
          number: this.seller.minPrice,
          unit: '元'
        },
        {
          tittle: '商家配送',
          number: this.seller.deliveryPrice,
          unit: '元'
        },
        {
          tittle: '平均配送时间',
          number: this.seller.deliveryTime,
          unit: '分钟'
        },
      ]
    },
    starStyle() {
      return {
        width: "0.48rem",
        height: "0.48rem",
        "margin-right": ".213333rem"
      };
    },
    favorite() {
      return this.isFavorite ? "已收藏" : "收藏";
    },
    isFavorite() {
      return this.$store.state.isFavorite;
    },
    seller() {
      return this.$store.state.seller;
    }
  },
  methods: {
    clickFavorite(){
      this.$store.commit('setIsFavorite', !this.isFavorite)
    }
  },
  components: {
    Star, Icon ,Carousel
  }
};
</script>

<style lang="stylus" scoped>
@import 'seller.styl'
</style>