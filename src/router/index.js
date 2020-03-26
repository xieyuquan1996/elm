import Vue from 'vue'
import VueRouter from 'vue-router'
import {getLocalStorage} from '../serve/localstorage'

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
        path: '/index',
        name: 'index',
        component: () =>
            import ('../views/Index.vue'),
        children: [{
                path: '/goods',
                name: 'Goods',
                component: () =>
                    import ('../views/Goods/Goods.vue')
            },
            {
                path: '/ratings',
                name: 'Ratings',
                component: () =>
                    import ('../views/Ratings/Ratings.vue')
            },
            {
                path: '/seller',
                name: 'Seller',
                component: () =>
                    import ('../views/Seller/Seller.vue')
            },
        ]
    },
    {
        path: "/map",
        name: 'map',
        component: () =>
            import ('../views/Map/Map.vue')
    },
    {
        path: "/location",
        name: 'location',
        component: () =>
            import ('../views/location/Location.vue')
    },
    {
        path: "/contact",
        name: 'contact',
        component: () =>
            import ('../views/contact/Contact.vue')
    },
    {
        path: "/order",
        name: 'order',
        component: () =>
            import ('../views/order/Order.vue')
    },
    {
        path: "/home",
        name: 'home',
        component: () =>
            import ('../views/home/Home.vue')
    },
    {
        path: '/info',
        name: 'Info',
        component: () =>
            import ('../views/info/Info.vue')
    },
    {
        path: '/address',
        name: 'address',
        component: () =>
            import ('../views/address/Address.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_UR,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.name == 'login'){
        // 记录跳转前的路由，这是为了登录后，可以跳转回原来的页面
        store.commit('setPreRouter', from)
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