<template>
  <Scroll ref="scroll" :listenScroll="true" @scroll="scroll" :probeType="3">
    <ul class="food-wrapper" ref="rightWrapper">
        <ul v-for="item of goods" :key="item.name + 'info'">
          <div class="tittle" ref="tittle">{{item.name}}</div>
          <li class="food" v-for="food of item.foods" :key="food.name + item.name" @click="jumpInfo(food)">
            <img class="left" :src="food.image" />
            <span class="right">
              <div class="name">{{food.name}}</div>
              <div class="description">{{food.description}}</div>
              <div class="sell">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price-wrapper">
                <span class="price">
                  <span class="money">￥</span>
                  {{food.price}}
                </span>
                <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                <div class="number">
                  <transition name="remove">
                    <span v-if="fingFood(food.name)" class="icon" @click.stop="decrease(food.name)">
                      <i class="icon-remove_circle_outline"></i>
                    </span>
                  </transition>
                  <span @click.stop="add(food)">
                    <i class="icon-add_circle" style="color:rgb(0,160,220);"></i>
                  </span>
                  <transition name="remove">
                    <span v-if="fingFood(food.name)" class="number">{{fingFood(food.name).number}}</span>
                  </transition>
                </div>
              </div>
            </span>
          </li>
        </ul>
      </ul>
  </Scroll>
</template>

<script>
import Scroll from "@/components/scroll/Scroll.vue";
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('home')
export default {
  components: {
    Scroll
  },
  props: ['goods'],
  data() {
    return {
      sellGoogs: this.$store.state.home.sellFood[this.$store.state.home.shopId]
    };
  },
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    },
    tittleTopList(){
      let res = []
      if (this.$refs.tittle){
        this.$refs.tittle.map(item => {
          res.push(-item.offsetTop)
        })
      }
      return res
    }
  },
  mounted() {
  },
  methods: {
    fingFood(name){
      if(this.sellGoogs){
        return this.sellGoogs.find(item => item.name == name)
      }
      return null
    },
    add(selectFood) {
      let food = this.fingFood(selectFood.name)
      if (food) {
        food.number += 1;
      } else {
        if(!this.sellGoogs){
          this.sellGoogs = []
        }
        this.sellGoogs.push({
          foodId: selectFood.foodId,
          name: selectFood.name,
          price: selectFood.price,
          number: 1,
          image: selectFood.image
        });
      }
      this.emitFood()
    },
    emitFood(){
      this.setSellFood( this.sellGoogs)
      this.$emit('emit-food', this.sellGoogs)
    },
    decrease(name) {
      const that =this
      let food = this.fingFood(name)
      food.number -= 1;
      if (food.number === 0) {
        let index = that.sellGoogs.findIndex(item => item.name == name)
        if(index > -1){
          this.sellGoogs.pop(index)
        }
      }
      this.emitFood()
    },
    scrollToY(index){
      this.$refs.scroll.scrollTo(0, this.tittleTopList[index], 100)
    },
    scroll(pos){
      if(pos.y > 0){
        return
      }
      const scrollY  = Math.round(pos.y)
      for (const val in this.tittleTopList) {
        if (-this.tittleTopList[val] > -scrollY){
          this.$emit('choose', val - 1)
          return
        }
      }
      this.$emit('choose', this.tittleTopList.length - 1)
    },
    jumpInfo(val){
      this.$router.push({path: '/info'})
      this.setFood(val)
    },
    ...mapMutations([
      'setFood', 'setSellFood'
    ])
  }
};
</script>

<style lang="stylus" scoped>
@import './foodName.styl'
</style>