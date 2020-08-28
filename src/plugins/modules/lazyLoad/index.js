import VueLazyLoad from 'vue-lazyload'

const LazyLoad = {
    install(Vue) {
        Vue.use(VueLazyLoad, {
            // loading: require('@/assets/loading-svg/loading.svg')
        })
    }
}

export default LazyLoad
