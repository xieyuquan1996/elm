import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        address: {},
        preRouter: {},
        token: '',
        shopId: 26,
        seller: {},
        food: {},
        sellFood: {},
        isFavorite: false,
        loading: 0,
        goods: []
    },
    mutations: {
        setAddress(state, val){
            state.address = val
        },
        setPreRouter(state, val){
            state.preRouter = val
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
        setLoading(state, val) {
            state.loading += val
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
            Vue.set(state.sellFood,state.seller.shopId,val)
        },
        setDeliveryPrice(state, val) {
            state.deliveryPrice = val
        },
        setMinPrice(state, val) {
            state.minPrice = val
        }
    },
    actions: {},
    modules: {}
})