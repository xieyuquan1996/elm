import Vue from 'vue'

const state = {
  showData: '',
  city: '北京',
  address: {},
  token: '',
  shopId: 26,
  seller: {},
  food: {},
  sellFood: {},
  isFavorite: false,
  goods: []
}
const mutations = {
  setShowData(state, val) {
    state.showData = val
  },
  setCity(state, val) {
    state.city = val
  },
  setAddress(state, val) {
    state.address = val
  },
  setToken(state, val) {
    state.token = val
  },
  setShopId(state, val) {
    state.shopId = val
  },
  setGoods(state, val) {
    state.goods = val
  },
  setIsFavorite(state, val) {
    state.isFavorite = val
  },
  setSeller(state, val) {
    state.seller = val
  },
  setFood(state, val) {
    state.food = val
  },
  setSellFood(state, val) {
    Vue.set(state.sellFood, val.shopId, val.sellFood)
  },
  setDeliveryPrice(state, val) {
    state.deliveryPrice = val
  },
  setMinPrice(state, val) {
    state.minPrice = val
  }
}
const actions = {
  setShowData({ commit }, val) {
    commit('setShowData', val)
    setTimeout(() => {
      commit('setShowData', '')
    }, 2000)
  },
  setLocation({ commit, dispatch }) {
    // eslint-disable-next-line no-undef
    new AMap.Map("iCenter").plugin("AMap.Geolocation", function () {
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
      geolocation.getCurrentPosition();
      // eslint-disable-next-line no-undef
      AMap.event.addListener(geolocation, "complete", data => {
        const address = {
          latitude: data.position.lat,
          longitude: data.position.lng,
          address: data.addressComponent.neighborhood
        }
        commit('setAddress', address)
        const city = data.addressComponent.city == '' ? data.addressComponent.province : data.addressComponent.city
        commit('setCity', city)
      }); //返回定位信息
      // eslint-disable-next-line no-undef
      AMap.event.addListener(geolocation, "error", () => {
        dispatch('setShowData', "抱歉定位失败");
      }); //返回定位出错信息
    });
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}