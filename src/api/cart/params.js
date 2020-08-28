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

export const pGetCartList = Object.seal({
    pageSize: 6,
    curPage: 0
})
