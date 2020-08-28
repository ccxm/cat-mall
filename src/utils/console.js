/**
 * 重写console.log方法
 * 通过设置isLog来控制是否输出日志
 * 对于object,array引用类型已进行深拷贝，确保打印出的值是执行时的值
 * 重写后在整个程序的生命周期都有效，在程序的所有地方都可以调用
 * 可在程序的第一行就调用，确保后续的console.log改写后的
 * 如：vue在main.js中引入，小程序可在app.js第一行引入
 * dev: isLog = true
 * prod: isLog = false
 * console.trace()为打印程序调用的堆栈，因为改写后打印的值是在改写后的堆栈中
 * 如果觉得太长可设置isLogStack = false
 */

const getStackTrace = function() {
    var obj = {}
    Error.captureStackTrace(obj, getStackTrace)
    let stackArr = obj.stack.split('\n')
    let str = stackArr[2]
    // 数组分割后，第二个堆栈才是console,log调用的堆栈
    // str =
    // try {
    //   // 判断是否是浏览器环境
    //   if (window) {
    //     str = stackArr[2].substring(stackArr[2].indexOf('http://'), stackArr[2].length)
    //   }
    // }catch (e) {
    //   // 非浏览器环境，即为node.js环境
    //   str = stackArr[2].substring(stackArr[2].indexOf('('), stackArr[2].indexOf(')'))
    // }
    // str = str.replace('(','').replace(')','')
    return 'Stack: ' + str
}

console.log = ((logFunc, isLog = true, isLogStack = true) => {
    return function() {
        if (!isLog) {
            return
        }
        try {
            let arr = []
            arr.push(...arguments)
            arr.forEach((item, index) => {
                // 引用类型深拷贝
                if (Object.prototype.toString.call(item) === '[object Object]' ||
                    Object.prototype.toString.call(item) === '[object Array]') {
                    arr[index] = JSON.parse(JSON.stringify(item))
                }
            })
            logFunc.call(console, ...arr)
            logFunc.call(console, getStackTrace())
        } catch (e) {
            console.error(`a log error: ${e}`)
        }
    }
})(console.log)
