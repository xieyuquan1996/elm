<template>
  <div class="seckill-info">
    <div class="top-wrapper">
      <div class="img-wrapper">
        <span class="icon-back" @click="close">
          <i class="icon-arrow_lift"></i>
        </span>
        <img :src="goods.img" class="img" />
      </div>
      <div class="time">
        <span class="time-title">距离秒杀{{nowTime>goods.startTime?'结束':'开始'}}</span>
        <span class="time-wrapper">
          <span class="time-common">{{formatStr(time.hour)}}</span>:
          <span class="time-common">{{formatStr(time.minutes)}}</span>:
          <span class="time-common">{{formatStr(time.seconds)}}</span>
        </span>
      </div>
      <div class="goods-name-title">
        <div>{{goods.name}}</div>
        <div>限量{{goods.limit}}台</div>
      </div>
      <div class="goods-info-titlt">商品详情</div>
      <img v-for="(item,index) of goods.infoImgs" :key="index" :src="item" class="img" />
    </div>
    <div class="bottom-wrapper">
      <span class="seckill-button" :class="{'gray': goods.startTime-nowTime > 1000*60*5}" @click="seckill">立即秒杀</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastTIme: +new Date(),
      delay: 1000,
      nowTime: new Date(),
      time: {
        hour: 0,
        minutes: 0,
        seconds: 0
      },
      goods: {
        limit: 1,
        img:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-silver-select-201911_GEO_CN?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572654951094",
        name: "MacBook Pro 16 英寸",
        startTime: new Date("2020-04-09 17:38:00"),
        endTime: new Date("2020-04-10 17:00"),
        infoImgs: [
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-silver-select-201911_GEO_CN?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572654951094",
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-silver-select-201911_GEO_CN?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572654951094",
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-silver-select-201911_GEO_CN?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572654951094",
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-silver-select-201911_GEO_CN?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572654951094"
        ]
      }
    };
  },
  created() {
    const that = this;
    console.log(this.goods.startTime-this.nowTime)
    setInterval(() => {
      that.nowTime = new Date();
    }, 1000);
  },
  methods: {
    formatStr(val) {
      return ("00" + val).slice(-2);
    },
    close(){
      this.$router.go(-1)
    },
    seckill(){
      let now = new Date() 
      if(now - this.lastTIme > this.delay){
        this.lastTIme = now
        console.log('秒杀成功')
      }
    }
  },
  watch: {
    nowTime() {
      let interval =
        ((this.goods.startTime > this.nowTime
          ? this.goods.startTime
          : this.goods.endTime) -
          this.nowTime) /
        1000;
      //console.log(interval)
      this.time.seconds = parseInt(interval % 60);
      this.time.minutes = parseInt((interval / 60) % 60);
      this.time.hour = parseInt((interval / 60 / 60) % 60);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './seckill-info.styl';
</style>