<template>
    <div class="home">
        <c-head></c-head>
        <div class="bread">
            <c-bread></c-bread>
        </div>
        <div class="goods-list-container">
            <c-price-range @change="onPriceChange"></c-price-range>
            <div class="goods-list">
                <div class="sort-container xy-center">
                    <c-sort-btn class="goods-sort" :sort-type="sortType" @change="changeSort"/>
                </div>
                <div class="good-container" v-if="goodsList.length"
                     :class="(goodsList.length % 3) !== 0 ? 'fill-space' : ''">
                    <c-good-item v-for="(item, key) in goodsList" :key="key" :goods-item="item"/>
                </div>
                <!--                <c-paging class="paging"/>-->
                <div class="load-infinite infinite-list" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <img src="../../assets/loading-svg/dual-ball-gray.svg" v-show="loading">
                </div>
            </div>
        </div>
        <c-foot/>
        <c-modal width="400px" :is-show-modal="isShowModal" v-on:confirm="onConfirm" v-on:cancel="onCancel"></c-modal>
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CModal from '@components/public/c-modal'
    import CBread from '@components/public/c-bread'
    import CPriceRange from './components/c-price-range'
    import CSortBtn from './components/c-sort-btn'
    import CGoodItem from './components/c-good-item'
    import { SORT_TYPE } from '@/config/constant'
    import { pGetGoodsList } from '@api/goods/params'

    export default {
        name: 'home',
        components: {
            CHead,
            CFoot,
            CModal,
            CBread,
            CPriceRange,
            CSortBtn,
            CGoodItem
        },
        data() {
            return {
                isShowModal: false,
                like: {
                    isLike: false,
                    likeNum: 9
                },
                num: 2,
                sortType: SORT_TYPE.ASC,
                goodsList: [],
                loading: false,
                busy: false
            }
        },
        mounted() {
            console.log('mounted')
            this.getGoodsList()
            this.getGoodsLikeList()
            this.$bus.$on('login', () => {
                this.getGoodsLikeList()
            })
        },
        methods: {
            onConfirm() {
                this.isShowModal = false
                console.log('确认')
            },
            onCancel(type) {
                this.isShowModal = false
                if (type === 'close') {
                    return
                }
                console.log('取消')
            },
            onLike() {
                this.like.likeNum += this.like.isLike ? -1 : 1
                this.like.isLike = !this.like.isLike
            },
            onChange(num) {
                console.log(num)
                this.num = num
            },
            onPriceChange(priceRange) {
                console.log(priceRange)
                pGetGoodsList.priceRange = priceRange
                this._resetPageNum()
            },
            changeSort() {
                this.sortType = this.sortType === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC
                console.log(this.sortType)
                pGetGoodsList.sortType = this.sortType
                this._resetPageNum()
            },
            // 是否重置
            getGoodsList(isReset = false) {
                this.$api.goods.getGoodsList(pGetGoodsList).then(res => {
                    console.log(res)
                    this.loading = false
                    this.busy = false
                    if (isReset) {
                        this.goodsList = []
                    }
                    if (res.goodsList.length) {
                        this.goodsList = this.goodsList.concat(res.goodsList)
                    } else {
                        this.busy = true
                    }
                })
            },
            loadMore() {
                this.busy = true
                this.loading = true
                setTimeout(() => {
                    ++pGetGoodsList.currentPage
                    this.getGoodsList()
                }, 500)
            },
            // 获取商品点赞列表
            getGoodsLikeList() {
                this.$api.user.getGoodsLikeList().then(res => {
                    this.$store.dispatch('setGoodsLikeList', res.goodsLikeList)
                }).catch(err => {
                    console.error(err)
                    if (!err.goodsLikeList) {
                        this.$store.dispatch('setGoodsLikeList', [])
                    }
                })
            },
            // 重置页码
            _resetPageNum() {
                pGetGoodsList.currentPage = 0
                this.getGoodsList(true)
            }
        },
        destroyed() {
            console.log('destoryed')
            pGetGoodsList.currentPage = 0
            pGetGoodsList.sortType = 'ASC'
        }
    }
</script>

<style scoped lang="scss">
    .home {
        width: 100%;
        /*background: #42b983;*/
        background: rgba(246, 246, 246, 1);
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

        .goods-list-container {
            width: 1200px;
            display: flex;
            justify-content: left;
            margin-left: 20px;
            margin-top: 10px;

            .goods-list {
                display: flex;
                flex-direction: column;

                .sort-container {
                    width: 920px;
                    height: 53px;
                    margin-left: 26px;
                    justify-content: flex-end;
                    background: #fff;

                    .goods-sort {
                        margin-right: 30px;
                    }
                }

                .good-container {
                    width: 920px;
                    margin-left: 26px;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }

                .fill-space:after {
                    content: "";
                    width: 288px;
                    height: 496px;
                }

                .paging {
                    margin: 0 auto;
                }

            }
        }
    }

    .load-infinite {
        margin-top: 50px;
        height: 100px;
        text-align: center;
        /*background: ;*/

        img {
            width: 50px;
            height: 50px;
        }
    }
</style>
