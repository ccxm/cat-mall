<template>
    <div class="c-comment-container">
        <div class="comment-container">
            <div class="comment-header">
                <span>评论(<span class="comment-num">{{totalCommentNum}}</span>)</span>
            </div>
            <div class="brief-comment-container">
                <div class="brief-left">
                    <c-star :star="avgRate" :edit="false"/>
                    <span class="brief-left-span">短评</span>
                </div>
                <div class="brief-right">
                    <c-barrage :brief-list="briefList" :goods-id="goodsId"/>
                </div>
            </div>
            <div class="comment-area">
                <div v-if="commentList.length">
                    <c-comment-item v-for="(item, index) in commentList" :key="index" :comment="item"
                                    :goods-id="goodsId" :comment-index="index" :comment-like-list="commentLikeList"/>
                </div>
                <div v-else-if="isLoadedComment" class="no-comment yx-center">
                    <img src="../../../../public/images/detail/no-comment.png">
                    <p>暂时没有评论哦，赶快来抢沙发吧~</p>
                </div>
            </div>
            <div class="comment-bottom xy-center">
                <img :src="masterImg">
                <c-star class="c-comment-star" :star="customRate" :edit="true" @star="onStarChange"/>
                <el-input class="xy-center" v-model="commentText" placeholder="说说你对猫咪的评价吧"
                          @keyup.enter.native="writeComment">
                    <i class="el-input__icon iconfont icon-error-1" slot="suffix" @click="clearInput"></i>
                </el-input>
                <el-button @click="writeComment">发送评论</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import CStar from './c-star'
    import CBarrage from './c-barrage'
    import CCommentItem from './c-comment-item'
    import { pGetBriefList, pGetCommentList, pWriteComment } from '@api/comment/params'

    export default {
        name: 'CCommentContainer',
        components: {
            CStar,
            CBarrage,
            CCommentItem
        },
        props: ['isShowModal', 'goodsId', 'masterImg'],
        data() {
            return {
                briefList: [],
                commentText: '',
                commentList: [],
                customRate: 5, // 用户的评分
                avgRate: 5, // 平均评分
                isLoadedComment: true, // 是否已经加载了评论，已经加载的后才显示没有评论
                commentLikeList: [],
                totalCommentNum: 0 // 评论的数量
            }
        },
        watch: {
            totalCommentNum(val) {
                this.$emit('num', val)
            }
        },
        methods: {
            // 清空输入框
            clearInput() {
                this.commentText = ''
            },
            onStarChange(rate) {
                this.customRate = rate
                console.log(rate)
            },
            getBriefList() {
                pGetBriefList.goodsId = this.goodsId
                this.$api.comment.getBriefList(pGetBriefList).then(res => {
                    this.briefList = res.briefList
                })
            },
            getCommentList() {
                pGetCommentList.goodsId = this.goodsId
                this.$api.comment.getCommentList(pGetCommentList).then(res => {
                    console.log(res)
                    this.isLoadedComment = true
                    this.commentList = res.commentList
                    this.totalCommentNum = res.totalCommentNum
                })
            },
            writeComment() {
                pWriteComment.comment = this.commentText
                pWriteComment.goodsId = this.goodsId
                pWriteComment.rate = this.customRate
                this.$api.comment.writeComment(pWriteComment).then(res => {
                    this.getCommentList()
                    this._clearCommentData()
                })
            },
            // 监听评论点赞数量的变化
            onCommentLikeChange(target) {
                this.commentList[target.commentIndex].list[target.commentListIndex].likeNum = target.likeNum
                this.commentList[target.commentIndex].list[target.commentListIndex].unLikeNum = target.unLikeNum
            },
            getCommentLikeList() {
                this.$api.user.getCommentLikeList().then(res => {
                    this.commentLikeList = res.commentLikeList
                })
            },
            // 清空评论数据
            _clearCommentData() {
                pWriteComment.comment = ''
                pWriteComment.rate = ''
                this.clearInput()
            }
        },
        mounted() {
            this.getBriefList()
            this.getCommentList()
            this.getCommentLikeList()
            this.$bus.$on('commentLikeChange', (res) => {
                this.onCommentLikeChange(res)
            })
        }
    }
</script>

<style lang="scss">
    $border: 1px solid #f2f2f2;

    .c-comment-container {
        width: 1200px;
        margin-top: 20px;
    }

    .comment-container {
        width: 92%;
        /*height: 95vh;*/
        margin-left: 3%;
        position: relative;
        border: $border;
        border-radius: 5px;

        .comment-header {
            background: #e8e8e8;
            text-align: center;
            padding: 8px 0;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;

            span {
                font-size: 26px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #333;
            }

            .comment-num {
                color: #FF4400;
            }
        }

        .brief-comment-container {
            display: flex;
            width: 100%;
            justify-content: center;

            .brief-left {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 110px;
                width: 17%;

                .brief-left-span {
                    height: 90px;
                    display: inline-block;
                    border-left: 2px dashed #666;
                    writing-mode: vertical-lr;
                    margin: 0 20px;
                    padding-left: 10px;
                    font-size: 25px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #ff4400;
                    letter-spacing: 3px;
                    text-align: center;
                }
            }

            .brief-right {
                width: 80%;
                padding-top: 20px;
            }

        }

        .comment-area {
            width: 100%;
            /*margin-top: 20px;*/
            /*height: 50vh;*/
            overflow: auto;

            .no-comment {
                margin-top: 20px;
                color: #B2B2B2;
                font-weight: 300;
                font-size: 18px;

                img {
                    width: 100px;
                    height: 100px;
                    margin-bottom: 10px;
                }
            }
        }

        .comment-bottom {
            /*position: absolute;*/
            /*bottom: 10px;*/
            display: flex;
            /*padding-top: 10px;*/
            padding: 10px 0;
            width: 100%;

            img {
                width: 90px;
                height: 90px;
            }

            .c-comment-star {
                margin: 0 10px;
            }

            .xy-center {
                width: 750px;

                .el-input__inner {
                    height: 40px;
                    color: #333;
                    font-family: Source Han Sans CN;
                    border-radius: 0;

                    &:active, &:focus {
                        border-color: red !important;
                    }
                }

                i {
                    font-size: 20px;
                    margin-right: 5px;

                    &:hover {
                        color: #ff4400;
                    }
                }
            }

            button {
                height: 40px;
                background: #ff4400;
                color: #fff;
                margin-left: 33px;
                border-radius: 0;

                &:active {
                    border-color: #ff4400;
                }
            }
        }
    }
</style>
