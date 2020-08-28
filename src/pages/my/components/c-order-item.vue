<template>
    <div class="c-order-item">
        <div class="order-header" :class="orderItem.paymentState === 'SUCCESSED' ? '' : 'components-blue-header'">
            <el-row class="y-center">
                <el-col :span="16">
                    <div class="order y-center">
                        <img src="../../../../public/images/my/circle.png">
                        <span class="date">{{orderItem.createdAt | formatDate}}</span>
                        <span>订单号：{{orderItem.orderId}}</span>
                    </div>
                </el-col>
                <el-col :offset="6" :span="2" class="x-center">
                    <div class="c-del-good" @click="isShowDel = true">
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="order-container" :class="orderItem.paymentState === 'SUCCESSED' ? '' : 'components-blue-container'">
            <el-row class="y-center">
                <el-col :span="16">
                    <div ref="left">
                        <el-row class="y-center goods-item"
                                :class="[{'goods-blue-item': orderItem.paymentState !== 'SUCCESSED'},{'none-bottom-border': index === orderItem.goodsList.length - 1}]"
                                v-for="(item, index) in orderItem.goodsList" :key="index">
                            <el-col :span="12">
                                <div class="goods-info x-center">
                                    <div class="master-img-div">
                                        <img :src="item.masterImg" @click="goToDetail(item.goodsId, 'custom')">
                                    </div>
                                    <div @click="goToDetail(item.goodsId, 'custom')">
                                        <span>{{item.goodsName}}</span>
                                        <span>{{item.intro || '锐舞iPhone11钢化膜X苹果11手机iPhoneX全屏XS覆盖XM'}}</span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col class="yx-center" :span="6">
                                <div class="yx-center">
                                    <c-money :money="item.unitPrice" size="d-xs"></c-money>
                                    <c-money :money="item.totalPrice" size="sm"></c-money>
                                </div>
                            </el-col>
                            <el-col class="xy-center" :span="6">
                                <span>{{item.purchaseNum}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col class="order-right" :span="8">
                    <div ref="right">
                        <el-row class="order-right-row">
                            <el-col class="xy-center order-col-item"
                                    :class="orderItem.paymentState === 'SUCCESSED' ? '' : 'components-col-blue-item'"
                                    :span="12">
                                <c-money :money="orderItem.totalAmount" size="sm"></c-money>
                            </el-col>
                            <el-col class="xy-center order-col-item order-col-item-right" :span="12">
                                <div>
                                    <div class="state-item">
                                        <i class="iconfont icon-location"></i>
                                        <c-address-popover class="address-popover" :address="orderItem.address || {}"/>
                                    </div>
                                    <div v-for="(item, index) in orderItem.goodsList" :key="index">
                                        <div v-if="orderItem.paymentState === 'SUCCESSED'" class="state-item"
                                             @click="goToDetail(item.goodsId, 'anchor')">
                                            <i class="iconfont icon-pingjia"></i>
                                            <span>追加评价</span>
                                        </div>
                                    </div>
                                    <div v-if="orderItem.paymentState !== 'SUCCESSED'" class="x-center">
                                        <el-button class="to-pay-btn" type="primary" @click="goToOrder">去支付</el-button>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <c-modal :context="'是否删除该订单？'" :is-show-modal="isShowDel" @hide="isShowDel = false" @confirm="deleteOrder"
                 :is-show-cancel="true"/>
    </div>
</template>

<script>
    import CMoney from '@components/public/c-money'
    import CAddressPopover from './c-address-popover'
    import CModal from '@components/public/c-modal.vue'
    import { pDeleteOrder } from '@api/order/params'

    export default {
        name: 'COrderItem',
        components: {
            CMoney,
            CModal,
            CAddressPopover
        },
        props: {
            orderItem: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                isShowDel: false
            }
        },
        methods: {
            deleteOrder() {
                pDeleteOrder.orderId = this.orderItem.orderId
                this.$api.order.deleteOrder(pDeleteOrder).then(res => {
                    this.$emit('del')
                }).catch(err => {
                    console.error(err)
                })
            },
            goToDetail(goodsId, type) {
                this.$router.push(`/detail?goodsId=${goodsId}&type=${type}`)
            },
            goToOrder() {
                this.$router.push(`/order?orderId=${this.orderItem.orderId}&totalAmount=${this.orderItem.totalAmount}`)
            }
        },
        mounted() {
            console.log(this.$refs.left.offsetHeight)
            this.$refs.right.style.height = this.$refs.left.offsetHeight + 'px'
        }
    }
</script>

<style lang="scss" scoped>
    $width: 880px;
    $background: #f5f5f5;
    $border: 1px solid #f0f0f0;
    $blue-border: 1px solid #daf3ff;
    $blue-background: #daf3ff;

    .c-order-item {
        width: $width - 2;
        margin-top: 10px;
    }

    .order-header {
        width: $width - 20 - 2;
        padding: 5px 10px;
        /*margin-top: 10px;*/
        height: 26px;
        justify-content: space-between;
        background: $background;
        font-size: 12px;
        font-family: Source Han Sans CN;
        color: rgba(102, 102, 102, 1);

        .y-center {
            height: 100%;
        }

        .order {
            font-size: 13px;
            font-weight: 300;

            .date {
                font-size: 15px;
                color: #333;
                font-weight: bold;
                margin: 0 20px 0 10px;
            }
        }
    }

    .c-del-good {
        width: 22px;
        height: 22px;
        background-image: url("../../../../public/images/cart/del.png");
        background-size: 22px 22px;
        display: flex;
        margin-left: auto;
        margin-right: 10px;

        &:hover, & :active {
            background-image: url("../../../../public/images/cart/del-active.png");
        }
    }

    .order-container {

        font-size: 18px;
        border: $border;

        .goods-info {
            margin: 10px 0;

            .master-img-div {
                width: 100px;
                height: 100px;
                margin-left: 20px;

                img {
                    width: 100px;
                    height: 100px;
                }
            }

            div {
                margin-left: 10px;
                font-size: 14px;
                color: #666;

                span {
                    &:nth-child(1) {
                        font-size: 16px;
                        font-weight: bold;
                        color: #333;
                        margin-right: 10px;
                    }
                }
            }

        }

        .goods-item {
            border-bottom: $border;
            border-right: $border;
        }

        .order-col-item {
            height: 100% !important;
            border-right: $border;
        }

        .order-col-item-right {
            border-right: 0;
            font-size: 16px;

            .iconfont {
                color: #ff4400;
                margin-right: 5px;
            }

            .state-item {
                margin: 8px;

                span {
                    &:hover {
                        color: #ff4400;
                        padding-bottom: 2px;
                        border-bottom: 1px solid #ff4400;
                    }
                }

                .address-popover {
                    display: inline-block;
                }
            }

            .to-pay-btn {
                width: 86px;
                margin-left: 5px;
                margin-top: 5px;
                padding: 6px 0;
            }
        }

        .order-right-row {
            height: 100%;
        }
    }

    .order-blue-right {
        border: $blue-border !important;
    }

    .goods-blue-item {
        border-bottom: $blue-border !important;
        border-right: $blue-border !important;
    }

    .order-col-blue-item {
        border-right: $blue-border !important;
    }

    .order-blue-header {
        background: $blue-background !important;
    }

    .order-blue-container {
        border: $blue-border !important;
    }

    .none-bottom-border {
        border-bottom: 0 !important;
    }
</style>
