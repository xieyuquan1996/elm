import Vue from 'vue'
import Vuex from 'vuex'

import my from './modules/my'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: 0
    },
    mutations: {
        setLoading(state, val) {
            state.loading += val
        }
    },
    actions: {},
    modules: {
        my,
        home
    }
})