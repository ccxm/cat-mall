import api from '@api/index'

const Api = {
    install(Vue) {
        Vue.prototype.$api = api
    }
}

export default Api
