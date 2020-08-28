import Vue from 'vue'
import Vuex from 'vuex'
import routerList from '../router/routerList'
import dataStore from '@utils/dataStore'

const defaultRouter = {
    path: '/',
    name: '宠物列表',
    query: {}
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routerList: [routerList['/'], defaultRouter],
        userInfo: {},
        goodsInfoList: [],
        goodsLikeList: []
    },
    mutations: {
        changeRouter(state, list) {
            state.routerList = list
            console.log(list)
        },
        saveUserInfo(state, data) {
            // 用了微信的setData，这样子设置值的时候不必再传整个对象进来
            // 没有数据时则是清空对象
            if (!data) {
                state.userInfo = {}
            } else {
                state.userInfo = {
                    ...state.userInfo,
                    ...data
                }
            }
            dataStore.saveUserInfo(state.userInfo)
        },
        setGoodsInfoList(state, goodsInfoList) {
            state.goodsInfoList = goodsInfoList
        },
        setGoodsLikeList(state, goodsLikeList) {
            state.goodsLikeList = goodsLikeList
        }
    },
    getters: {
        getRouters: state => {
            return state.routerList
        },
        getUserInfo: state => {
            return state.userInfo
        },
        getGoodsInfoList: state => {
            return state.goodsInfoList
        },
        getGoodsLikeList: state => {
            return state.goodsLikeList
        }
    },
    actions: {
        changeRouter(context, params) {
            let arr = this.state.routerList
            if (arr[1].path === '/') {
                arr[1] = routerList[params.to]
            } else {
                let isExit = false
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].path === params.to) {
                        isExit = true
                        arr.splice(i + 1, arr.length - i)
                        break
                    }
                }
                if (!isExit) {
                    console.log(routerList[params.to])
                    arr.push(routerList[params.to])
                }
            }
            if (params.to === '/') {
                arr = [routerList['/'], defaultRouter]
            }
            routerList[params.to].fullPath = params.fullPath
            context.commit('changeRouter', arr)
        },
        saveUserInfo(context, data) {
            context.commit('saveUserInfo', data)
        },
        setGoodsInfoList(context, goodsInfoList) {
            context.commit('setGoodsInfoList', goodsInfoList)
        },
        setGoodsLikeList(context, goodsLikeList) {
            context.commit('setGoodsLikeList', goodsLikeList)
        }
    }
})
