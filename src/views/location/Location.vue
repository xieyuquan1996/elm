<template>
  <Scroll>
    <div class="location">
      <div class="location-wrapper">
        <div class="left-content">
          <div>
            <i class="icon-white-location" v-if="city"></i>
          </div>
          <div class="city light-high" v-if="!city">选择城市</div>
          <div class="city" v-else>{{city}}</div>
          <div class="icon">
            <i class="icon-arrow-down"></i>
          </div>
          <input class="address" placeholder="小区/街道/大厦/学校名称" v-model="address" />
          <div class="close-wrapper" @click="$router.go(-1)">取消</div>
        </div>
        <div class="right-content"></div>
      </div>
      <div class="current-address">
        当前位置:
        <span class="address-tittle" @click="chooseAddress">{{nowLocation.address?nowLocation.address:'请选择位置'}}</span>
        <span class="refress-address" @click="selectLocation">
          <i class="icon-refresh-location"></i>重新定位
        </span>
      </div>
      <div class="receiving-wrapper">
        <p class="receving-tittle">
          <span class="icon">
            <i class="icon-home"></i>
          </span>我的收货地址
        </p>
        <ul class="receving-wrapper">
          <li v-for="item of myAddress" :key="item.id" class="receving-content" @click="selectAddress(item)">
            <p>{{item.address}} {{item.doorplate}}</p>
            <p class="other">{{item.person}}{{item.sex}} {{item.phone}}</p>
          </li>
        </ul>
        <p v-if="addressList.lenght > 3" class="more-address" @click="clickMore">{{moreAddressList[moreAddress].str}}<i :class="moreAddressList[moreAddress].class"></i></p>
      </div>
      <div class="near-address-wrapper">
          <p class="near-address-tittle"><i class="icon-white-location"></i>附近地址</p>
          <p v-for="item of nearAddress" :key="item.name" class="near-address-content" @click="selectAddress(item)">{{item.address}}</p>
      </div>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "@/components/scroll/Scroll.vue";
export default {
  components: {
    Scroll
  },
  data() {
    return {
      nowLocation: {},
      address: "",
      city: "北京",
      addressList: [],
      moreAddress: 0,
      moreAddressList: [
          {
              str:'展开更多地址',
              class: 'icon-arrow-down'
          },
          {
              str:'收起地址',
              class: 'icon-arrow-up'
          }
      ],
      nearAddress: [
          {
              address: '腾讯大厦',
              latitude: 38.651800,
              longitude: 104.076420
          },
          {
              address: '百度大厦',
              latitude: 38.651800,
              longitude: 104.076420
          },
          {
              address: '淘宝城',
              latitude: 38.651800,
              longitude: 104.076420
          }
      ]
    };
  },
  created(){
      const that = this
      that.nowLocation = that.$store.state.address.address? that.$store.state.address: that.nowLocation
      that.$API.getAddressList().then(data => {
          if(data.data.data.addressList){
              this.addressList = data.data.data.addressList
          }
      })
  },
  computed:{
      myAddress(){
          if(this.moreAddress){
              return this.addressList
          } else {
              return this.addressList.slice(0, 3)
          }
      }
  },
  methods: {
    chooseAddress(){
      if(this.nowLocation.address){
        this.selectAddress(this.nowLocation)
      } else {
        alert('请选择一个地址')
      }
    },
    selectLocation(){
      this.$router.push({name:'map'})
    },
      clickMore(){
          this.moreAddress = (this.moreAddress + 1) & 1
      },
      selectAddress(address){
          const that = this
          address = this.$store.state.address?Object.assign(that.$store.state.address, address): address
          this.$store.commit('setAddress', address)
          that.$router.go(-1)
      }
  }
};
</script>

<style lang="stylus" scoped>
@import './location.styl';
</style>