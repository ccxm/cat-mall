import httpInstance from './base'
import { TIP_TYPE } from '@/config/constant'
import { common as commonTip, error, loading } from './../tips/tips'
import qs from 'qs'
import Vue from '@/main'

const extendOptions = () => {
    return {
        showTip: false,
        tipMsg: '',
        isAutoThrow: true, // 是否自动抛异常
        tipType: TIP_TYPE.SUCCESS,
        isSerializerParams: false,
        isShowLoading: false,
        loadingText: '加载中',
        loadingSuccessText: '加载成功'
    }
}

const paramsSerializer = params => {
    return qs.stringify(params, { arrayFormat: 'indices' })
}

export const get = (url, params, {
    showTip = false,
    tipMsg = '',
    isAutoThrow = true, // 是否自动抛异常
    tipType = 'success',
    isSerializerParams = false,
    isShowLoading = false,
    loadingText = '加载中',
    loadingSuccessText = ''
} = {}) => {
    const configOptions = {
        showTip,
        tipMsg,
        tipType,
        isAutoThrow,
        isSerializerParams,
        isShowLoading,
        loadingText,
        loadingSuccessText
    }
    const loadingInstance = _executeLoading(configOptions)
    return new Promise((resolve, reject) => {
        httpInstance.get(url, {
            params,
            // 参数序列化，使之也能传递json格式
            paramsSerializer: configOptions.isSerializerParams ? paramsSerializer : null
        }).then(res => {
            resolve(res)
            _executeExtend(configOptions)
            _hideLoading(loadingInstance, configOptions)
        }).catch(err => {
            Vue.$throw(err)
            if (!configOptions.isAutoThrow) {
                reject(err)
            }
            _hideLoading(loadingInstance, configOptions, false)
        })
    })
}

export const post = (url, params, {
    showTip = false,
    tipMsg = '',
    isAutoThrow = true, // 是否自动抛异常
    tipType = 'success',
    isSerializerParams = false,
    isShowLoading = false,
    loadingText = '加载中',
    loadingSuccessText = ''
} = {}) => {
    const configOptions = {
        showTip,
        tipMsg,
        tipType,
        isAutoThrow,
        isSerializerParams,
        isShowLoading,
        loadingText,
        loadingSuccessText
    }
    const loadingInstance = _executeLoading(configOptions)
    return new Promise((resolve, reject) => {
        httpInstance.post(url, params).then(res => {
            resolve(res)
            _executeExtend(configOptions)
            _hideLoading(loadingInstance, configOptions)
        }).catch(err => {
            Vue.$throw(err)
            if (!configOptions.isAutoThrow) {
                reject(err)
            }
            _hideLoading(loadingInstance, configOptions, false)
        })
    })
}

export const put = (url, params, configOptions = {}) => {
    configOptions = _mergeExtendOptions(configOptions)
    return new Promise((resolve, reject) => {
        httpInstance.put(url, params).then(res => {
            resolve(res)
            _executeExtend(configOptions)
        }).catch(err => {
            Vue.$throw(err)
            if (!configOptions.isAutoThrow) {
                reject(err)
            }
        })
    })
}

export const del = (url, params, configOptions = {}) => {
    return new Promise((resolve, reject) => {
        httpInstance.delete(url, {
            data: params
        }).then(res => {
            resolve(res)
            _executeExtend(configOptions)
        }).catch(err => {
            Vue.$throw(err)
            if (!configOptions.isAutoThrow) {
                reject(err)
            }
        })
    })
}

export const download = (url, params, {
    showTip = false,
    tipMsg = '',
    isAutoThrow = true, // 是否自动抛异常
    tipType = 'success',
    isSerializerParams = false,
    isShowLoading = false,
    loadingText = '加载中',
    loadingSuccessText = ''
} = {}) => {
    const configOptions = {
        showTip,
        tipMsg,
        tipType,
        isAutoThrow,
        isSerializerParams,
        isShowLoading,
        loadingText,
        loadingSuccessText
    }
    const loadingInstance = _executeLoading(configOptions)
    return new Promise((resolve, reject) => {
        httpInstance.post(url, qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            responseType: 'arraybuffer'
        }).then(res => {
            _executeExtend(configOptions)
            _downloadFile(res)
            _hideLoading(loadingInstance, configOptions)
            resolve(res)
        }).catch(err => {
            // const errorMsg = decodeURIComponent(err.headers.excel_error_msg)
            const errorMsg = '无数据导出！'
            error(errorMsg)
            Vue.$throw(err)
            if (!configOptions.isAutoThrow) {
                reject(err)
            }
            _hideLoading(loadingInstance, configOptions, false)
        })
    })
}

export const upload = (url, {
    name = 'file',
    file = '',
    formData = {}
} = {}, {
    showTip = false,
    tipMsg = '',
    isAutoThrow = true, // 是否自动抛异常
    tipType = 'success',
    isSerializerParams = false,
    isShowLoading = false,
    loadingText = '上传中',
    loadingSuccessText = '上传成功'
} = {}) => {
    const configOptions = {
        showTip,
        tipMsg,
        tipType,
        isAutoThrow,
        isSerializerParams,
        isShowLoading,
        loadingText,
        loadingSuccessText
    }
    const loadingInstance = _executeLoading(configOptions)
    const params = new FormData()
    params.append(name, file)
    _structureFormData(params, formData)
    return new Promise((resolve, reject) => {
        httpInstance.post(url, params, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(res)
            _executeExtend(configOptions)
            _hideLoading(loadingInstance, configOptions)
        }).catch(err => {
            Vue.$throw(err)
            if (!configOptions.isAutoThrow) {
                reject(err)
            }
            _hideLoading(loadingInstance, configOptions, false)
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
    const target = extendOptions()
    return Object.assign(target, configOptions)
}

// 执行扩展函数
const _executeExtend = (configOptions) => {
    if (configOptions.showTip) {
        commonTip(configOptions.tipMsg, configOptions.tipType)
    }
    return configOptions
}

const _executeLoading = (configOptions) => {
    if (configOptions.isShowLoading) {
        return loading(configOptions.loadingText)
    }
    return null
}

const _hideLoading = (loadingInstance, configOptions, isSuccess = true) => {
    if (loadingInstance) {
        if (!isSuccess) {
            loadingInstance.close()
            return
        }
        loadingInstance.iconClass = 'el-icon-circle-check'
        if (!configOptions.loadingSuccessText) {
            configOptions.loadingSuccessText = configOptions.loadingText.substring(0, configOptions.loadingText.length - 1) + '成功'
        }
        loadingInstance.message = configOptions.loadingSuccessText
        setTimeout(() => {
            loadingInstance.close()
        }, 300)
    }
}

const _downloadFile = (res) => {
    const blob = new Blob([res.data])
    const url = URL.createObjectURL(blob)
    const disposition = res.headers['content-disposition']
    let fileName = disposition.replace(/^attachment;filename=/, '')
    fileName = decodeURI(fileName)
    // 生成一个a标签
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    // 生成时间戳
    link.download = fileName
    document.body.appendChild(link)
    link.click()
}

// 构造formData
const _structureFormData = (formData, sourceData) => {
    for (let key in sourceData) {
        formData.append(key, sourceData[key])
    }
}

// 处理form请求格式的对象数组
// const _dealWithJsonArray = (objKey,arr = [{}]) => {
//     const formArr = {}
//     if(Object.prototype.toString.call(arr[0]) === "[object Object]") {
//         arr.forEach((item,index) => {
//             for(let key in item) {
//                 formArr[`${objKey}[${index}].${key}`] = item[key]
//             }
//         })
//     }
//     return formArr
// }
