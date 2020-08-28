import axios from 'axios'
import { BASE_URL, SUCCESS_CODE, EMPTY_PARAM_CODE, INVALID_PARAM_CODE, TIMEOUT } from '@/config'
import { emptyParam, invalidParam, error as errorTip } from './../tips/tips'
import dataStore from '@utils/dataStore'
import Vue from '@/main'
import qs from 'qs'

// 不拦截的路由列表
const unLessList = [
    '/user/goods-like-list'
]

const httpInstance = axios.create({
    timeout: TIMEOUT,
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json;charset=UTF-8'
    }
})

const deepCopy = json => JSON.parse(JSON.stringify(json))

httpInstance.interceptors.request.use(config => {
    config.headers['Authorization'] = dataStore.getToken() || ''
    return config
}, error => {
    console.log(error)
})

httpInstance.interceptors.response.use(response => {
    // data里面的数据要解析，而params里的则不用
    const reqData = response.config.method === 'get' ? response.config.params : response.config.data
    const resData = response.data
    // 打印请求相关日志
    console.log('\n')
    console.group(`请求url:  ${response.config.url}`)
    console.log('响应报文：', resData)
    console.log('请求参数：', typeof reqData === 'string' ? qs.parse(reqData) : reqData || null)
    console.log('响应数据：', deepCopy(resData.data || null))
    console.groupEnd()
    console.log('\n')
    if (response.status === 200) {
        // if(unLessList.includes(response.config.url)) {
        //     return response
        // }
        if (resData.code === SUCCESS_CODE) {
            return resData.data
        }
        switch (resData.code) {
            case EMPTY_PARAM_CODE:
                emptyParam(resData.data.detail)
                break
            case INVALID_PARAM_CODE:
                invalidParam(resData.data.detail)
                break
            default:
                errorTip(resData.msg)
        }
        return Promise.reject(resData)
    }
    return response.data
}, error => {
    const response = error.response
    const unknownErrorReg = /^4/ // 400开头的错误
    const serverErrorReg = /^5/ // 500开头的错误，服务器错误
    if (error.code === 'ECONNABORTED') {
        errorTip('请求超时')
        return Promise.reject(error)
    }
    if (!response) {
        return Promise.reject(error)
    }
    if (unLessList.includes(response.config.url)) {
        return Promise.reject(response)
    }
    // 没有权限
    if (response.status === 401) {
        if (unLessList.includes(response.config.url)) {
            return Promise.reject(response.data)
        }
        errorTip('您还未登录或登录已过期，请重新登录')
        if (Vue.$route.path !== '/') {
            Vue.$router.replace('/')
        }
        dataStore.deleteToken()
        return Promise.reject(response.data)
    }
    if (response.status === 404) {
        errorTip('请求资源或接口不存在，请检查')
        return Promise.reject(response.data)
    }
    if (unknownErrorReg.test(response.status.toString())) {
        errorTip('服务器发生未知错误')
        return Promise.reject(response.data)
    }
    if (serverErrorReg.test(response.status.toString())) {
        errorTip('服务器异常或错误，请稍后重试')
        return Promise.reject(response.data)
    }
    return Promise.reject(response.data)
})

export default httpInstance
