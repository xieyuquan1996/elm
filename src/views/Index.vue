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
  </div>
</template>

<script>
import Introduce from '@/components/introduce/Introduce.vue'
import Details from '@/components/details/Details.vue'
import More from '@/components/More/More.vue'
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
    Introduce, Details, More
  },
  created(){
    const that = this
    new Promise((resolve) => {
      resolve(that.$API.getSeller())
    }).then((data) => {
      that.$store.commit('setSeller', data)
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
</style>
