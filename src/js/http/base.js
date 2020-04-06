import axios from 'axios'
import { HTTP_CONFIG } from './config'
import { tEmptyParam, tInvalidParam, tErrorTip } from '../tips'
import dataStore from '../data-store'
import Vue from './../../main'

// 不拦截的路由列表
const unLessList = [
    '/user/goods-like-list'
]

const httpInstance = axios.create({
    timeout: 10 * 1000,
    baseURL: HTTP_CONFIG.BASE_URL,
    headers: {
        'content-type': 'application/json;charset=UTF-8'
    }
})

httpInstance.interceptors.request.use(config => {
    console.log({
        url: config.url,
        data: config.data || config.params
    })
    config.headers['Authorization'] = dataStore.getToken() || ''
    return config
}, error => {
    console.log(error)
})

httpInstance.interceptors.response.use(response => {
    // data里面的数据要解析，而params里的则不用
    const reqData = JSON.parse(response.config.data || null) || response.config.params
    const resData = response.data
    console.log({
        url: response.config.url,
        req: reqData,
        res: response.data,
        resDetail: resData.data
    })
    console.log(response.status)
    if (response.status === 200) {
        console.log(resData)
        if (resData.code === HTTP_CONFIG.SUCCESS_CODE) {
            return resData.data
        }
        switch (resData.code) {
            case HTTP_CONFIG.EMPTY_PARAM_CODE:
                tEmptyParam(resData.data.detail)
                break
            case HTTP_CONFIG.INVALID_PARAM_CODE:
                tInvalidParam(resData.data.detail)
                break
            default:
                tErrorTip(resData.msg)
        }
        return Promise.reject(resData)
    }
    return response.data
}, error => {
    console.log(error.response)
    const response = error.response
    if (response.status === 401) {
        console.log(unLessList.includes(response.config.url))
        if(unLessList.includes(response.config.url)) {
            console.log('存在')
            return Promise.reject(response.data)
        }
        tErrorTip('您还未登录或登录已过期，请重新登录')
        if(Vue.$route.path !== '/') {
            Vue.$router.replace('/')
        }
        // console.log('token已过期，请重新登录')
        dataStore.deleteToken()
        return Promise.reject(response.data)
    }
})

export default httpInstance
