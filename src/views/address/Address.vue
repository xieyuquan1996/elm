<template>
  <div class="address">
    <MyHeader :tittle="tittle" :routerName="routerName" class="header-wrapper"></MyHeader>
    <Scroll class="address-wrapper">
      <div>
        <div v-for="address of addressList" :key="address.id" class="address-correct">
          <i v-if="selectAddress && address.id == selectAddress.id" class="icon-check_circle check"></i>
          <div class="address-content" @click="chooseAddress(address)">
            <div class="top-address">
              <div class="left-content">{{address.address}}</div>
              <div class="right-content">{{address.doorplate}}</div>
            </div>
            <div class="bottom-address">
              <div class="left-content">{{address.person+address.sex}}</div>
              <div>{{address.phone}}</div>
            </div>
          </div>
          <div class="icon" @click="modify(address)">
            <i class="icon-modify"></i>
          </div>
        </div>
        <div class="over-place" v-if="addressListOver.length > 0">
          <div class="top-wrapper">
            <i class="icon-location"></i>
            <div>超配送范围地址</div>
          </div>
          <div v-for="address of addressListOver" :key="address.id" class="address-over">
            <div class="address-content">
              <div class="top-address">
                <div class="left-content">{{address.address}}</div>
                <div class="right-content">{{address.doorplate}}</div>
              </div>
              <div class="bottom-address">
                <div class="left-content">{{address.person+address.sex}}</div>
                <div>{{address.phone}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="footer-wrapper" @click="modify(null)">
      <div class="footer-content">
        <i class="icon-add_circle icon"></i>新增收货地址
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/scroll/Scroll.vue";
import MyHeader from "@/components/myHeader/MyHeader.vue";
import { createNamespacedHelpers } from 'vuex'
const { mapMutations,mapActions } = createNamespacedHelpers('home')
export default {
  components: {
    MyHeader,
    Scroll
  },
  data() {
    return {
      routerName: 'order',
      selectAddress: this.$store.state.home.address,
      tittle: "地址列表",
      addressList: [],
      addressListOver: []
    };
  },
  created() {
    const that = this;
    this.$API.getAddress(this.$store.state.home.shopId).then(data => {
      if (data.data.data) {
        that.addressList = data.data.data.addressList;
        that.addressListOver = data.data.data.addressListOver;
      } else {
        that.setShowData( "请稍后重试!");
      }
    }).catch(() => {
      that.setShowData( "请稍后重试!");
    });
  },
  methods: {
    ...mapActions(['setShowData']),
    ...mapMutations(['setAddress']),
    chooseAddress(address) {
      this.setAddress(address);
      this.$router.push({name:'order'});
    },
    modify(address) {
      // 当用path进行跳转的时候，params会被忽略。所以只能用name进行跳转
      this.$router.push({ name: "contact", params: { address: address } });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './address.styl';
</style>