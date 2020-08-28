<template>
    <div class="order">
        <c-head></c-head>
        <div class="bread">
            <c-bread></c-bread>
        </div>
        <c-timeline :cur-step="step"></c-timeline>
        <div class="step-group">
            <div v-if="step === 1" class="group-1 yx-center">
                <div class="address-container" :class="(5 % 3) !== 0 ? 'fill-space' : ''">
                    <c-address :is-selected="index === selectedAddressIndex" v-for="(item, index) in addressList"
                               :key="index"
                               :address="item" @click.native="selectedAddressIndex = index"/>
                    <c-new-address/>
                </div>
                <div class="down-more">
                    <span>更多地址</span>
                    <img src="../../../public/images/order/down-more.png"/>
                </div>
                <button class="button-next" @click="changeStep(2)">下一步</button>
            </div>
            <div v-if="step === 2" class="group-2">
                <c-good-list class="c-good-list" :show-check-box="false"/>
                <div class="btn-group1">
                    <button @click="changeStep(1)">返回</button>
                    <button @click="changeStep(3)">提交订单</button>
                </div>
            </div>
            <div v-if="step === 3" class="group-3 xy-center">
                <c-order-success :order-id="orderId" :total-amount="totalAmount" :is-payed="false"/>
                <div class="btn-group2">
                </div>
            </div>
            <div v-if="step === 4" class="group-3 xy-center">
                <c-order-success :order-id="orderId" :total-amount="totalAmount" :is-payed="true"/>
                <div class="btn-group2">
                    <button @click="goBack">继续购物</button>
                    <button @click="goToMy">查看订单</button>
                </div>
            </div>
        </div>
        <div class="bottom-line"></div>
        <c-foot></c-foot>
        <c-pay-modal v-if="showPay" :show-pay="showPay" :is-clear-arr="isClearArr" @hide="hidePayModal"
                     :should-pay-money="totalAmount" @password="payForOrder" @clear="isClearArr = false"
                     @forgot="onForgotKey"/>
        <c-pay-modal v-if="showSetKey" :is-set-key="true" @hide="hideSetModal" @set="onSet"/>
        <c-modal v-if="showModal"
                 width="400px"
                 title="温馨提示"
                 context="您有未支付的订单，忍心离开吗"
                 confirm-text="去支付"
                 cancel-text="残忍离开"
                 :is-show-cancel="true"
                 :is-show-modal="showModal"
                 :show-close="false"
                 v-on:confirm="onConfirm"
                 v-on:cancel="onCancel"/>
        <c-modal v-if="showSetKeyTip"
                 width="400px"
                 title="温馨提示"
                 context="首次使用需要设置支付密码，请先设置"
                 confirm-text="设置"
                 cancel-text="取消"
                 :is-show-cancel="true"
                 :is-show-modal="showSetKeyTip"
                 :show-close="false"
                 v-on:confirm="onSetKeyTipConfirm"
                 v-on:cancel="showSetKeyTip = false"/>
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CBread from '@components/public/c-bread'
    import CTimeline from './components/c-timeline'
    import CAddress from '@components/public/c-address'
    import CPayModal from '@components/public/c-pay-modal'
    import CNewAddress from './components/c-new-address'
    import COrderSuccess from './components/c-order-success'
    import CGoodList from '../cart/components/c-good-list'
    import CModal from '@components/public/c-modal'

    import { pCreateOrderItem, pCreateOrder, pPayForOrder } from '@api/order/params'
    import { pGetGoodsInfoList } from '@api/goods/params'

    export default {
        name: 'order',
        components: {
            CHead,
            CFoot,
            CBread,
            CTimeline,
            CAddress,
            CNewAddress,
            COrderSuccess,
            CGoodList,
            CPayModal,
            CModal
        },
        data() {
            return {
                step: 1,
                showPay: false,
                selectedAddressIndex: 0,
                addressList: [],
                orderId: '', // 订单号
                totalAmount: 0, // 待支付的金额
                showModal: false,
                isPayed: false,
                hasPaykey: false,
                showSetKey: false,
                showSetKeyTip: false, // 显示设置密码提示框
                isClearArr: false, // 是否清空密码输入框
                isForgot: false // 是否为忘记密码
            }
        },
        methods: {
            // 该表进度条
            changeStep(step) {
                switch (step) {
                    case 2:
                        if (!this._checkAddressIsExist()) {
                            return
                        }
                        this.fetchGoodsInfo()
                        break
                    case 3:
                        this.createOrder()
                        break
                }
                if (!this.hasPaykey && step === 3) {
                    return
                }
                this.step = step
            },
            fetchAddressList() {
                this.$api.user.getAddress().then(res => {
                    console.log(res)
                    this.addressList = res.addressList
                    if (this.addressList.length) {
                        pCreateOrder.addressId = this.addressList[0].addressId
                    }
                }).catch(err => {
                    console.error(err)
                })
            },
            fetchGoodsInfo() {
                pGetGoodsInfoList.goodsIdList = this._getGoodsIdList()
                this.$api.goods.getGoodsInfoList(pGetGoodsInfoList).then(res => {
                    this.$store.dispatch('setGoodsInfoList', this._addNumToGoodsInfoList(res.goodsInfoList))
                }).catch(err => {
                    console.error(err)
                })
            },
            fetchBalance() {
                this.$api.account.getBalance().then(res => {
                    console.log(res)
                })
            },
            createOrder() {
                if (!this.hasPaykey) {
                    this.showSetKeyTip = true
                    return
                }
                pCreateOrder.addressId = this.addressList[this.selectedAddressIndex].addressId
                this.$api.order.createOrder(pCreateOrder).then(res => {
                    console.log(res)
                    this.orderId = res.orderId
                    this.totalAmount = res.totalAmount
                    this._controllerPayModal(true)
                }).catch(err => {
                    console.log(err)
                })
            },
            payForOrder(paykey) {
                pPayForOrder.paykey = paykey
                pPayForOrder.orderId = this.orderId
                // const loading = this.$tips.loading('支付中，请稍后')
                this.$api.order.payForOrder(pPayForOrder).then(res => {
                    // this._paySuccess(loading)
                    this.isPayed = true
                    this.changeStep(4)
                    setTimeout(() => {
                        this.$store.dispatch('saveUserInfo', { ...res })
                        this._controllerPayModal(false)
                    }, 500)
                }).catch(err => {
                    console.log(err)
                    // loading.close()
                    this.isClearArr = true
                    // this.changeStep(4)
                    // this._controllerPayModal(false)
                    // this._paySuccess(loading)
                })
            },
            onConfirm() {
                this.showModal = false
                this.showPay = true
            },
            onCancel() {
                this.showModal = false
                this.goBack()
                console.log('跳转至下一步')
            },
            onSetKeyTipConfirm() {
                this.showSetKeyTip = false
                this.showSetKey = true
            },
            // 监听设置密码事件
            onSet() {
                this.showSetKey = false
                this.hasPaykey = true
                if (this.isForgot) {
                    this.showPay = true
                    this.isForgot = false
                }
            },
            hidePayModal() {
                this.$nextTick(() => {
                    this.showPay = false
                    this.showModal = true
                })
            },
            hideSetModal() {
                this.$nextTick(() => {
                    this.showSetKey = false
                    if (this.isForgot) {
                        this.showPay = true
                        this.isForgot = false
                    }
                })
            },
            goToMy() {
                if (this.$route.query.orderId) {
                    this.$router.replace('/my')
                } else {
                    this.$router.push('/my')
                }
            },
            goBack() {
                this.$router.go(-1)
            },
            // 监听忘记密码
            onForgotKey() {
                this.$nextTick(() => {
                    this.isForgot = true
                    this.showPay = false
                    setTimeout(() => {
                        this.showSetKey = true
                    }, 10)
                    // this.showSetKey = true
                })
            },
            // _paySuccess(obj) {
            //     setTimeout(() => {
            //         obj.close()
            //         this.$tips.success('支付成功')
            //         this._controllerPayModal(false)
            //     },500)
            // },
            // 检查收获地址是否存在
            _checkAddressIsExist() {
                if (!this.addressList.length) {
                    this.$tips.error('请先添加地址')
                    return false
                }
                return true
            },
            // 获取goodsId列表
            _getGoodsIdList() {
                const goodsIdList = []
                pCreateOrder.orderList.forEach(item => {
                    goodsIdList.push(item.goodsId)
                })
                return goodsIdList
            },
            // 合并商品信息列表，将购买数量加入商品信息列表中
            _addNumToGoodsInfoList(goodsInfoList) {
                goodsInfoList.forEach(item => {
                    item.goodsNum = pCreateOrder.orderList.find(goods => goods.goodsId === item.goodsId).purchaseNum
                })
                return goodsInfoList
            },
            // 显示密码输入框
            _controllerPayModal(isShow) {
                this.showPay = isShow
            },
            // 检查是否已经设置了支付密码
            _checkHasPaykey() {
                this.$api.account.checkHasPaykey().then(res => {
                    this.hasPaykey = res.hasPaykey
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        mounted() {
            console.log(this.$route.query)
            pCreateOrder.orderList = []
            this._checkHasPaykey()
            if (this.$route.query.purchaseList) {
                pCreateOrder.orderList = this.$route.query.purchaseList
            } else if (this.$route.query.orderId) {
                this.orderId = this.$route.query.orderId
                this.totalAmount = this.$route.query.totalAmount
                this.step = 3
                this._controllerPayModal(true)
                return
            } else {
                pCreateOrderItem.goodsId = this.$route.query.goodsId
                pCreateOrderItem.purchaseNum = this.$route.query.purchaseNum
                pCreateOrder.orderList.push(pCreateOrderItem)
            }
            console.log(pCreateOrder)
            this.fetchAddressList()
            this.$bus.$on('updateAddressList', () => {
                this.fetchAddressList()
            })
        },
        destroyed() {
            this.$store.dispatch('setGoodsInfoList', [])
        }
    }
</script>

<style scoped lang="scss">
    .order {
        width: 100%;
        /*background: #42b983;*/
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .bread {
            width: 100%;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .step-group {
            width: 1150px;
            padding: 0 25px;
            display: flex;
            flex-direction: column;
            flex: 1;
            margin-bottom: 20px;

            button {
                width: 183px;
                height: 45px;
                line-height: 45px;
                background: #FF4400;
                color: #fff;
                font-size: 18px;
                border-radius: 2px;
                outline: none;
                border: 0;
            }

            .button-next {
                margin-left: auto;
            }

            button:active {
                animation: fade .4s infinite;
                -webkit-animation: fade .4s infinite;
            }

            .group-2 {
                width: 1200px;
                display: flex;
                flex-direction: column;

                .c-good-list {
                    margin-top: 20px;
                }

                .btn-group1 {
                    width: 1150px;
                    display: flex;
                    justify-content: space-between;
                }
            }

            .group-3 {
                width: 100%;
                margin-top: 20px;
                display: flex;
                flex-direction: column;

                .btn-group2 {
                    width: 550px;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
            }

        }

        .address-container {
            width: 950px;
            margin: 20px auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .fill-space::after {
            content: "";
            width: 294px;
            height: 167px;
        }

        .down-more {
            width: 950px;
            margin: 0 auto 20px auto;
            text-align: left;
            font-size: 14px;
            font-weight: 300;
            color: rgba(136, 136, 136, 1);

            img {
                margin-left: 5px;
                width: 12px;
                height: 7px;
            }
        }
    }

</style>
