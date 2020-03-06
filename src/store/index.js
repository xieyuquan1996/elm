import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        seller: {},
        food: {},
        sellFood: {},
        isFavorite: false,
        loading: 0,
        goods: [],
        ratings: []
    },
    mutations: {
        setRatings(state, val) {
            state.ratings = val
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
            state.sellFood = val
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