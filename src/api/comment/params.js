// 短评
export const pGetBriefList = Object.seal({
    goodsId: ''
})

export const pWriteBrief = Object.seal({
    goodsId: '',
    brief: '',
    color: ''
})

export const pLikeForBrief = Object.seal({
    goodsId: '',
    briefId: ''
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

export const pLikeForGoods = Object.seal({
    goodsId: ''
})
