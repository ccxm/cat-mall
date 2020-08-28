<template>
    <div class="c-comment-item xy-center">
        <div class="comment-left">
            <div class="up-side xy-center">
                <div>
                    <img :src="comment.userInfo.avatarUrl | addImagePrefix">
                    <img src="../../../../public/images/detail/crown.png">
                </div>
                <div>
                    <span>{{comment.userInfo.nickName | formatNickName}}</span>
                    <img src="../../../../public/images/detail/vip.png">
                </div>
            </div>
            <span class="comment-date">{{comment.list[0].createAt | formatDate}}</span>
        </div>
        <div class="comment-right">
            <div v-for="(item, index) in comment.list" :key="index"
                 :class="index < comment.list.length - 1 ? 'no-last-p' : ''">
                <p>{{item.comment}}</p>
                <c-like-pro class="c-like-pro" :goods-id="goodsId" :like-num="item.likeNum"
                            :un-like-num="item.unLikeNum"
                            :comment-index="commentIndex"
                            :comment-list-index="index"
                            :comment-id="comment.commentId"
                            :comment-like-list="commentLikeList"
                            :comment-list-id="item.commentListId"/>
            </div>
        </div>
    </div>
</template>

<script>
    import CLikePro from './c-like-pro'

    export default {
        name: 'CCommentItem',
        data() {
            return {}
        },
        props: ['comment', 'goodsId', 'commentIndex', 'commentLikeList'],
        components: {
            CLikePro
        }
    }
</script>

<style scoped lang="scss">
    .c-comment-item {
        font-family: Source Han Sans CN;
        width: 100%;
        border: {
            top: 1px solid #e1e1e1;
            bottom: 1px solid #e1e1e1;
        };

        .comment-left {
            width: 18%;
            padding: 10px 0;

            span {
                font-size: 16px;
                color: #888;
            }

            .up-side {
                div {
                    &:nth-child(1) {
                        width: 50px;
                        height: 50px;
                        position: relative;

                        img {
                            &:nth-child(1) {
                                width: 100%;
                                height: 100%;
                                border-radius: 100%;
                            }

                            &:nth-child(2) {
                                width: 13px;
                                height: 10px;
                                position: absolute;
                                left: 40px;
                                top: 35px
                            }
                        }
                    }

                    &:nth-child(2) {
                        margin-left: 10px;

                        span {
                            font-size: 16px;
                            color: #333;
                        }

                        img {
                            margin-left: 2px;
                            width: 25px;
                            height: 12px;
                        }
                    }
                }
            }

            .comment-date {
                margin-top: 10px;
                display: block;
                text-align: center;
                font-size: 13px;
                font-weight: 200;
                margin-left: -10px;
            }

        }

        .comment-right {
            width: 80%;

            p {
                font-size: 14px;
                color: #888;
                text-align: left;
            }

            .no-last-p {
                border-bottom: 1px solid #e1e1e1;
            }

            .c-like-pro {
                margin-top: -10px;
            }
        }
    }
</style>
