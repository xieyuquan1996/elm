<template>
  <div class="goods">
    <div class="head">
      <GoodsName class="left-wrapper" :goods="goods" @choose="jump" ref="goods"></GoodsName>
      <FoodName ref="food" class="right-wrapper" :goods="goods" @choose="chooseGoodsName" @emit-food="setFood"></FoodName>
    </div>
    <!-- <ShopCart class="foot" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :food="foodList"></ShopCart> -->
  </div>
</template>

<script>
import GoodsName from "@/components/goodsName/GoodsName.vue";
import FoodName from "@/components/foodName/FoodName.vue";
// import ShopCart from "@/components/ShopCart/ShopCart.vue";
export default {
  components: {
    // ShopCart,
    GoodsName,
    FoodName
  },
  data() {
    return {
      goods: [],
      seller: {},
      foodList: {}
    };
  },
  created() {
    const that =this
    const shopId = 26
    this.$API.getGoods(shopId).then(data => {
      that.goods = data.data
    })
    this.seller = this.$store.state.seller;
  },
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    }
  },
  methods: {
    jump(index){
      this.$refs.food.scrollToY(index)
    },
    chooseGoodsName(val){
      this.$refs.goods.setCurrentIndex(+val)
    },
    setFood(val){
      this.foodList = val
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './goods.styl';
</style>