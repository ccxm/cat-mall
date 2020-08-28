import Vue from 'vue'
import Router from 'vue-router'
import home from '@pages/home/index.vue'
import cart from '@pages/cart/index'
import detail from '@pages/detail/index'
import my from '@pages/my/index'
import order from '@pages/order/index'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/cart',
            name: 'cart',
            component: cart
        },
        {
            path: '/detail',
            name: 'detail',
            component: detail
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/my',
            name: 'my',
            component: my
        }
    ]
})
