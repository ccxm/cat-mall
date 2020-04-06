<template>
  <div class="c-like-pro">
    <div @click="like('LIKE')">
      <i v-if="likeStatus === 'UNSELECTED' || likeStatus === 'UNLIKE'" class="iconfont icon-zan-up-0"></i>
      <img v-else-if="likeStatus === 'LIKE'" src="./../../../../public/images/detail/zan-up-1.svg">
      <span>{{this.tempLikeNum}}</span>
    </div>
    <div @click="like('UNLIKE')">
      <i v-if="likeStatus === 'UNSELECTED' || likeStatus === 'LIKE'" class="iconfont icon-zan-down-0"></i>
      <img v-else-if="likeStatus === 'UNLIKE'" src="./../../../../public/images/detail/zan-down-1.svg">
      <span>{{this.tempUnLikeNum}}</span>
    </div>
  </div>
</template>

<script>
    import { pLikeForComment } from './../../../js/http/param'
    export default {
        name: 'CLikePro',
        data () {
            return {
                likeStatus: 'UNSELECTED', // 点赞的状态，UNSELECTED未选中，LIKE给力，UNLIKE，拉到
                tempLikeNum: 0,
                tempUnLikeNum: 0,
                tempCommentLikeList: []
            }
        },
        props: {
            likeNum: {
                type: Number,
                default: 0
            },
            unLikeNum: {
                type: Number,
                default: 0
            },
            goodsId: String,
            commentId: String,
            commentListId: String,
            commentIndex: Number,
            commentListIndex: Number,
            commentLikeList: Array
        },
        watch: {
            likeNum(val) {
                this.tempLikeNum = val
            },
            unLikeNum(val) {
                this.tempUnLikeNum = val
            },
            commentLikeList() {
                this.checkIsLiked()
            }
        },
        mounted() {
            this.tempLikeNum = this.likeNum
            this.tempUnLikeNum = this.unLikeNum
            this.tempCommentLikeList = this.commentLikeList
            this.checkIsLiked()
        },
        methods: {
            // like (index) {
            //     if (this.likeStatus === index) {
            //         this.likeStatus = 'UNSELECTED'
            //         if (index === 'LIKE') {
            //             this.tempLikeNum -= 1
            //         }
            //         if (index === 'UNLIKE') {
            //             this.tempUnLikeNum -= 1
            //         }
            //         return
            //     }
            //     if (index === 'LIKE') {
            //         this.tempLikeNum += 1
            //         // 如果已经点赞了，则取消另一个点赞
            //         this.tempUnLikeNum += this.likeStatus === 'UNLIKE' ? 0 : -1
            //     }
            //     if (index === 'UNLIKE') {
            //         this.tempUnLikeNum += 1
            //         // 如果已经点赞了，则取消另一个点赞
            //         this.tempLikeNum += this.likeStatus === 'LIKE' ? 0 : -1
            //     }
            //     this.likeStatus = index
            // },
            like(status) {
                this.likeStatus = status
                pLikeForComment.likeState = status
                this.likeForComment()
            },
            likeForComment() {
                pLikeForComment.goodsId = this.goodsId
                pLikeForComment.commentId = this.commentId
                pLikeForComment.commentListId = this.commentListId
                this.$api.likeForComment(pLikeForComment).then(res => {
                    this.bus.$emit('commentLikeChange', {
                        commentIndex: this.commentIndex,
                        commentListIndex: this.commentListIndex,
                        likeNum: res.likeNum,
                        unLikeNum: res.unLikeNum
                    })
                }).catch(err => {
                    console.error(err)
                    this.likeStatus = 'UNSELECTED'
                })
            },
            // 检查是否已经点赞
            checkIsLiked() {
                const commentItem = this.commentLikeList.find(item => item.commentId === this.commentId && item.commentListId === this.commentListId)
                if(commentItem) {
                    this.likeStatus = commentItem.likeState
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .c-like-pro {
    display: flex;
    align-items: center;
    justify-content: space-around;
    /*border: 1px solid #e1e1e1;*/
    width: 120px;
    margin-left: auto;
    padding-bottom: 5px;
    border-radius: 20px;
    div {
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: #ff4400;
      }
      img {
        width: 20px;
        height: 20px;
        animation: rotate45 .6s linear;
      }
      span {
        color: #333;
        font-size: 14px;
        margin-left: 2px;
      }

      &:nth-child(2) {
        display: flex;
        margin-left: 10px;
        i,img {
          display: inline-block;
          padding-top: 10px;
        }
        img {
          animation: rotate-45 .6s linear
        }
        span {
          display: inline-block;
          margin-top: 10px;
        }
      }
    }
  }

  @keyframes rotate45 {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  @keyframes rotate-45 {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>
