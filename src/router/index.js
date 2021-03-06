import Vue from 'vue'
import VueRouter from 'vue-router'
import { getLocalStorage } from '../serve/localstorage'

import store from '../store/index'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
},
{
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
},
{
    path: '/search',
    name: 'search',
    component: () => import('../views/Search/Search.vue')
},
{
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue')
},
{
    path: "/map",
    name: 'map',
    component: () =>
        import('../views/Map/Map.vue')
},
{
    path: "/location",
    name: 'location',
    component: () =>
        import('../views/location/Location.vue')
},
{
    path: "/contact",
    name: 'contact',
    component: () =>
        import('../views/contact/Contact.vue')
},
{
    path: "/order",
    name: 'order',
    component: () =>
        import('../views/order/Order.vue')
},
{
    path: "/home",
    name: 'home',
    component: () =>
        import('../views/home/Home.vue')
},
{
    path: '/info',
    name: 'info',
    component: () =>
        import('../views/info/Info.vue')
},
{
    path: '/address',
    name: 'address',
    component: () =>
        import('../views/address/Address.vue')
},
{
    path: '/seckill',
    name: 'seckill',
    component: () =>
        import('../views/seckill/SecKill.vue')
},
{
    path: '/seckillInfo',
    name: 'seckillInfo',
    component: () =>
        import('../views/seckill-info/SeckillInfo.vue')
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_UR,
    routes
})



router.beforeEach((to, from, next) => {
    if (to.name == 'login') {
        const token = store.token || getLocalStorage('token')
        if (token) {
            next({
                path: '/home',
            })
        }
        next()
    } else {
        next()
    }

})

export default router