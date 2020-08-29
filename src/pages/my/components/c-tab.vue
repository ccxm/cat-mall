<template>
    <div class="c-tab-container x-center">
        <el-tabs class="c-tab" v-model="tempTab">
            <el-tab-pane :label="tabList[0]" :name="'0'">
                <c-order-container/>
            </el-tab-pane>
            <el-tab-pane :label="tabList[1]" :name="'1'">
                <c-address-container/>
            </el-tab-pane>
            <el-tab-pane :label="tabList[2]" :name="'2'">
                <iframe class="global-scrollbar api-doc"
                        src="https://mall.cxmmao.com/cat-mall-api-doc/">
                </iframe>
            </el-tab-pane>
            <!--            <el-tab-pane :label="tabList[3]" :name="'3'">-->
            <!--                {{tabList[3]}}-->
            <!--            </el-tab-pane>-->
            <!--            <el-tab-pane :label="tabList[4]" :name="'4'">-->
            <!--                {{tabList[4]}}-->
            <!--            </el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    import CAddressContainer from './c-address-container'
    import COrderContainer from './c-order-container'

    export default {
        name: 'CTab',
        props: ['selectedTab', 'tabList'],
        components: {
            CAddressContainer,
            COrderContainer
        },
        data() {
            return {
                tempTab: '0'
            }
        },
        watch: {
            tempTab: function(val) {
                this.$emit('changeTab', val)
                console.log(this.tempTab)
            },
            selectedTab: function(val) {
                this.tempTab = val + ''
                if (val === 2) {
                    window.open('https://mall.cxmmao.com/cat-mall-api-doc/')
                }
            }
        },
        methods: {
            // openApiDoc() {
            //     window.open('https://mall.cxmmao.com/cat-mall-api-doc/')
            // }
        }
    }
</script>

<style lang="scss">
    .c-tab-container {
        width: 1010px !important;
        background: #fff !important;
        padding: 44px 0;
        margin-left: 15px;
    }

    .c-tab {
        width: 880px;
        /*padding: 44px 65px;*/
        min-height: 418px;
        background: #fff;
    }

    .el-tabs__nav {
        .el-tabs__active-bar {
            width: 100px !important;
            height: 3px !important;
            background: #FF4400 !important;
        }

        .el-tabs__item {
            padding: 0;
            width: 100px;
            height: 50px;
            text-align: center;
            font-size: 20px;
            line-height: 50px;
            color: #666;

            &:hover {
                color: #FF4400;
            }
        }

        .el-tabs__item.is-active {
            color: #FF4400;
            font-weight: 500;
        }
    }

    .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px !important;
        background-color: #E4E7ED;
        z-index: 1;
    }

    .c-good-list {
        margin-left: 0;
    }

    .address-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 600px;
        margin: 0 auto;
    }

    .api-doc {
        width: 100%;
        height: 500px;
        border: 0;
    }
</style>
