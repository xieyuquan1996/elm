<template>
  <div class="seckill">
    <div class="back-image"></div>
    <div class="top-wrapper">
      <div class="seckill-tittle">秒杀</div>
      <!-- <ul class="time-wrapper"> 
        <li v-for="time of timeList" :key="time" class="time-content">
          <div class="time-title">{{time}}</div>
          <div class="highligth-border"></div>
        </li>
      </ul> -->
    </div>
    <ul class="bottom-wrapper">
      <li class="seckill-content" v-for="item of goods" :key="item.goodsId">
        <img :src="item.img" class="goods-img">
        <div class="goods-info">
          <span class="common goods-name">{{item.name}}</span>
          <span class="common goods-seckiil">秒杀价：￥{{item.price}}</span>
          <span class="common goods-oldprice">原价：￥{{item.oldPrice}}</span>
          <div class="common goods-limit">
            <span class="limit-content">限{{item.limit}}件</span>
            <span>立即秒杀</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeList: [
        "今天10点结束",
        "今天21点开售",
        "明天10点开售",
        "明天21点开售"
      ],
      goods: [
        {
          goodsId: '1',
          img: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-silver-select-201911_GEO_CN?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572654951094',
          name: 'MacBook Pro 16 英寸',
          oldPrice: '22199',
          price: '1',
          limit: '1'
        }
      ]
    };
  },
  computed: {
  },
  methods:{
    
  }
};
</script>

<style lang="stylus" scoped>
@import './seckill.styl';
</style>