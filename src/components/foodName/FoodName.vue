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
                  <span v-if="sellGoogs[food.name]" class="icon" @click.stop="decrease(food.name)">
                    <i class="icon-remove_circle_outline"></i>
                  </span>
                  <span @click.stop="add(food.name, food.price)">
                    <i class="icon-add_circle"></i>
                  </span>
                  <span v-if="sellGoogs[food.name]" class="number">{{sellGoogs[food.name].number}}</span>
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
import Vue from "vue";
export default {
  components: {
    Scroll
  },
  props: ['goods'],
  data() {
    return {
      sellGoogs: this.$store.state.sellFood,
      tittleTopList: []
    };
  },
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    }
  },
  mounted() {
    let that = this
    this.$refs.tittle.map(item => {
      that.tittleTopList.push(-item.offsetTop)
    })
  },
  methods: {
    add(name, price) {
      if (this.sellGoogs[name]) {
        this.sellGoogs[name].number += 1;
      } else {
        Vue.set(this.sellGoogs, name, {
          price: price,
          number: 1
        });
      }
      this.emitFood()
    },
    emitFood(){
      this.$store.commit('setSellFood', this.sellGoogs)
      this.$emit('emit-food', this.sellGoogs)
    },
    decrease(name) {
      this.sellGoogs[name].number -= 1;
      if (this.sellGoogs[name].number === 0) {
        this.sellGoogs[name] = undefined;
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
      this.$store.commit('setFood', val)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './foodName.styl'
</style>