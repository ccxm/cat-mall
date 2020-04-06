<template>
    <div class="my">
        <c-head></c-head>
        <div class="bread">
            <c-bread></c-bread>
        </div>
        <div class="container">
            <c-user-info :selected-tab="selectedTab" :tab-list="tabList" v-on:changeTab="changeTab"/>
            <c-tab :selected-tab="selectedTab" :tab-list="tabList" v-on:changeTab="changeTab"/>
        </div>
        <c-foot></c-foot>
    </div>
</template>

<script>
    import CHead from './../components/public/c-head'
    import CFoot from './../components/public/c-foot'
    import CBread from './../components/public/c-bread'
    import CUserInfo from './../components/pages/my/c-user-info'
    import CTab from '../components/pages/my/c-tab'

    export default {
        name: 'my',
        components: {
            CHead,
            CFoot,
            CBread,
            CUserInfo,
            CTab
        },
        data() {
            return {
                selectedTab: 0,
                tabList: [
                    '我的订单',
                    '收货地址',
                    '接口文档',
                ]
            }
        },
        methods: {
            changeTab(index) {
                console.log(index)
                this.selectedTab = parseInt(index)
            }
        },
        mounted() {

        }

    }
</script>

<style scoped lang="scss">
    .my {
        width: 100%;
        background: #f2f2f2;
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

        .container {
            align-items: flex-start;
            margin: 10px 0;

            .c-tab {
                margin-left: 15px;
            }
        }
    }
</style>
