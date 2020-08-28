import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import InstallPlugins from './plugins'

Vue.use(InstallPlugins) // 注册插件
Vue.config.productionTip = false

const vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default vue
