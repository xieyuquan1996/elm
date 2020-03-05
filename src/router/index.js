import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
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
        path: '/info',
        name: 'Info',
        component: () =>
            import ('../views/info/Info.vue')
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

export default router