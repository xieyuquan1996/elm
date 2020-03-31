<template>
  <div class="shop-list">
    <div class="sticky-wrapper" v-if="shopList.length>0">
      <div class="tittle-wrapper" v-if="keyword==''">附近商家</div>
      <div class="search-box">
        <ul class="search-content">
          <li v-for="item of searchList" :key="item.name" class="content">
            {{item.name}}
            <i v-if="item.icon" :class="item.icon"></i>
          </li>
        </ul>
      </div>
    </div>
    <ul class="shop-wrapper" v-if="shopList.length>0">
      <li
        v-for="shop of shopList"
        :key="shop.shopId"
        class="shop-content"
        @click="chooseShop(shop.shopId)"
      >
        <div class="shop-left">
          <img :src="shop.avatar" class="image" />
        </div>
        <div class="shop-right">
          <div class="shop-right-top">{{shop.name}}</div>
          <div class="shop-right-center">
            <div class="sorce">
              <Star :score="shop.score" :starStyle="starStyle" class="start"></Star>
              <span>{{shop.score}}</span>
            </div>
            <div class="distance">
              <span>{{shop.deliveryTime}}分钟 |</span>
              <span>{{shop.distance}}</span>
            </div>
          </div>
          <div class="shop-right-bottom">
            <span>起送￥{{shop.minPrice}}</span> |
            <span>配送￥{{shop.deliveryPrice}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="show404&&(!shopList||shopList.length==0)" class="no-found">找不到相关的商店</div>
  </div>
</template>

<script>
import Star from "@/components/star/Star.vue";
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  components: {
    Star
  },
  data() {
    return {
      show404: false,
      searchList: [
        {
          name: "综合排序",
          icon: "icon-arrow-down"
        },
        {
          name: "销量最高"
        },
        {
          name: "距离最近"
        },
        {
          name: "筛选",
          icon: "icon-screening"
        }
      ],
      shopList: [],
      starStyle: {
        height: ".266667rem",
        width: ".266667rem",
        "margin-right": 0
      }
    };
  },
  created() {
    const that = this;
    this.$API
      .getShopList(that.keyword)
      .then(data => {
        if (data.data.data) {
          that.shopList = data.data.data;
        } else {
          that.$store.dispatch("setShowData", "请稍后重试!");
        }
        that.show404 = true
      })
      .catch(() => {
        that.$store.dispatch("setShowData", "请稍后重试!");
      });
  },
  methods: {
    chooseShop(shopId) {
      this.$store.commit("setShopId", shopId);
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './shopList.styl'
</style>