<template>
  <div class="shop-cart">
    <div class="left-wrapper">
      <span class="logo-wrapper">
        <span class="logo" :class="highLight">
          <i class="icon-shopping_cart"></i>
        </span>
      </span>
      <span class="price" :class="rightHighLight">￥{{total}}</span>
      <span class="desc">另需配送费￥{{deliveryPrice}}</span>
    </div>
    <span class="right-wrapper" :class="rightHighLight" @click="pay">
      <span>{{text}}</span>
    </span>
  </div>
</template>

<script>
import {deleteLocalStorage} from '@/serve/localstorage'
export default {
  data() {
    return {
    };
  },
  computed: {
    deliveryPrice(){
      return this.$store.state.home.seller.deliveryPrice
    },
    minPrice(){
      return this.$store.state.home.seller.minPrice
    },
    food(){
      return this.$store.state.home.sellFood[this.$store.state.home.seller.shopId]
    },
    total() {
      let price = 0;
      for (const val in this.food) {
        if (this.food[val]) {
          price += this.food[val].price * this.food[val].number;
        }
      }
      return price
    },
    highLight(){
      if(this.total != 0){
        return 'high-light'
      }
      return ''
    },
    rightHighLight(){
      if(this.total >= this.minPrice){
        return 'high-light'
      }
      return ''
    },
    text(){
      if  (this.total === 0) {
        return `￥${this.minPrice}起配送`
      }
      if(this.total < this.minPrice){
        return `还差￥${this.minPrice - this.total}配送`
      }
      return '去结算'
    }
  },
  methods: {
    pay(){
      if (this.text === '去结算') {
        if(this.$store.state.my.token){
          this.$API.validToken().then(data => {
            if(!data.data.data.code){
              deleteLocalStorage('token')
              this.$router.push({path: '/login'})
            } else {
              this.$router.push({name: 'order', params: {
                seller: this.$store.state.home.seller,
                sellFood: this.$store.state.home.sellFood[this.$store.state.home.shopId]
              }})
            }
          }).catch(err => {
            console.log(err)
            this.$router.push({path: '/login'})
          })
        } else {
          this.$router.push({path: '/login'})
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './shopCart.styl';
</style>