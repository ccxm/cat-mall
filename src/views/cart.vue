<template>
    <div class="card">
        <c-head></c-head>
        <div class="bread">
            <c-bread></c-bread>
            <div class="card-title y-center">
                <span>购物车</span>
            </div>
        </div>
        <div v-if="isLoadedCartList">
            <c-good-list v-if="cartList.length" :is-show-account="true"></c-good-list>
            <div v-else class="none-data yx-center">
                <img src="./../../public/images/cart/none-data.svg">
                <span>购物车暂无数据，赶快去逛逛吧~</span>
            </div>
        </div>
        <div class="load-infinite infinite-list" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <img src="./../assets/loading-svg/dual-ball.svg" v-show="loading">
        </div>
        <c-foot class="cart-foot"></c-foot>
    </div>
</template>

<script>
    import CHead from './../components/public/c-head'
    import CFoot from './../components/public/c-foot'
    import CBread from './../components/public/c-bread'
    import CGoodList from '../components/pages/cart/c-good-list'
    import {pBatchGoodsInfo, pGetCartList} from './../js/http/param'
    import { PAGE_SIZE } from './../js/const-table'

    export default {
        name: 'cart',
        components: {
            CHead,
            CFoot,
            CBread,
            CGoodList
        },
        data() {
            return {
                cartList: [],
                loading: false,
                busy: false,
                isLoadedCartList: false
            }
        },
        methods: {
            // 是否清理数组，清理就置空数组看
            getCartList(isClearArr = false, isDel = false) {
                this.$api.getCartList(pGetCartList).then(res => {
                    console.log(res)
                    this.loading = false
                    this.busy = false
                    if(res.cartList.length) {
                        pBatchGoodsInfo.goodsIdList = this._getGoodsIdList(res.cartList)
                        if (isClearArr) {
                            this.cartList = []
                        }
                        this.cartList = this.cartList.concat(res.cartList)
                        this.getGoodsInfoList()
                    }else {
                        if(isDel) {
                            this.cartList = []
                        }
                        this.busy = true
                    }
                    this.isLoadedCartList = true
                })
            },
            getGoodsInfoList() {
                this.$api.batchGetGoodsInfo(pBatchGoodsInfo).then(res => {
                    this._addNumToGoodsList(res.goodsInfoList)
                })
            },
            loadMore () {
                console.log('自动地加载')
                this.busy = true
                this.loading = true
                setTimeout(() => {
                    ++pGetCartList.curPage
                    this.getCartList()
                }, 500)
            },
            // 向商品列表中加入购买数量
            _addNumToGoodsList(goodsInfo) {
                this.cartList.forEach(item => {
                    item = Object.assign(item, goodsInfo.find(elem => item.goodsId === elem.goodsId))
                })
                this.$store.dispatch('setGoodsInfoList', this.cartList)
            }
            ,
            _getGoodsIdList(arr) {
                const temp = []
                arr.forEach(item => {
                    temp.push(item.goodsId)
                })
                return temp
            }

        },
        mounted() {
            this.getCartList()
            this.bus.$on('getCartList', (isDel = false) => {
                // 如果删除了某条数据，则获取到当前的长度
                pGetCartList.curPage = 0
                this.getCartList(true, isDel)
            })
        },
        destroyed() {
            pGetCartList.curPage = 0
            this.$store.dispatch('setGoodsInfoList', [])
        }
    }
</script>

<style scoped lang="scss">
    .card {
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
            flex-direction: column;
            padding: 10px 0;

            .card-title {
                width: 1200px;
                height: 53px;
                font-size: 16px;
                font-family: Source Han Sans CN;
                color: rgba(102, 102, 102, 1);
                background: #fff;

                span {
                    margin-left: 10px;
                }

            }
        }

    }

    .load-infinite {
        margin-top: 50px;
        height: 100px;
        text-align: center;

        img {
            width: 50px;
            height: 50px;
        }
    }

    .cart-foot {
        border-top: 10px solid #f0f0f0;
    }

    .none-data {
        margin-top: 80px;
        span {
            font-size: 16px;
            color: #aaa;
            font-weight: 300;
        }
    }
</style>
