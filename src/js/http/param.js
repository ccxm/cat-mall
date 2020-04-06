/**
 * 请求参数列表
 * 用object.seal来约束请求参数
 * 防止在代码中对请求参数添加其他数据
 * 请求参数以p开头
 * 即params的意思
 */

export const pLogin = Object.seal({
    email: '',
    password: ''
})

export const pRegister = Object.seal({
    email: '',
    password: '',
    verifyCode: ''
})

export const pGetVerifyCode = Object.seal({
    email: ''
})

export const pResetPassword = Object.seal({
    email: '',
    password: '',
    verifyCode: ''
})

export const pCheckFieldCanUse = Object.seal({
    field: '',
    value: ''
})

export const pUpdateUserInfo = Object.seal({
    nickName: '',
    gender: 0, // 0：男，1：女
    avatarUrl: ''
})

export const pAddAddress = {
    name: '',
    phone: '',
    detailedAddress: '',
    completedAddress: '',
    regionList: [],
    addressTable: {
        province: {
            value: '',
            label: ''
        },
        city: {
            value: '',
            label: ''
        },
        area: {
            value: '',
            label: ''
        }
    }
}

export const pDeleteAddress = Object.seal({
    addressId: ''
})

export const pGetGoodsList = Object.seal({
    priceRange: "ALL",
    currentPage: 0,
    pagingSize: 6,
    sortType: "ASC"
})

export const pGetGoodsDetail = Object.seal({
    goodsId: ''
})

export const pGetMoreGoods = Object.seal({
    maxLength: 6
})

export const pCreateOrder = Object.seal({
    addressId: '',
    orderList: []
})

export const pCreateOrderItem = Object.seal({
    goodsId: '',
    purchaseNum: 0
})

export const pGetGoodsInfoList = Object.seal({
    goodsIdList: []
})

export const pPayForOrder = Object.seal({
    orderId: '',
    paykey: ''
})

export const pAddToCart = Object.seal({
    goodsId: '',
    goodsNum: null
})

export const pUpdateCart = Object.seal({
    goodsId: '',
    goodsNum: null
})

export const pDeleteFromCart = Object.seal(({
    goodsId: ''
}))

export const pBatchGoodsInfo = Object.seal({
    goodsIdList: []
})

export const pGetCartList = Object.seal({
    pageSize: 6,
    curPage: 0
})

export const pLikeForGoods = Object.seal({
    goodsId: ''
})

// 短评
export const pGetBriefList = Object.seal({
    goodsId: '',
})

export const pWriteBrief = Object.seal({
    goodsId: '',
    brief: '',
    color: ''
})

export const pLikeForBrief = Object.seal({
    goodsId: '',
    briefId: '',
})


export const pGetCommentList = Object.seal({
    goodsId: '',
    pageSize: null,
    curPage: null
})

export const pWriteComment = Object.seal({
    goodsId: '',
    comment: '',
    rate: null
})

export const pLikeForComment = Object.seal({
    goodsId: '',
    commentId: '',
    commentListId: '',
    likeState: null
})

export const pGetOrderList = Object.seal({
    currentPage: 0,
    pageSize: 6
})

export const pDeleteOrder = Object.seal({
    orderId: ''
})

export const pRecharge = Object.seal({
    rechargeKey: '',
    verifyCode: ''
})

export const pUpdatePaykey = Object.seal({
    email: '',
    paykey: '',
    verifyCode: ''
})
