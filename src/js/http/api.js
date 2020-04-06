import {get, post, put, del} from './http'

const login = params => post('/user/login', params, {
    showTip: true,
    tipMsg: '登录成功'
})

const register = params => post('/user/register', params, {
    showTip: true,
    tipMsg: '注册成功，请重新登录'
})

const getVerifyCode = params => post('/public/get-verify-code', params)

const resetPassword = params => post('/user/reset-password', params, {
    showTip: true,
    tipMsg: '修改密码成功'
})

const checkFieldCanUse = params => post('/user/check-field-can-use', params)

const updateUserInfo = params => post('/user/update-user-info', params, {
    showTip: true,
    tipMsg: '更新资料成功'
})

const addAddress = params => post('/user/address', params, {
    showTip: true,
    tipMsg: '新增地址成功'
})

const getAddress = () => get('/user/address')

const updateAddress = params => put('/user/address', params, {
    showTip: true,
    tipMsg: '修改地址成功'
})

const deleteAddress = params => del('/user/address', params, {
    showTip: true,
    tipMsg: '删除地址成功'
})

const getGoodsList = params => get('/goods/goods-list', params)

const getGoodsDetail = params => get('/goods/goods-detail', params)

const getMoreGoods = params => get('/goods/get-more-goods-list', params)

const createOrder = params => post('/order/create-order', params)

const payForOrder = params => post('/order/pay-for-order', params)

const getGoodsInfoList = params => get('/goods/goods-info-list', params)

const getBalance = () => get('/account/balance')

const getOrderList = params => get('order/order-list', params)

const getCartList = params => get('/cart/cart', params)

const addToCart = params => post('/cart/cart', params)

const updateCart = params => put('/cart/cart', params)

const deleteFromCart = params => del('/cart/cart', params, {
    showTip: true,
    tipMsg: '删除购物车成功'
})

// 批量获取商品信息
const batchGetGoodsInfo = params => get('/goods/goods-info-list', params)

const getGoodsLikeList = () => get('/user/goods-like-list')

// 给商店点赞
const likeForGoods = params => post('/user/goods-like', params)

// 短评
const getBriefList = params => get('/comment/brief-list', params)

const writeBrief = params => post('/comment/write-brief', params)

const likeForBrief = params => post('/comment/like-for-brief', params)

// 评论
const getCommentList = params => get('/comment/comment-list', params)

const writeComment = params => post('/comment/write-comment', params, {
    showTip: true,
    tipMsg: '评论成功'
})

const likeForComment = params => post('/comment/like-for-comment', params)

const getCommentLikeList = () => get('/user/comment-like-list')

const deleteOrder = params => del('/order/order', params,{
    showTip: true,
    tipMsg: '删除订单成功'
})

const getRechargeList = () => get('/account/recharge-list')

const recharge = params => put('/account/recharge', params, {
    showTip: true,
    tipMsg: '充值成功'
})

const checkHasPaykey = () => get('/account/check-has-paykey')

const updatePaykey = params => put('/account/paykey', params, {
    showTip: true,
    tipMsg: '设置支付密码成功'
})

const getCartLength = () => get('/cart/cart-length')

export default {
    login,
    register,
    getVerifyCode,
    resetPassword,
    checkFieldCanUse,
    updateUserInfo,
    addAddress,
    getAddress,
    updateAddress,
    deleteAddress,
    getGoodsList,
    getGoodsDetail,
    getMoreGoods,
    createOrder,
    getGoodsInfoList,
    payForOrder,
    getBalance,
    getOrderList,
    getCartList,
    addToCart,
    updateCart,
    deleteFromCart,
    batchGetGoodsInfo,
    getGoodsLikeList,
    likeForGoods,
    getBriefList,
    writeBrief,
    likeForBrief,
    getCommentList,
    writeComment,
    likeForComment,
    getCommentLikeList,
    deleteOrder,
    getRechargeList,
    recharge,
    checkHasPaykey,
    updatePaykey,
    getCartLength
}

