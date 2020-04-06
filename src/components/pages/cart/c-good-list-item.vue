<template>
    <div class="c-good-list-item">
        <div>
        <el-checkbox-group v-model="checkedGoods" @change="handleCheckedGoodsChange">
            <div v-for="(item,key) in getGoodsInfoList" :key="key" class="c-row-container">
                <el-row v-if="isMyOrder">
                    <div class="order xy-center">
                        <div>
                            <img src="./../../../../public/images/my/circle.png">
                            <span class="date">2019-11-10</span>
                            <span>订单号：546942055123390795</span>
                        </div>
                        <img src="./../../../../public/images/my/comment.png">
                    </div>
                </el-row>
                <el-row class="c-row">
                    <el-col v-if="showCheckBox" :span="isShowAccount ? 1 : 2">
                        <el-checkbox v-if="!isMyOrder" :label="item.goodsId"></el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <img :src="item.masterImg">
                    </el-col>
                    <el-col :span="4">
                        <div class="c-good-name">{{item.goodsName}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="yx-center">
                            <c-money :money="item.originalPrice || item.unitPrice" size="d-xs"></c-money>
                            <c-money :money="item.discountPrice" size="sm"></c-money>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <c-input-number :num="item.goodsNum" :index="key" v-if="isShowAccount && !isMyOrder"
                                        @change="onInputChange"/>
                        <span class="account-num" v-else>{{item.goodsNum}}</span>
                    </el-col>
                    <el-col class="yx-center" :span="isShowAccount ? 5 : 6">
                        <c-money :money="item.discountPrice * (item.goodsNum|| item.purchaseNum)" size="sm"></c-money>
                        <c-discount v-if="isShowAccount && !isMyOrder"></c-discount>
                    </el-col>
                    <el-col v-if="isShowAccount" :span="2">
                        <div class="c-del-good" @click="showDelModal(item.goodsId)">
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-checkbox-group>
        </div>
        <!-- 商品汇总 -->
        <div class="checkout">
            <div v-if="isShowTotal" class="c-total-container">
                <p>普通商品&nbsp;<span>{{checkedGoods.length}}&nbsp;</span>件</p>
                <div class="total-container xy-center">
                    <img class="arrow-left" @click="loadMoreImg('left')"
                         src="../../../../public/images/cart/left.png">
                    <div class="img-container xy-center">
                        <img v-for="(item,key) in getImgList"
                             :src="item"
                             :key="key">
                    </div>
                    <img class="arrow-right" @click="loadMoreImg('right')"
                         src="../../../../public/images/cart/right.png">
                </div>
            </div>
            <!-- 全选 -->
            <div v-if="isShowAccount && !isMyOrder" class="selected-all xy-center">
                <el-checkbox class="c-all-checkbox xy-center" :indeterminate="isIndeterminate" v-model="checkAll"
                             @change="handleCheckAllChange">全选
                </el-checkbox>
                <div class="selected-right xy-center">
                    <div class="select-num xy-center">
                        <p>已选商品&nbsp;<span>{{checkedGoods.length}}&nbsp;</span> 件</p>
                        <img :class="isShowTotal ? 'show' : ''" @click="isShowTotal = !isShowTotal"
                             src="../../../../public/images/cart/up.png"/>
                    </div>
                    <!--        <c-cart-total />-->
                    <div class="xy-center">
                        <span>合计：</span>
                        <CMoney size="sm" :money="countTotal"></CMoney>
                    </div>
                    <el-button @click="settleAccount">结算</el-button>
                </div>
            </div>
        </div>
        <c-modal :context="'是否删除该商品？'" :is-show-modal="isShowDel" @hide="isShowDel = false" @confirm="deleteFormCart"
                 :is-show-cancel="true"/>
    </div>
</template>

<script>
    import CMoney from './../../public/c-money'
    import CInputNumber from './../../public/c-input-number'
    import CDiscount from './c-discount'
    import CModal from './../../public/c-modal.vue'
    import {pUpdateCart, pDeleteFromCart} from './../../../js/http/param'

    const maxImgLength = 10
    export default {
        name: 'CGoodListItem',
        props: {
            // 是否显示结算相关信息
            isShowAccount: {
                type: Boolean,
                default: false
            },
            // 是否为我的订单
            isMyOrder: {
                type: Boolean,
                default: false
            },
            // 数量
            accountNum: {
                type: Number,
                default: 1
            },
            showCheckBox: {
                type: Boolean,
                default: true
            }
        },
        components: {
            CMoney,
            CInputNumber,
            CDiscount,
            CModal
        },
        data() {
            return {
                checkAll: false,
                checkedGoods: [],
                isIndeterminate: false,
                leftIndex: 0,
                rightIndex: maxImgLength,
                isShowTotal: false, // 是否显示所有所选的
                goodsInfoList: [],
                totalMoney: 0,
                imgList: [],
                isShowDel: false,
                purchaseList: []
            }
        },
        computed: {
            getImgList() {
                return this.imgList.filter((item, index) => {
                    return index >= this.leftIndex && index < this.rightIndex
                })
            },
            getGoodsInfoList() {
                this.goodsInfoList = this.$store.getters.getGoodsInfoList
                console.log(Object.deepCopy(this.goodsInfoList))
                return this.goodsInfoList
            },
            // 计算已选商品的总金额、图片列表、购买数量
            countTotal() {
                this.totalMoney = 0
                this.imgList = []
                this.purchaseList = []
                this.checkedGoods.forEach(goodsId => {
                    const goodsInfo = this.goodsInfoList.find(item => item.goodsId === goodsId)
                    this.totalMoney += goodsInfo.discountPrice * goodsInfo.goodsNum
                    this.imgList.push(goodsInfo.masterImg)
                    this.purchaseList.push({
                        goodsId: goodsInfo.goodsId,
                        purchaseNum: goodsInfo.goodsNum
                    })
                })
                this.totalMoney = parseFloat(this.totalMoney.toFixed(2))
                return this.totalMoney
            }

        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedGoods = val ? this._getGoodsIdList() : []
                this.isIndeterminate = false
            },
            handleCheckedGoodsChange(value) {
                let checkedCount = value.length
                this.checkAll = checkedCount === this.goodsInfoList.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.goodsInfoList.length
            },
            load() {
              console.log('加载中')
            },
            // 加载更多图片
            loadMoreImg(direction) {
                if (this.imgList.length < maxImgLength) {
                    return
                }
                if (direction === 'left' && this.leftIndex > 0) {
                    --this.leftIndex
                    --this.rightIndex
                }
                if (direction === 'right' && this.rightIndex < imgList.length) {
                    ++this.rightIndex
                    ++this.leftIndex
                }
            },
            // 更新购物车的数量
            updateCart() {
                this.$api.updateCart(pUpdateCart).then(res => {
                    console.log(res)
                })
            },
            // 删除商品
            deleteFormCart() {
                this.$api.deleteFromCart(pDeleteFromCart).then(res => {
                    this.bus.$emit('updateCartLength')
                    this.bus.$emit('getCartList', true)
                })
            },
            showDelModal(goodsId) {
                pDeleteFromCart.goodsId = goodsId
                this.isShowDel = true
            },
            // 监听数量的变化
            onInputChange(num, index) {
                this.goodsInfoList[index].goodsNum = num
                pUpdateCart.goodsId = this.goodsInfoList[index].goodsId
                pUpdateCart.goodsNum = num
                this.updateCart()
            },
            //
            settleAccount() {
                if(!this.purchaseList.length) {
                    this.$tips.tWarn('您还未选中任何商品')
                    return
                }
                this.$router.push({
                    path: 'order',
                    query: {
                        purchaseList: this.purchaseList
                    }
                })
            },
            // 获取商品id列表
            _getGoodsIdList() {
                const temp = []
                this.goodsInfoList.forEach(item => {
                    temp.push(item.goodsId)
                })
                return temp
            }
            // // 获取商品图片
            // _getGoodsImgList() {
            //     this.imgList = []
            //     this
            // }
        },
        mounted() {
            console.log(1111111111111)
        }
    }
</script>

<style lang="scss">
    .c-good-list-item {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(46, 50, 51, 1);

        .order {
            width: 860px;
            padding: 0 10px;
            margin-top: 10px;
            height: 24px;
            justify-content: space-between;
            background: #DDDDDD;
            font-size: 12px;
            font-family: Source Han Sans CN;
            color: rgba(102, 102, 102, 1);

            .date {
                font-size: 12px;
                color: #333;
                font-weight: 500;
                margin: 0 10px;
            }

            div {
                &:nth-child(2) {
                    color: #333 !important;
                    margin: 0 10px;
                }
            }
        }

        .el-checkbox {
            width: 25px;
        }

        .el-checkbox__label {
            opacity: 0;
        }

        .el-checkbox__input {
            .el-checkbox__inner {
                width: 25px;
                height: 25px;
                border-radius: 100%;
                border-color: #ccc;
                background: #fff;

                &::after {
                    width: 8px;
                    box-sizing: content-box;
                    content: "";
                    border: 2px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 15px;
                    left: 7px;
                    position: absolute;
                    top: 1px;
                }

                &:focus, & :active {
                    border-color: #ccc;
                }

                &:hover {
                    border-color: #FF7C25 !important;
                }
            }

            .ic-check .el-checkbox__inner {
                background-color: #fff;
                border-color: #FF7C25;
            }
        }

        .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #FF7C25;
            border-color: #FF7C25;
        }

        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background: #fff;
            border-color: #ccc;

            &:before {
                content: none;
            }

            &:focus, &:active {
                border-color: #ccc;
            }
        }

        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #FF7C25 !important;
            opacity: 0;
            transition: all .5s;
            -webkit-transition: all .5s;
        }

        .c-row-container {
            border-bottom: 1px solid rgba(235, 235, 235, 1);
        }

        .c-row {
            display: flex;
            align-items: center;
            margin: 10px 0;
            /*width: 1200px;*/
            border-bottom: 0 !important;
            padding: 10px 0;

            .c-del-good {
                width: 24px;
                height: 24px;
                background-image: url("../../../../public/images/cart/del.png");

                &:hover, & :active {
                    background-image: url("../../../../public/images/cart/del-active.png");
                }
            }

            img {
                width: 120px;
                height: 120px;
                margin-left: 20px;
            }

            .yx-center img {
                width: 80px;
                height: 30px;
                margin-top: 5px;
            }

            .c-good-name {
                font-size: 16px;
                /*opacity: 1;*/
            }

            .account-num {
                font-size: 16px;
            }
        }
    }

    .checkout {
        position: fixed;
        bottom: 0;
        z-index: 9999;
    }

    .selected-all {
        width: 1200px;
        justify-content: space-between !important;
        background: #E5E5E5;

        .c-all-checkbox {
            margin-left: 28px;

            span {
                opacity: 1 !important;
                font-size: 14px;
                font-family: Source Han Sans CN;
                color: rgba(102, 102, 102, 1);
            }
        }

        .selected-right {
            width: 600px;
            display: flex;
            justify-content: space-between;

            p {
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);

                span {
                    color: #FF6B67;
                    font-size: 16px;
                }
            }

            .select-num {
                img {
                    width: 16px;
                    height: 16px;
                    margin-left: 5px;
                    margin-top: 4px;
                }

                .show {
                    transform: rotate(180deg);
                }
            }

            .el-button {
                background: #FF4400;
                color: #fff;
                width: 108px;
                height: 52px;
                font-size: 18px;
                border: 0;
                border-radius: 0;

                &:active {
                    border: 2px solid #ff4400;
                }
            }
        }
    }

    .c-total-container {
        background: #494949;

        .arrow-left {
            padding-left: 50px;
            padding-bottom: 10px;
        }

        .arrow-right {
            padding-right: 50px;
            padding-bottom: 10px;
        }

        p {
            font-size: 14px;
            color: #fff;
            margin: {
                top: 5px;
                left: 5px;
            }

            span {
                color: #FF6B67;
                font-size: 16px;
            }
        }

        .total-container {
            justify-content: space-between;
        }

        .img-container {
            max-width: 1000px;
            margin: 0 auto;

            img {
                width: 70px;
                height: 70px;
                margin: {
                    right: 20px;
                    bottom: 10px;
                }
            }
        }
    }
</style>
