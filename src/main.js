import Vue from 'vue'
import App from './App.vue'
import './js/prototype'
import router from './router'
// import './js/console'
import store from './store'
import './assets/scss/css/font-awesome.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/public.scss'
import './js/resize'
import axios from 'axios'
import {
    formatMoney,
    formatLikeNum,
    formatString,
    formatDate,
    formatNickName,
    addImagePrefix
} from './js/filters.js'
import api from './js/http/api'
import tips from './js/tips'
import tokenInstance from './js/data-store'
const infiniteScroll = require('vue-infinite-scroll')

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$tips = tips
Vue.prototype.bus = new Vue()
Vue.use(ElementUI)
Vue.filter('formatMoney', formatMoney)
Vue.filter('formatLikeNum', formatLikeNum)
Vue.filter('formatString', formatString)
Vue.filter('formatDate', formatDate)
Vue.filter('formatNickName', formatNickName)
Vue.filter('addImagePrefix', addImagePrefix)
Vue.use(infiniteScroll)

const vue = new Vue({
    router,
    store,
    // 监听路由的变化，有变化就加入path数组里面
    watch: {
        $route(to, from) {
            console.log(to.path, from.path)
            console.log(this.$route)
            store.dispatch('changeRouter', {
                to: to.path,
                from: from.path,
                fullPath: this.$route.fullPath
            })
        }
    },
    methods: {
        getCartList() {
            this.$api.getCartLength().then(res => {
                this.$store.dispatch('saveUserInfo', {...res})
            }).catch(err => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.$store.dispatch('saveUserInfo', tokenInstance.getUserInfo())
        this.getCartList()
        this.bus.$on('updateCartLength', () => {
            this.getCartList()
        })
    },
    render: h => h(App)
}).$mount('#app')

export default vue
