import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import cart from './views/cart'
import detail from './views/detail'
import my from './views/my'
import order from './views/order'

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
