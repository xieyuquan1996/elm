<template>
  <div class="goods">
      <GoodsName class="left-wrapper" :goods="goods" @choose="jump" ref="goods"></GoodsName>
      <FoodName ref="food" class="right-wrapper" :goods="goods" @choose="chooseGoodsName" @emit-food="setFood"></FoodName>
  </div>
</template>

<script>
import GoodsName from "@/components/goodsName/GoodsName.vue";
import FoodName from "@/components/foodName/FoodName.vue";
import { createNamespacedHelpers } from 'vuex'
const { mapMutations,mapActions } = createNamespacedHelpers('home')
export default {
  components: {
    GoodsName,
    FoodName
  },
  data() {
    return {
      foodList: {}
    };
  },
  created() {
    if(this.$store.state.home.goods.length==0){
      const that =this
      const shopId = this.$store.state.home.shopId
      this.$API.getGoods(shopId).then(data => {
        if(data.data.data){
          that.setGoods(data.data.data)
        } else {
          that.setShowData( "请稍后重试!");
          that.$router.push({name: 'home'})
        }
      }).catch(() => {
        that.setShowData( "请稍后重试!");
        that.$router.push({name: 'home'})
      })
    }
  },
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    },
    goods(){
      return this.$store.state.home.goods
    },
    seller(){
      return this.$store.state.home.seller;
    }
  },
  methods: {
    ...mapActions(['setShowData']),
    jump(index){
      this.$refs.food.scrollToY(index)
    },
    chooseGoodsName(val){
      this.$refs.goods.setCurrentIndex(+val)
    },
    setFood(val){
      this.foodList = val
    },
    ...mapMutations(['setGoods'])
  }
};
</script>

<style lang="stylus" scoped>
@import './goods.styl';
</style>