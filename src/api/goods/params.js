export const pGetGoodsList = Object.seal({
    priceRange: 'ALL',
    currentPage: 0,
    pagingSize: 6,
    sortType: 'ASC'
})

export const pGetGoodsDetail = Object.seal({
    goodsId: ''
})

export const pGetMoreGoods = Object.seal({
    maxLength: 6
})

export const pGetGoodsInfoList = Object.seal({
    goodsIdList: []
})

export const pBatchGoodsInfo = Object.seal({
    goodsIdList: []
})
