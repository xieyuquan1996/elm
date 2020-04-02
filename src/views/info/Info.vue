<template>
<Scroll class="scroll">
  <div class="info">
    <div class="img-wrapper">
      <div class="close" @click="close"><i class="icon-close"></i></div>
      <img :src="food.image" class="img" />
    </div>
    <div class="tittle-wrapper">
      <div class="tittle">{{food.name}}</div>
      <div class="sell">
        <span class="sell-count">月售{{food.sellCount}}份</span>
        <span>好评率{{food.rating}}%</span>
      </div>
      <div class="price">
        <span>￥</span>
        <span class="price-num">{{food.price}}</span>
        <span class="old-price" v-if="food.oldPrice">
          <span>￥</span>
          <span class="price-num">{{food.oldPrice}}</span>
        </span>
        <div class="shop-cart">加入购物车</div>
      </div>
    </div>
    <div class="border"></div>
    <div class="desc">
      <div class="tittle">商品介绍</div>
      <div class="content">{{food.info}}</div>
    </div>
    <div class="border"></div>
    <div class="rating">
      <div class="tittle">商品评价</div>
      <nav class="tab">
        <span
          class="rating-tittle"
          v-for="(rating,index) of ratings"
          :key="rating.desc"
          :class="rating.class"
          @click="chooseRating(index)"
        >
          <span class="rating-desc">{{rating.desc}}</span>
          <span class="number">{{rating.number}}</span>
        </span>
      </nav>
      <div class="show-content" @click="onlyContent">
        <span class="icon" :class="{'high-light': showContent}">
          <i class="icon-check_circle"></i>
        </span>
        <span class="text">只看有评论的内容</span>
      </div>
      <div class="rating-wrapper">
        <div class="rating" v-for="(rating,index) of foodRatings" :key="rating.username + index">
          <div class="info-wrapper">
            <span class="time">{{dateFmt(rating.rateTime)}}</span>
            <span class="avatar">
              <span class="username">{{rating.username}}</span>
              <img :src="rating.avatar" class="img" />
            </span>
          </div>
          <div class="content-wrapper">
            <span class="icon" :class="highLight[rating.rateType]">
              <i :class="iconClass[rating.rateType]"></i>
            </span>
            <span class="text">{{rating.text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Scroll>
</template>

<script>
import Scroll from "@/components/scroll/Scroll.vue";
export default {
  components:{
    Scroll
  },
  data() {
    return {
      food: this.$store.state.home.food,
      datefmt: 'YYYY-mm-dd HH:MM',
      showContent: false,
      isAll: -1,
      ratingList: [],
      ragingsList: []
    };
  },
  created(){
    const that = this
    that.$API.getRatingsByFoodId(that.food.foodId).then(data => {
      if(data.data.data){
        that.ragingsList = data.data.data
      }
    })
  },
  computed: {
    foodRatings(){
      let ratings = []
      let that = this
      this.ratingList.map(item => {
        if(that.isAll !== -1){
          if(that.isAll !== item.rateType){
            return
          }
        }
        if(that.showContent){
          if(item.text){
            ratings.push(item)
          }
          return
        }
        ratings.push(item)
      })
      return ratings
    },
    highLight() {
      return ["up", "down"];
    },
    iconClass() {
      return ["icon-thumb_up", "icon-thumb_down"];
    },
    ratings() {
      let ratings = [
        {
          desc: "全部",
          number: 0,
          class: "all"
        },
        {
          desc: "推荐",
          number: 0,
          class: "nice"
        },
        {
          desc: "吐槽",
          number: 0,
          class: "bad"
        }
      ];
      for (const val of this.ragingsList) {
        if (val.rateType === 1) {
          ratings[2].number += 1;
        } else {
          ratings[1].number += 1;
        }
      }
      ratings[0].number = ratings[1].number + ratings[2].number;
      return ratings;
    }
  },
  methods: {
    close(){
      this.$router.go(-1)
    },
    chooseRating(val){
      this.isAll = val - 1
    },
    onlyContent(){
      this.showContent = !this.showContent
    },
    dateFmt(val){
      return this.dateFormat(this.datefmt, new Date(val))
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './info.styl';
</style>