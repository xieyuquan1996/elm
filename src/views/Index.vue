<template>
  <div class="index">
    <header>
      <Introduce :seller="seller" @show="showMore"></Introduce>
    </header>
    <div>
      <Details class="details"></Details>
    </div>
    <transition name="fade">
      <More v-if="show" :seller="seller" @close="closeMore"></More>
    </transition>
    <ShopCart class="foot"></ShopCart>
  </div>
</template>

<script>
import Introduce from '@/components/introduce/Introduce.vue'
import Details from '@/components/details/Details.vue'
import More from '@/components/More/More.vue'
import ShopCart from "@/components/ShopCart/ShopCart.vue";
export default {
  data(){
    return {
      show: false
    }
  },
  computed: {
    seller() {
      return this.$store.state.seller
    }
  },
  components: {
    Introduce, Details, More,ShopCart
  },
  created(){
    const that = this
    const shopId = 26
    that.$API.getSeller(shopId).then((data) => {
      that.$store.commit('setSeller', data.data)
    })
  },
  methods: {
    closeMore(status){
      this.show = status
    },
    showMore(status){
      this.show = status
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  position relative
  height 100%
  .details
    position: absolute
    top: 3.573333rem
    bottom: 0
    left 0
    right 0
  .fade-enter-active, .fade-leave-active 
    transition: opacity .8s
  .fade-enter, .fade-leave-to 
    opacity: 0
  .foot
    position: fixed
    width: 100%
    z-index: 10
    height 1.28rem
    bottom: 0
    background-color: #141d27
</style>
