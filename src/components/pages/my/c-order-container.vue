<template>
    <div class="c-order-container">
        <el-row class="order-title">
            <el-col class="x-center" :span="8">宝贝</el-col>
            <el-col class="x-center" :span="4">单价</el-col>
            <el-col class="x-center" :span="4">数量</el-col>
            <el-col class="x-center" :span="4">实付款</el-col>
            <el-col class="x-center" :span="4">订单状态</el-col>
        </el-row>
        <c-order-item v-for="(item,index) in orderList" :order-item="item" :key="index" @del="reGetOrderList(true)"/>
        <div v-if="isLoaded && !orderList.length" class="none-data yx-center">
            <img src="./../../../../public/images/my/none-data.svg">
            <span>暂无订单数据，赶快去下单吧~</span>
        </div>
        <div class="load-infinite infinite-list" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <img src="./../../../assets/loading-svg/dual-ball.svg" v-show="loading">
        </div>
    </div>
</template>

<script>
    import COrderItem from './c-order-item'
    import { pGetOrderList } from './../../../js/http/param'

    export default {
        name: "COrderContainer",
        components: {
            COrderItem
        },
        data() {
            return {
                orderList: [],
                loading: false,
                busy: false,
                isLoaded: false
            }
        },
        methods: {
            fetchOrderList(isClearArr = false, isDel = false) {
                this.$api.getOrderList(pGetOrderList).then(res => {
                    console.log(res.orderList)
                    this.loading = false
                    this.busy = false
                    if(res.orderList.length) {
                        if(isClearArr) {
                            this.orderList = []
                        }
                        this.orderList = this.orderList.concat(res.orderList)
                    }else {
                        console.log('isDel', isDel)
                        if(isDel) {
                            this.orderList = []
                        }
                        this.busy = true
                    }
                    this.isLoaded = true
                })
            },
            loadMore () {
                console.log('自动地加载')
                this.busy = true
                this.loading = true
                setTimeout(() => {
                    ++pGetOrderList.currentPage
                    // ++pGetCartList.curPage
                    this.fetchOrderList()
                }, 500)
            },
            // 重新获取订单，监听订单被删除的情况
            reGetOrderList(isDel = false) {
                console.log('重置订单')
                this.busy = false
                this.loading = false
                pGetOrderList.currentPage = 0
                this.fetchOrderList(true, isDel)
            }
        },
        mounted() {
            this.fetchOrderList()
        },
        destroyed() {
            pGetOrderList.currentPage = 0
        }
    }
</script>

<style lang="scss" scoped>
    $width: 880px;
    $background: #f5f5f5;

    .c-order-container {
        width: $width;

        .order-title {
            background: $background;
            color: #333;
            font-size: 16px;
            padding: 8px 0;
            margin-bottom: 10px;
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

    .none-data {
        margin-top: 80px;
        span {
            margin-top: 20px;
            font-size: 16px;
            color: #aaa;
            font-weight: 300;
        }
    }
</style>
