<template>
    <div class="c-pay-modal" v-if="showPay">
        <c-modal :title="getTitle" :is-show-confirm="false" title-weight="400"
                 :is-show-modal="showPay" :is-custom="true" :width="'400px'" bg-color="#fff" @hide="hide">
            <div class="pay-container" slot="custom">
                <div class="yx-center" v-if="!isSetKey">
                    <span class="title">丑小喵商城</span>
                    <c-money :money="shouldPayMoney" color="#333"/>
                </div>
                <div class="pay-input-container" :class="isSetKey ? 'set-key' : ''">
                    <div class="balance" v-if="!isSetKey">
                        <span>余额</span>
                        <span>{{getBalance}}元</span>
                    </div>
                    <div class="pay-input">
                        <input maxlength="1" style="-webkit-text-security:disc;text-security:disc;" autocomplete="off"
                               type="text" :name="index" v-for="index in 6" :key="index" :ref="'password' + index"
                               @input="onInputPassword">
                    </div>
                    <div v-if="!isSetKey" class="forgot-password" @click="forgotKey">
                        <span>忘记密码?</span>
                    </div>
                </div>
                <div class="pay-input-container" v-if="isSetKey && repeatKey">
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
            </div>
        </c-modal>
    </div>
</template>

<script>
    import CModal from './c-modal'
    import CMoney from './c-money'
    import { pGetVerifyCode } from '@api/public/params'
    import { pUpdatePaykey } from '@api/account/params'
    import { testVerifyCode } from '../../utils/utils'

    export default {
        name: 'CPayModal',
        components: {
            CModal,
            CMoney
        },
        props: {
            showPay: {
                type: Boolean,
                default: true
            },
            shouldPayMoney: {
                type: Number,
                default: 0
            },
            isSetKey: {
                type: Boolean,
                default: false
            },
            isClearArr: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            getBalance() {
                return this.$store.getters.getUserInfo.balance.toFixed(2)
            },
            getTitle() {
                if (!this.isSetKey) {
                    return '请输入支付密码'
                } else if (!this.repeatKey) {
                    return '设置支付密码'
                } else {
                    return '请再次输入密码'
                }
            }
        },
        watch: {
            isClearArr(val) {
                if (val) {
                    this.payPassword = []
                    this._clearInput()
                }
            }
        },
        data() {
            return {
                payPassword: [],
                repeatKey: false,
                verifyCode: '',
                time: 60,
                errTip: false,
                getting: false,
                payKey: ''
            }
        },
        methods: {
            hide() {
                console.log('hide')
                this.$emit('hide')
            },
            onInputPassword(val) {
                console.log(val.target.value)
                if (!val.target.value) {
                    this.onDelete()
                    return
                }
                // 名字绑定了数组的下标
                const index = parseInt(val.target.name) - 1
                if (index > this.payPassword.length) {
                    this.payPassword.push(val.target.value)
                    console.log(`password${this.payPassword.length}`)
                    this.$refs[`password${this.payPassword.length}`][0].value = val.target.value
                    val.target.value = ''
                } else {
                    this.payPassword.push(val.target.value)
                }
                // 密码输入完成
                if (this.payPassword.length >= 6) {
                    console.log(this.payPassword.join(''))
                    if (this.isSetKey) {
                        this.savePaykey()
                        return
                    }
                    this.$emit('password', this.payPassword.join(''))
                    return
                }
                this.$refs[`password${this.payPassword.length + 1}`][0].focus()
            },
            onDelete() {
                if (!this.payPassword.length) {
                    return
                }
                this.payPassword.length--
                if (this.payPassword.length) {
                    this.$refs[`password${this.payPassword.length}`][0].focus()
                }
            },
            // 保存支付密码
            savePaykey() {
                if (!this.repeatKey) {
                    this.payKey = this.payPassword.join('')
                    this.repeatKey = true
                    this.payPassword = []
                    this._clearInput()
                    console.log(this.payPassword)
                } else if (this.payKey !== this.payPassword.join('')) {
                    this.$tips.error('两次密码不一致')
                } else if (!this.verifyCode || testVerifyCode(this.verifyCode)) {
                    this.$tips.warn('请输入验证码')
                } else {
                    console.log('设置中')
                    this.setPayKey()
                }
            },
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
            onInput() {
                this.errTip = false
                if (this.verifyCode.length === 6) {
                    if (!testVerifyCode(this.verifyCode)) {
                        this.errTip = true
                        return
                    }
                    if (this.payKey !== this.payPassword.join('')) {
                        this.$tips.error('两次密码不一致')
                        return
                    }
                    this.setPayKey()
                    // this.recharge()
                }
            },
            setPayKey() {
                pUpdatePaykey.verifyCode = this.verifyCode
                pUpdatePaykey.paykey = this.payKey
                pUpdatePaykey.email = this.$store.getters.getUserInfo.email
                this.$api.account.updatePaykey(pUpdatePaykey).then(res => {
                    this.$emit('set')
                })
            },
            forgotKey() {
                console.log('忘记了')
                this.$emit('forgot')
            },
            _clearInput() {
                for (let i = 1; i <= 6; i++) {
                    this.$refs[`password${i}`][0].value = ''
                }
                this.$refs.password1[0].focus()
                if (!this.isSetKey) {
                    this.$emit('clear')
                }
            }
        },
        mounted() {
            console.log('执行了')
            console.log(this.$refs.password1)
            if (this.$refs.password1) {
                this.$nextTick(function() {
                    this.$refs.password1[0].focus()
                })
            }
        },
        destroyed() {
            console.log('销毁了')
        }
    }
</script>

<style lang="scss">

    $border: 1px solid #e7e7e7;

    .pay-container {
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

        .yx-center {
            padding: 20px 0;

            .title {
                font-size: 20px;
                font-weight: 300;
                margin-bottom: 10px;
                margin-left: 5px;
            }
        }

        .pay-input-container {
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

            .pay-input {
                margin-left: 30px;
                margin-top: 10px;
                width: 310px;
                height: 52px;
                display: flex;
                align-items: center;
                /*justify-content: space-around;*/
                border: 1px solid #888;
                border-radius: 3px;

                input {
                    width: 50px;
                    height: 50px;
                    text-align: center;
                    font-size: 25px;
                    padding: 0;
                    margin: 0;
                    outline: none;
                    border: {
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 2px solid #f7f7f7;
                    };

                    &:nth-last-child(1) {
                        border-right: none;
                    }
                }
            }
        }

        .forgot-password {
            margin-top: 15px;
            font-size: 16px;
            color: #409EFF;
            font-family: Source Han Sans CN;

            span {
                padding-bottom: 2px;

                &:hover {
                    border-bottom: 1px solid #409EFF;
                }
            }
        }

    }

    .set-key {
        padding: 20px 0;
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
