<template>
    <div class="detail">
        <c-head></c-head>
        <div class="bread">
            <c-bread></c-bread>
        </div>
        <div class="detail-container">
            <div class="detail-left">
                <c-image-picker v-if="goodsDetail.goodsInfo" :img-list="goodsDetail.goodsInfo.imgList"/>
                <!--        <div>-->
                <!--          <audio src="./../../public/audio/cat-01.mp3" controls="controls" />-->
                <!--          <audio class="audio" controls>-->
                <!--&lt;!&ndash;            <source src="horse.ogg" >&ndash;&gt;-->
                <!--            <source src="./../../public/audio/cat-01.mp3" >-->
                <!--            您的浏览器不支持 audio 元素。-->
                <!--          </audio>-->
                <!--        </div>-->
            </div>
            <div class="detail-center">
                <div class="up-side">
                    <div class="good-name">{{goodsDetail.goodsName}}</div>
                    <div class="good-describe y-center">
                        <span v-if="goodsDetail.goodsInfo">{{goodsDetail.goodsInfo.intro}}</span>
                        <!--            <div class="y-center">-->
                        <!--              <img src="./../../public/images/components/edit.png">-->
                        <!--              <span>欢迎大家为猫猫添加描述</span>-->
                        <!--            </div>-->
                    </div>
                    <div class="primary-price y-center">
                        <span>价格：</span>
                        <c-money :money="goodsDetail.originalPrice" size="d-xs"/>
                    </div>
                    <div class="discount-price y-center">
                        <span>促销价：</span>
                        <c-money :money="goodsDetail.discountPrice"/>
                    </div>
                    <div class="good-discount y-center">
                        <span>优惠券：</span>
                        <c-discount/>
                    </div>
                    <div class="post-address y-center__between">
                        <div class="y-center__between">
                            <span v-if="goodsDetail.goodsInfo">{{goodsDetail.goodsInfo.address}}</span>
                            <span>至</span>
                            <span>北京</span>
                        </div>
                        <span>|</span>
                        <span v-if="goodsDetail.goodsInfo">运费：{{goodsDetail.goodsInfo.postage}}元</span>
                    </div>
                    <div class="good-num y-center__between">
                        <c-input-number @change="onPurchaseNum"/>
                        <span>库存：{{goodsDetail.inventory}}</span>
                    </div>
                </div>
                <div class="mid-side">
                    <div class="xy-center">
                        <span>总销量</span>
                        <span>{{goodsDetail.saleVolume}}</span>
                    </div>
                    <div class="xy-center" @click="isShowModal = true">
                        <img src="../../../public/images/detail/comment.png">
                        <span>{{totalCommentNum}}</span>
                    </div>
                    <div class="xy-center mid_last">
                        <c-like v-if="goodsDetail.goodsId" @click.native.stop="likeForGoods(goodsDetail.goodsId)"
                                :like-num="goodsDetail.likeNum" :is-like="checkIsLike"/>
                    </div>
                </div>
                <div class="down-side y-center__between">
                    <el-button :disabled="!goodsDetail.inventory" @click="goToOrder">立即购买</el-button>
                    <el-button @click="addToCart">加入购物车</el-button>
                </div>
            </div>
            <div class="detail-right">
                <c-see-more/>
            </div>
        </div>
        <div id="comment">
            <c-comment-container v-if="goodsDetail.goodsInfo" :goods-id="goodsId"
                                 :master-img="goodsDetail.goodsInfo.imgList[0]" @num="onTotalCommentNum"/>
        </div>
        <div class="detail-bottom-line"></div>
        <c-foot></c-foot>
        <c-modal context="加入购物车成功" @hide="showToast = false" :is-show-modal="showToast" :is-show-cancel="true"
                 confirm-text="去购物车" @confirm="goToCart"/>
        <!--        <c-comment-modal :is-show-modal="isShowModal" @hide="isShowModal = false"/>-->
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CBread from '@components/public/c-bread'
    import CMoney from '@components/public/c-money'
    import CModal from '@components/public/c-modal'
    import CDiscount from '../cart/components/c-discount'
    import CInputNumber from '@components/public/c-input-number'
    import CLike from '@components/public/c-like'
    import CImagePicker from './components/c-image-picker'
    import CSeeMore from './components/c-see-more'
    import CCommentContainer from './components/c-comment-container'

    import { pGetGoodsDetail } from '@api/goods/params'
    import { pAddToCart } from '@api/cart/params'
    import { pCreateOrderItem } from '@api/order/params'
    import { mLike } from '@/mixins/mLike'

    export default {
        name: 'detail',
        components: {
            CHead,
            CFoot,
            CBread,
            CMoney,
            CDiscount,
            CInputNumber,
            CLike,
            CImagePicker,
            CSeeMore,
            CModal,
            // CCommentModal,
            CCommentContainer
        },
        mixins: [mLike],
        data() {
            return {
                isShowModal: false,
                goodsDetail: {},
                createOrderItem: pCreateOrderItem,
                goodsId: '',
                totalCommentNum: 0,
                showToast: false
            }
        },
        methods: {
            getGoodsDetail() {
                this.$api.goods.getGoodsDetail(pGetGoodsDetail).then(res => {
                    console.log(res)
                    this.goodsDetail = res
                })
            },
            // 监听购买数量
            onPurchaseNum(num) {
                console.log(num)
                this.createOrderItem.purchaseNum = num
                pAddToCart.goodsNum = num
            },
            goToCart() {
                this.$router.push('/cart')
            },
            // 去下单
            goToOrder() {
                this.$router.push(`/order?goodsId=${this.createOrderItem.goodsId}&purchaseNum=${this.createOrderItem.purchaseNum}`)
            },
            onTotalCommentNum(num) {
                this.totalCommentNum = num
            },
            goToAnchor() {
                setTimeout(() => {
                    document.getElementById('comment').scrollIntoView()
                }, 1000)
            },
            addToCart() {
                pAddToCart.goodsId = this.goodsDetail.goodsId
                this.$api.addToCart(pAddToCart).then(res => {
                    this.showToast = true
                    this.$bus.$emit('updateCartLength')
                })
            }
        },
        mounted() {
            console.log(this.$route)
            pGetGoodsDetail.goodsId = this.$route.query.goodsId
            this.createOrderItem.goodsId = pGetGoodsDetail.goodsId
            this.createOrderItem.purchaseNum = 1
            pAddToCart.goodsNum = 1
            this.goodsId = pGetGoodsDetail.goodsId
            console.log(this.createOrderItem)
            console.log(pGetGoodsDetail.goodsId)
            this.getGoodsDetail()
            // 评价挑战过来的直接跳转至锚点
            if (this.$route.query.type === 'anchor') {
                this.goToAnchor()
            }
        }
    }
</script>

<style scoped lang="scss">
    .detail {
        width: 100%;
        /*background: #F2F2F2;*/
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: Source Han Sans CN;

        .bread {
            width: 100%;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .detail-container {
        width: 1160px;
        margin-top: 20px;
        padding: 0 20px;
        display: flex;
    }

    .detail-left {
        /*div {*/
        /*  &:nth-child(1) {*/
        /*    width: 372px;*/
        /*    height: 372px;*/
        /*    background-image: url("./../../public/images/cat/cat1/cat1_1.jpg");*/
        /*    background-size: 372px 372px;*/
        /*    background-position: center;*/
        /*    background-repeat: no-repeat;*/
        /*  */
        /*    .audio {*/
        /*      width: 100%;*/
        /*      background: transparent;*/
        /*      border-radius: 0;*/
        /*      margin-top: 315px;*/
        /*    }*/
        /*  }*/
        /*}*/
    }

    .detail-center {
        margin-left: 30px;
        display: flex;
        flex-direction: column;

        .up-side {
            .good-name {
                font-size: 24px;
                color: #1B251F;
                font-family: Adobe Heiti Std R;
                font-weight: bold;
            }

            .good-describe {
                margin-top: 18px;
                font-size: 18px;
                color: #FF7C25;

                .y-center {
                    margin-left: 34px;
                    color: #646A7C;
                    font-size: 12px;
                    font-family: Source Han Sans CN;

                    image {
                        width: 14px;
                        height: 14px;
                        display: flex;
                    }

                    span {
                        margin-left: 10px;
                    }
                }
            }

            .primary-price, .discount-price, .good-discount {
                font-size: 21px;
                font-family: Source Han Sans CN;
                color: #333;
                margin-top: 26px;
                height: 20px;
            }

            .post-address {
                width: 370px;
                margin-top: 20px;

                div {
                    width: 200px;

                    span {
                        font-size: 24px;
                        color: #333;

                        &:nth-child(2) {
                            color: #FF4400;
                            font-size: 18px;
                        }
                    }
                }

                span {
                    &:nth-last-child(2) {
                        font-size: 26px;
                        color: #ddd;
                    }

                    &:nth-last-child(1) {
                        font-size: 22px;
                        color: #333
                    }
                }
            }

            .good-num {
                margin-top: 28px;
                width: 250px;
            }

        }

        .mid-side {
            $border: 1px solid #EEEBE7;
            display: flex;
            margin-top: 46px;
            width: 571px;
            padding: 10px 0;
            border-top: $border;
            border-bottom: $border;

            .xy-center {
                width: 33.3%;
                border-right: $border;
                font-size: 18px;

                span {
                    &:nth-child(1) {
                        color: #B2B2B2;
                    }

                    &:nth-last-child(1) {
                        margin-left: 13px;
                        color: #ff4400;
                    }
                }
            }

            .mid_last {
                border-right: 0;
            }
        }

        .down-side {
            width: 500px;
            margin-top: 40px;

            button {
                width: 183px;
                height: 45px;
                padding: 0 !important;
                line-height: unset;
                background: #FF4400;
                color: #fff;
                font-size: 18px;
                border: 0;
                outline: none;

                &:active {
                    animation: fade .4s infinite;
                    -moz-animation: fade .4s infinite;
                }

                &:disabled {
                    opacity: .6;
                }
            }
        }

    }

    .c-progress {
        margin-top: 20px;
    }

    .detail-bottom-line {
        margin-top: 10px;
        width: 100%;
        height: 10px;
        background: #f2f2f2;
    }

    /*.icon-mima {*/
    /*  font-size: 20px;*/
    /*  color: #ff4400;*/
    /*  font-weight: bolder;*/
    /*}*/
</style>
