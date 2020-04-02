import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from '@/store'

//引入高德地图
//import './common/js/map.js'

import './common/stylus/index.styl'

import API from './serve/api'

Vue.prototype.$API = API

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')