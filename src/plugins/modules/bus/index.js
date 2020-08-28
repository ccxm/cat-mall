const Bus = {
    install(Vue) {
        Vue.prototype.$bus = new Vue()
    }
}

export default Bus
