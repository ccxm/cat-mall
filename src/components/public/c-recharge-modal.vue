<template>
    <div>
        <c-modal title="账户充值" :is-show-confirm="false" title-weight="400"
                 :is-show-modal="showModal" :is-custom="true" :width="'400px'" bg-color="#fff" @hide="hide">
            <div class="recharge-container" slot="custom">
                <div class="recharge-item-container">
                    <div v-for="(item, key) in rechargeList" :key="key">
                        <div class="c-recharge-item xy-center"
                             :class="selectedKey === key ? 'select-recharge-item' : ''" @click="onSelect(key)">
                            <span>{{item}}</span>
                            <span>元</span>
                        </div>
                    </div>
                </div>
                <div class="recharge-input-container">
                    <el-input placeholder="请输入邮箱验证码" autocomplete="off" maxlength="6" v-model="verifyCode"
                              @input="onInput" class="verify-code">
                        <el-button v-if="time === 60" class="get-verify-code" slot="suffix" @click="getVerifyCode"
                                   :loading="getting">获取验证码
                        </el-button>
                        <span v-else class="get-verify-code-span" slot="suffix">{{time}}秒再次获取</span>
                    </el-input>
                    <div class="err-tip" v-show="errTip">
                        <i class="el-icon-warning">验证码格式不正确</i>
                    </div>
                </div>
            </div>
        </c-modal>
    </div>
</template>

<script>
    import CModal from './c-modal'
    import { pGetVerifyCode } from '@api/public/params'
    import { pRecharge } from '@api/account/params'
    import { testVerifyCode } from '../../utils/utils'

    export default {
        name: 'CRechargeModal',
        components: {
            CModal
        },
        data() {
            return {
                verifyCode: '',
                time: 60,
                errTip: false,
                rechargeList: [],
                getting: false,
                selectedKey: ''
            }
        },
        props: {
            showModal: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            getVerifyCode() {
                pGetVerifyCode.email = this.$store.getters.getUserInfo.email
                this.getting = true
                this.$api.public.getVerifyCode(pGetVerifyCode).then(res => {
                    console.log(res)
                    this.countdown()
                    setTimeout(() => {
                        this.getting = false
                    }, 990)
                })
            },
            // 倒计时
            countdown() {
                this.$tips.sendVerifyCode()
                const timer = setInterval(() => {
                    if (this.time <= 0) {
                        clearInterval(timer)
                        this.time = 60
                        return
                    }
                    this.time--
                }, 1000)
            },
            getRechargeList() {
                this.$api.account.getRechargeList().then(res => {
                    this.rechargeList = res.rechargeList
                }).catch(err => {
                    console.error(err)
                })
            },
            recharge() {
                if (!this.selectedKey) {
                    this.$tips.error('请先选择充值面值')
                    return
                }
                pRecharge.rechargeKey = this.selectedKey
                pRecharge.verifyCode = this.verifyCode
                pRecharge.email = this.$store.getters.getUserInfo.email
                console.log(pRecharge)
                this.$api.account.recharge(pRecharge).then(res => {
                    this.$store.dispatch('saveUserInfo', { ...res })
                    setTimeout(() => {
                        this.hide()
                    }, 1000)
                }).catch(err => {
                    console.error(err)
                })
            },
            onInput() {
                this.errTip = false
                if (this.verifyCode.length === 6) {
                    if (!testVerifyCode(this.verifyCode)) {
                        this.errTip = true
                        return
                    }
                    this.recharge()
                }
            },
            onSelect(key) {
                this.selectedKey = key
                if (this.selectedKey && this.verifyCode) {
                    this.recharge()
                }
            },
            hide() {
                this.$emit('hide')
            }
        },
        mounted() {
            this.getRechargeList()
        }
    }
</script>

<style lang="scss">
    $border: 1px solid #e7e7e7;
    $color: #00b537;

    .recharge-container {
        display: flex;
        flex-direction: column;
        margin: {
            top: 20px;
            bottom: 20px;
        }
        border-top: $border;
        width: 400px;
        /*height: 400px;*/
        /*padding: 0 20px;*/
        background: #fff;
        font-family: Source Han Sans CN;

        .recharge-item-container {
            padding: 10px 20px 30px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .title {
                font-size: 20px;
                font-weight: 300;
                margin-bottom: 10px;
                margin-left: 5px;
            }

            .c-recharge-item {
                width: 90px;
                padding: 8px;
                margin-top: 20px;
                border: 1.5px solid $color;
                border-radius: 4px;
                align-items: baseline;
                color: $color;

                span {
                    font-family: Source Han Sans CN;
                    font-size: 16px;
                    font-weight: 200;

                    &:nth-child(1) {
                        font-size: 26px;
                        font-weight: 400;
                        margin-right: 3px;
                    }
                }

                &:active, &:hover {
                    background: $color;
                    color: #fff !important;
                }
            }
        }

        .select-recharge-item {
            background: $color;
            color: #fff !important;
        }

        .recharge-input-container {
            width: 360px;
            margin-left: 20px;
            border-top: $border;

            .balance {
                padding: 5px 0;
                display: flex;
                justify-content: space-between;

                span {
                    font-size: 23px !important;
                    font-weight: 400;
                }
            }
        }

    }

    .verify-code {
        display: flex;
        align-items: center;
        padding-top: 15px;

        input {
            border: none;
            border-bottom: 1px solid #ee4400 !important;
            color: #ee4400;
            margin-bottom: 15px;
            font-size: 16px;
            border-radius: 0;
            padding-bottom: 8px;
            font-family: Source Han Sans CN;
            letter-spacing: 2px;

            &:active {
                border-bottom: 1px solid #ee4400 !important;
            }
        }

        .get-verify-code {
            margin-top: 13px;
            background: #ff4400;
            color: #fff;
            padding: 8px 12px;
            font-size: 12px;
            border-radius: 20px;
            display: inline-block;
            border: none;
            outline: none;

            &:active {
                animation: fade .6s infinite;
                -moz-animation: fade .6s infinite;
            }
        }

        .get-verify-code-span {
            margin-top: 11px;
            padding: 10px;
            font-size: 14px;
            color: #ff4400;
            display: inline-block;
        }
    }

</style>
