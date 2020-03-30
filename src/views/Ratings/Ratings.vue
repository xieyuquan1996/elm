<template>
  <div class="ratings">
    <div>
      <div class="head">
        <div class="left-wrapper">
          <div class="scores">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="desc">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right-wrapper">
          <div class="rating">
            <span class="text">服务态度</span>
            <span class="star">
              <Star :score="seller.serviceScore" :starStyle="starStyle"></Star>
            </span>
            <span class="number">{{seller.serviceScore}}</span>
          </div>
          <div class="rating">
            <span class="text">食物评价</span>
            <span class="star">
              <Star :score="seller.foodScore" :starStyle="starStyle"></Star>
            </span>
            <span class="number">{{seller.foodScore}}</span>
          </div>
          <div class="rating">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <nav class="first">
          <span
            class="rating-tittle"
            v-for="(rating,index) of ratingList"
            :key="rating.desc"
            :class="rating.class"
            @click="chooseRating(index)"
          >
            <span class="rating-desc">{{rating.desc}}</span>
            <span class="number">{{rating.number}}</span>
          </span>
        </nav>
        <div class="second" @click="onlyContent">
          <span class="icon" :class="{'high-light': showContent}">
            <i class="icon-check_circle"></i>
          </span>
          <span class="text">只看有评论的内容</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <div class="rating" v-for="(rating,index) of sortRatings" :key="rating.username + index">
          <div class="img-wrapper">
            <img class="img" :src="rating.avatar" />
          </div>
          <div class="right-wrapper">
            <div class="user-wrapper">
              <span class="username">{{rating.username}}</span>
              <span class="time">{{dateFmt(rating.rateTime)}}</span>
            </div>
            <div class="score">
              <Star class="stars" :score="seller.score" :starStyle="starStyle"></Star>
              <span v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <div class="desc">{{rating.text}}</div>
            <div class="mark">
              <span class="icon" :class="highLight[rating.rateType]">
                <i :class="iconClass[rating.rateType]"></i>
              </span>
              <span
                class="recommend"
                v-for="rcm of rating.recommend"
                :key="rcm + rating.rateTime + rating.username"
              >{{rcm}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "@/components/star/Star.vue";
export default {
  data() {
    return {
      showContent: false,
      datefmt: "YYYY-mm-dd HH:MM",
      isAll: -1,
      ratings: []
    };
  },
  created() {
    const that = this;
    const shopId = this.$store.state.shopId;
    this.$API.getRatings(shopId).then(data => {
      if(data.data.data){
        that.ratings = data.data.data;
      } else {
        that.$store.dispatch("setShowData", "请稍后重试!");
      }
    }).catch(() => {
      that.$store.dispatch("setShowData", "请稍后重试!");
    });
  },
  components: {
    Star
  },
  computed: {
    seller() {
      return this.$store.state.seller;
    },
    iconClass() {
      return ["icon-thumb_up", "icon-thumb_down"];
    },
    highLight() {
      return ["up", "down"];
    },
    sortRatings() {
      let ratings = [];
      let that = this;
      this.ratings.map(item => {
        if (that.isAll !== -1) {
          if (that.isAll !== item.rateType) {
            return;
          }
        }
        if (that.showContent) {
          if (item.text) {
            ratings.push(item);
          }
          return;
        }
        ratings.push(item);
      });
      return ratings;
    },
    starStyle() {
      return {
        width: "0.32rem",
        height: "0.32rem",
        "margin-right": "0.08rem"
      };
    },
    ratingList() {
      let ratings = [
        {
          desc: "全部",
          number: 0,
          class: "all"
        },
        {
          desc: "满意",
          number: 0,
          class: "nice"
        },
        {
          desc: "不满意",
          number: 0,
          class: "bad"
        }
      ];
      for (const val of this.ratings) {
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
    chooseRating(val) {
      this.isAll = val - 1;
    },
    onlyContent() {
      this.showContent = !this.showContent;
    },
    dateFmt(val) {
      return this.dateFormat(this.datefmt, new Date(val));
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
@import './ratings.styl';
</style>