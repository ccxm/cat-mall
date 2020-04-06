<template>
  <div>
    <c-modal :is-show-title="false" :is-show-modal="isShowModal" :is-custom="true" width="1200px">
      <div slot="custom">
        <div class="comment-container">
          <div class="comment-header">
            <i class="iconfont icon-error-1" @click="hideModal"></i>
            <span>评论(<span class="comment-num">100+</span>)</span>
          </div>
          <div class="brief-comment-container">
            <div class="brief-left">
              <c-star :star="4.7" :edit="false"/>
              <span class="brief-left-span">弹幕</span>
            </div>
            <div class="brief-right">
              <c-barrage/>
            </div>
          </div>
          <div class="comment-area">
            <c-comment-item v-for="(item, index) in commentList" :key="index" :comment="item"/>
          </div>
          <div class="comment-bottom xy-center">
            <img src="./../../../../public/images/cat/cat_01.png">
            <c-star class="c-comment-star" :star="5" :edit="true"/>
            <el-input class="xy-center" v-model="commentText" placeholder="说说你对猫咪的评价吧"
                      @keyup.enter.native="publishComment">
              <i class="el-input__icon iconfont icon-error-1" slot="suffix" @click="clearInput"></i>
            </el-input>
            <el-button @click="publishComment">发送评论</el-button>
          </div>
        </div>
      </div>
    </c-modal>
  </div>
</template>

<script>
    import CModal from './../../public/c-modal'
    import CStar from './c-star'
    import CBarrage from './c-barrage'
    import CCommentItem from './c-comment-item'

    export default {
        name: 'CCommentModal',
        components: {
            CModal,
            CStar,
            CBarrage,
            CCommentItem
        },
        props: ['isShowModal'],
        data () {
            return {
                commentText: '',
                commentList: [{
                    id: 1,
                    date: '2019-12-07 17:18:05',
                    nickName: '丑小喵',
                    list: [{
                        content: '啊啊啊啊啊好萌好可爱啊',
                        likeNum: 101,
                        unLikeNum: 10
                    }, {
                        content: '我也要买一只',
                        likeNum: 200,
                        unLikeNum: 1 // 最少是一只
                    }]
                }]
            }
        },
        methods: {
            hideModal () {
                this.$emit('hide')
            },
            // 清空输入框
            clearInput () {
                this.commentText = ''
            },
            // 发表评论
            publishComment () {
                this.commentList[0].list.push({
                    content: this.commentText,
                    likeNum: 200,
                    unLikeNum: 1
                })
                console.log(this.commentList.last)
            }
        }
    }
</script>

<style lang="scss">
  .comment-container {
    width: 90%;
    height: 95vh;
    margin-left: 5%;
    position: relative;
    
    .comment-header {
      margin-top: 10px;
      
      i {
        display: block;
        text-align: right;
        font-size: 25px;
        color: #888;
        
        &:hover {
          color: #ff4400;
        }
      }
      
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
      
      .brief-left {
        display: flex;
        align-items: center;
        height: 110px;
        
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
        }
      }
      
      .brief-right {
        padding-top: 20px;
      }
      
    }
    
    .comment-area {
      width: 100%;
      margin-top: 20px;
      height: 50vh;
      overflow: auto;
    }
    
    .comment-bottom {
      position: absolute;
      bottom: 10px;
      display: flex;
      padding-top: 10px;
      border-top: 1px solid #e1e1e1;
      
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
