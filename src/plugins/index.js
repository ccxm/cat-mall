/**
 * 注册Vue插件
 */
// 插件引入
import './modules/utils' // 注入工具函数
import Filters from '@/plugins/modules/filters'
import Element from '@/plugins/modules/element'
import Tips from '@/plugins/modules/tips'
import Api from '@/plugins/modules/api'
import InfiniteScroll from '@/plugins/modules/infiniteScroll'
import Bus from '@/plugins/modules/bus'
import ErrorHandler from '@/plugins/modules/errorHandler'
import LazyLoad from '@/plugins/modules/lazyLoad'
// 插件注册
const InstallPlugins = {
    install(Vue) {
        Vue.use(Filters)
        Vue.use(Element)
        Vue.use(Tips)
        Vue.use(Api)
        Vue.use(InfiniteScroll)
        Vue.use(Bus)
        Vue.use(ErrorHandler)
        Vue.use(LazyLoad)
    }
}

export default InstallPlugins
