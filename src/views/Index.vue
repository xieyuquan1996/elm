<template>
  <div class="index">
    <div class="close-wrapper" @click="closeBack">
      <i class="icon-arrow_lift"></i>
    </div>
    <div class="top-wrapper">
      <Introduce :seller="seller" @show="showMore" class="introduce-wrapper"></Introduce>
      <Details class="details"></Details>
    </div>
    <transition name="fade">
      <More v-if="show" :seller="seller" @close="closeMore"></More>
    </transition>
    <ShopCart class="foot"></ShopCart>
    <Loading class="loading" v-show="loading!=0"></Loading>
  </div>
</template>

<script>
import Introduce from "@/components/introduce/Introduce.vue";
import Details from "@/components/details/Details.vue";
import More from "@/components/More/More.vue";
import ShopCart from "@/components/ShopCart/ShopCart.vue";
import Loading from "@/components/loading/Loading.vue";
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions, mapState } = createNamespacedHelpers('home')
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState(['seller']),
    loading() {
      return this.$store.state.loading;
    }
  },
  components: {
    Introduce,
    Details,
    More,
    ShopCart,
    Loading
  },
  created() {
    const that = this;
    const shopId = this.$store.state.home.shopId;
    that.$API.getSeller(shopId).then(data => {
      if (data.status == 200 && data.data.data) {
        that.setSeller(data.data.data);
      } else {
        that.setShowData("请稍后重试!");
        that.$router.push({name: 'home'})
      }
    }).catch(() => {
      that.setShowData("请稍后重试!");
      that.$router.push({name: 'home'})
    });
  },
  methods: {
    ...mapActions(['setShowData']),
    ...mapMutations(['setSeller']),
    closeBack() {
      this.$router.push({ path: "/" });
    },
    closeMore(status) {
      this.show = status;
    },
    showMore(status) {
      this.show = status;
    }
  }
};
</script>

<style lang="stylus" scoped>
.index
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  .close-wrapper
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.266667rem; /* 20/75 */
    z-index: 999;
    font-size: 0.533333rem; /* 40/75 */
    color: rgba(255, 255, 255, 0.5);

  .top-wrapper
    flex-grow: 1;
    flex-shrink: 1;
    overflow scroll
    .details
      overflow: scroll;

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .foot
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    height: 1.28rem;
    bottom: 0;
    background-color: #141d27;

  .loading
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
</style>
