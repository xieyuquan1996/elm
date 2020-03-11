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
      foodList: {}
    };
  },
  created() {
    if(this.$store.state.goods.length==0){
      const that =this
      const shopId = this.$store.state.shopId
      this.$API.getGoods(shopId).then(data => {
        that.$store.commit("setGoods", data.data)
      })
    }
  },
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    },
    goods(){
      return this.$store.state.goods
    },
    seller(){
      return this.$store.state.seller;
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