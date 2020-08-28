import { get, post } from '@/plugins/modules/request'

// 短评
export const getBriefList = params => get('/comment/brief-list', params)

export const writeBrief = params => post('/comment/write-brief', params)

export const likeForBrief = params => post('/comment/like-for-brief', params)

// 评论
export const getCommentList = params => get('/comment/comment-list', params)

export const writeComment = params => post('/comment/write-comment', params, {
    showTip: true,
    tipMsg: '评论成功'
})

export const likeForComment = params => post('/comment/like-for-comment', params)
