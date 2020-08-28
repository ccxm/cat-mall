<template>
    <div class="c-header-image">
        <el-dropdown>
            <div>
                <img :src="(getUserInfo ? getUserInfo.avatarUrl : '') | addImagePrefix">
            </div>
            <el-dropdown-menu slot="dropdown" class="c-dropdown">
                <el-dropdown-item>邮箱：{{(getUserInfo ? getUserInfo.email : '') | formatString(18)}}</el-dropdown-item>
                <el-dropdown-item>昵称：{{(getUserInfo ? getUserInfo.nickName : '') | formatString(18)}}</el-dropdown-item>
                <el-dropdown-item class="y-center__between">
                    <span>账户余额：{{getUserInfo ? getUserInfo.balance.toFixed(2) : ''}}元</span>
                    <el-button type="primary" class="recharge" @click="showRecharge = true">充值</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="goToPersonal">我的主页</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <c-recharge-modal :show-modal="showRecharge" @hide="showRecharge = false"/>
    </div>
</template>

<script>
    import tokenInstance from '@utils/dataStore'
    import CRechargeModal from './c-recharge-modal'

    export default {
        name: 'CHeaderImage',
        computed: {
            getUserInfo() {
                return this.$store.getters.getUserInfo
            }
        },
        components: {
            CRechargeModal
        },
        data() {
            return {
                showRecharge: false
            }
        },
        methods: {
            logout() {
                tokenInstance.deleteToken()
                this.$store.dispatch('saveUserInfo', null)
                if (this.$route.path !== '/') {
                    this.$router.replace('/')
                }
            },
            goToPersonal() {
                if (this.$route.path !== '/my') {
                    this.$router.push('/my')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .c-header-image {
        img {
            width: 50px;
            height: 50px;
            border-radius: 100%;
            margin-top: 8px;
            margin-right: 10px;
        }
    }

    .c-dropdown {
        width: 240px;
    }

    .recharge {
        width: 50px;
        margin-left: auto;
        padding: 4px 0;
    }

</style>
