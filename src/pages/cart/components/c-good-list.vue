<template>
    <div class="c-good-list container" :class="isMyOrder ? 'components-components' : ''">
        <el-row class="c-row y-center">
            <el-col v-if="showCheckBox" :span="isShowAccount ? 1 : 2">
                <div class="c-good-sort xy-center">
                    <img v-if="isShowAccount" src="../../../../public/images/cart/sort.png">
                </div>
            </el-col>
            <el-col :span="4">
            </el-col>
            <el-col :span="4">
                <span>宠物信息</span>
            </el-col>
            <el-col :span="4">
                <span>单价</span>
            </el-col>
            <el-col :span="4">
                <span>数量</span>
            </el-col>
            <el-col :span="isShowAccount ? 5 : 6">
                <span>金额</span>
            </el-col>
            <el-col v-if="isShowAccount" :span="2">
                <span>编辑</span>
            </el-col>
        </el-row>
        <div class="c-good-row">
            <c-good-list-item :is-show-account="isShowAccount" :is-my-order="isMyOrder"
                              :show-check-box="showCheckBox"></c-good-list-item>
        </div>
    </div>
</template>

<script>
    import CGoodListItem from './c-good-list-item'

    export default {
        name: 'CGoodList',
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
            showCheckBox: {
                type: Boolean,
                default: true
            }
        },
        components: {
            CGoodListItem
        },
        mounted() {
            console.log('hello world')
        }
    }
</script>

<style lang="scss">
    .c-good-list {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(46, 50, 51, 1);
        flex-direction: column;
        justify-content: left;
        width: 1200px;

        .c-row {
            display: flex;
            padding: 15px 0;
            border-bottom: 1px solid rgba(235, 235, 235, 1);
            width: 1200px;

            .c-good-sort {
                padding: 0 4px;
                margin-right: 12px;
            }

            .el-col {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

    }

    .my-order {
        $width: 880px !important;
        width: $width;
        justify-content: left;

        .c-row {
            width: $width;
        }
    }
</style>
