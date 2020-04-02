<template>
  <div class="map">
      <div class="icon" @click="close"><i class="icon-arrow_lift"></i></div>
    <div id="mapContainer"></div>
  </div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('home')
export default {
  data() {
    return {
        address: {}
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    var mapObj = new AMap.Map("mapContainer", {
      resizeEnable: true,
      // eslint-disable-next-line no-undef
      view: new AMap.View2D({
        resizeEnable: true,
        zoom: 13 //地图显示的缩放级别
      }),
      keyboardEnable: false
    });


    // 定位到当前位置
    // eslint-disable-next-line no-undef
    let mapObj1 = new AMap.Map('iCenter');
    mapObj1.plugin("AMap.Geolocation", function() {
        // eslint-disable-next-line no-undef
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 1000, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
        // eslint-disable-next-line no-undef
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition();
      // eslint-disable-next-line no-undef
      AMap.event.addListener(geolocation, "complete", (val) => {console.log(val)}); //返回定位信息
      // eslint-disable-next-line no-undef
      AMap.event.addListener(geolocation, "error", () => {alert('抱歉定位失败')}); //返回定位出错信息
    });

    const that = this;
    // eslint-disable-next-line no-undef
    AMap.event.addListener(mapObj, "click", function(e) {
      that.$API.getNowLocation(e.lnglat.lng + "," + e.lnglat.lat).then(data => {
          that.address.address = data.data.regeocode.pois[0].name
          that.address.latitude = e.lnglat.lat//维度
          that.address.longitude = e.lnglat.lng //经度
        that.address =that.$store.state.home.address? Object.assign(that.$store.state.home.address,that.address): that.address
        that.setAddress(that.address)
        that.close()
      });
    });
  },
  methods: {
    ...mapMutations(['setAddress']),
      close(){
          this.$router.go(-1)
      }
  }
};
</script>
<style scoped lang="stylus">
.map
    position relative
    height 100%
    .icon
        position absolute
        top .266667rem /* 20/75 */
        left .266667rem /* 20/75 */
        z-index 10
        font-size .666667rem /* 50/75 */
        color rgba(157,157,157,0.9)
    #mapContainer
        height 100%
        width 100%
</style>
