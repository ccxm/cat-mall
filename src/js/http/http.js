import httpInstance from './base'
import { tipType } from './../const-table'
import { tCommon } from './../tips'

const extendOptions = Object.seal({
    showTip: false,
    tipMsg: '',
    tipType: tipType.SUCCESS
})

export const get = (url, params, configOptions = null) => {
    return new Promise((resolve, reject) => {
        httpInstance.get(url, {
            params
        }).then(res => {
            resolve(res)
            if (configOptions) {
                _executeExtend(configOptions)
            }
        }).catch(reject)
    })
}

export const post = (url, params, configOptions = null) => {
    return new Promise((resolve, reject) => {
        httpInstance.post(url, params).then(res => {
            resolve(res)
            if (configOptions) {
                _executeExtend(configOptions)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export const put = (url, params, configOptions = null) => {
    return new Promise((resolve, reject) => {
        httpInstance.put(url, params).then(res => {
            resolve(res)
            if (configOptions) {
                _executeExtend(configOptions)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export const del = (url, params, configOptions = null) => {
    return new Promise((resolve, reject) => {
        httpInstance.delete(url, {
            data: params
        }).then(res => {
                resolve(res)
            if (configOptions) {
                _executeExtend(configOptions)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 合并扩展数据
 * @param configOptions // 请求的扩展选项，合并了就相当于赋值默认参数
 * @returns {{}}
 * @private
 */
const _mergeExtendOptions = (configOptions) => {
    const temp = {}
    for (let key in extendOptions) {
        temp[key] = configOptions[key] || extendOptions[key]
    }
    return temp
}

const _executeExtend = (configOptions) => {
    configOptions = _mergeExtendOptions(configOptions)
    console.log(configOptions)
    if (configOptions.showTip) {
        tCommon(configOptions.tipMsg, configOptions.tipType)
    }
}

export default {
    get,
    post,
    put,
    del
}
