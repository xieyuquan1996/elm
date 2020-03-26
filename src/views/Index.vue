<template>
  <div class="index">
    <div class="close-wrapper" @click="closeBack"><i class="icon-arrow_lift"></i></div>
    <Introduce :seller="seller" @show="showMore" class="introduce-wrapper"></Introduce>
    <Details class="details"></Details>
    <transition name="fade">
      <More v-if="show" :seller="seller" @close="closeMore"></More>
    </transition>
    <ShopCart class="foot"></ShopCart>
    <Loading class="loading" v-show="loading!=0"></Loading>
  </div>
</template>

<script>
import Introduce from '@/components/introduce/Introduce.vue'
import Details from '@/components/details/Details.vue'
import More from '@/components/More/More.vue'
import ShopCart from "@/components/ShopCart/ShopCart.vue"
import Loading from '@/components/loading/Loading.vue'
export default {
  data(){
    return {
      show: false
    }
  },
  computed: {
    seller() {
      return this.$store.state.seller
    },
    loading(){
      return this.$store.state.loading
    }
  },
  components: {
    Introduce, Details, More,ShopCart,Loading
  },
  created(){
    const that = this
    const shopId = this.$store.state.shopId
    that.$API.getSeller(shopId).then((data) => {
      if(data.status==200){
        that.$store.commit('setSeller', data.data.data)
      }
    })
  },
  methods: {
    closeBack(){
      this.$router.push({path: '/'})
    },
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
  display flex
  flex-direction: column;
  .close-wrapper
    position absolute
    top 0
    left 0
    padding .266667rem /* 20/75 */
    z-index 999
    font-size .533333rem /* 40/75 */
    color rgba(255,255,255,0.5)
  .introduce-wrapper,.foot
    flex-grow: 0;
    flex-shrink: 0;
  .details
    flex-grow: 1;
    flex-shrink: 1;
    top: 0
    bottom: 0
    left 0
    right 0
    overflow auto
  .fade-enter-active, .fade-leave-active 
    transition: opacity .8s
  .fade-enter, .fade-leave-to 
    opacity: 0
  .foot
    width: 100%
    height 1.28rem
    bottom: 0
    background-color: #141d27
  .loading
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index 9999
</style>
