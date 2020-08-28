/**
 * 扩展原型链函数
 */
/* eslint-disable */

// 下划线转驼峰
String.prototype.toHump = function() {
    return this.replace(/_(\w)/g, function(all, letter) {
        return letter.toUpperCase()
    })
}

// 驼峰转换下划线
String.prototype.thLine = function() {
    return this.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 数字前面加0
String.prototype.addZero = function() {
    if (parseInt(this) >= 10) {
        return this
    }
    return '0' + this
}

// 字符串数字转数字
String.prototype.toNumber = function() {
    return parseInt(this)
}

Object.deepCopy = function(obj) {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 格式化时间
 * @return {string}
 */
Date.prototype.format = function() {
    const dateArr = [], timeArr = []
    dateArr.push(this.getFullYear())
    dateArr.push((this.getMonth() + 1).toString().addZero())
    dateArr.push(this.getDate().toString().addZero())
    timeArr.push(this.getHours().toString().addZero())
    timeArr.push(this.getMinutes().toString().addZero())
    timeArr.push(this.getSeconds().toString().addZero())
    return `${dateArr.join('-')} ${timeArr.join(':')}`
}

// 返回中文时间
Date.prototype.localFormat = function() {
    const format = this.format()
    const str = format.replace(/-/, '年')
        .replace(/-/, '月')
        .replace(/ /, '日 ')
        .replace(/:/, '时')
        .replace(/:/, '分')
    return str + '秒'
}

// 防抖
Function.prototype.debounce = function(wait) {
    const func = this
    let timer
    return function() {
        const context = this // 这边的 this 指向谁?
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            func.apply(context, arguments)
        }, wait)
    }
}

// 节流
Function.prototype.throttle = function(wait) {
    const func = this
    let previous = 0
    return function() {
        const now = Date.now()
        const context = this
        if (now - previous > wait) {
            func.apply(context, arguments)
            previous = now
        }
    }
}
