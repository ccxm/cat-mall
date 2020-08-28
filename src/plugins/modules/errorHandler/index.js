/**
 * 全集异常拦截
 */
// 系统错误捕获
const errorHandler = (error) => {
    console.log('\n')
    console.group('%c%s', 'color:#FF5555', '全局异常')
    console.error(error)
    console.groupEnd()
    console.log('\n')
}

const ErrorHandler = {
    install(Vue) {
        Vue.config.errorHandler = errorHandler
        Vue.prototype.$throw = (error) => errorHandler(error, this)
    }
}

export default ErrorHandler
