<template>
    <div class="login xy-center">
        <el-dialog
                :title="isLogin ? '登录' : isResetPassword ? '重置密码' : '注册'"
                :visible.sync="dialogVisible"
                width="300px">
            <div>
                <el-input
                        placeholder="请输入邮箱"
                        v-model="input.email">
                    <img slot="prefix" src="./../../../public/images/public/email.png"/>
                </el-input>
                <div class="err-tip" v-show="errTip[0]">
                    <i class="el-icon-warning">邮箱格式不正确</i>
                </div>
                <el-input
                        :placeholder="isResetPassword ? '请输入新密码'  : '请输入新密码'"
                        :type="isShowPwd ? 'text' : 'password'"
                        v-model="input.password">
                    <img slot="prefix" src="./../../../public/images/public/pwd.png"/>
                    <img slot="suffix" @click="isShowPwd = !isShowPwd"
                         :src="require(`./../../../public/images/public/show${isShowPwd}.png`)"/>
                </el-input>
                <div class="err-tip" v-show="errTip[1]">
                    <i class="el-icon-warning">账号密码格式不正确</i>
                </div>
                <el-input v-if="!isLogin"
                          placeholder="请再次输入密码"
                          :type="isShowPwd ? 'text' : 'password'"
                          v-model="input.repeatPwd">
                    <img slot="prefix" src="./../../../public/images/public/pwd.png"/>
                    <img slot="suffix" @click="isShowPwd = !isShowPwd"
                         :src="require(`./../../../public/images/public/show${isShowPwd}.png`)"/>
                </el-input>
                <div class="err-tip" v-show="errTip[2]">
                    <i class="el-icon-warning">两次密码不一致</i>
                </div>
                <el-input v-if="!isLogin"
                          placeholder="邮箱验证码"
                          v-model="input.verifyCode">
                    <img slot="prefix" src="./../../../public/images/public/email.png"/>
                    <el-button v-if="time === 60" class="get-verify-code" slot="suffix" @click="getVerifyCode"
                               :loading="getting">获取验证码
                    </el-button>
                    <span v-else class="get-verify-code-span" slot="suffix">{{time}}秒再次获取</span>
                </el-input>
                <div class="err-tip" v-show="errTip[3]">
                    <i class="el-icon-warning">验证码格式不正确</i>
                </div>
                <div class="yx-center">
                    <el-button round @click="submit">{{isLogin ? '登录' : isResetPassword ? '重置密码' : '注册'}}</el-button>
                    <div class="footer-btn">
                        <el-button type="text" @click="changeMode">立即{{isLogin ? '注册' : '登录'}}</el-button>
                        <el-button type="text" @click="changeResetMode">{{isResetPassword ? '立即注册' : '忘记密码？'}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <c-modal :context="isLogin ? '登录成功' : '注册成功'" :is-show-cancel="false" @hide="showToast = false"
                 :is-show-modal="showToast"/>
    </div>
</template>

<script>
    import CModal from './c-modal'
    import { testEmail, testPassword, testVerifyCode } from '../../utils/utils'
    import { pLogin, pRegister, pResetPassword } from '@api/user/params'
    import { pGetVerifyCode } from '@api/public/params'
    import dataStore from '@utils/dataStore'

    export default {
        name: 'CLogin',
        components: { CModal },
        data() {
            return {
                dialogVisible: this.showLogin,
                showToast: false,
                isShowPwd: false, // 是否显示密码
                errTip: [false, false, false, false], // 错误提示
                time: 60,
                isResetPassword: false, // 是否为重置密码
                getting: false,
                input: {
                    email: '',
                    password: '',
                    repeatPwd: '',
                    verifyCode: ''
                }
            }
        },
        props: ['showLogin', 'isLogin'],
        watch: {
            // 清除出错的提示
            'input.email': function() {
                this.$set(this.errTip, 0, false)
            },
            'input.password': function() {
                this.$set(this.errTip, 1, false)
            },
            'input.repeatPwd': function() {
                console.log(this.input.repeatPwd)
                this.$set(this.errTip, 2, false)
            },
            'input.verifyCode': function() {
                this.$set(this.errTip, 3, false)
            },
            showLogin: function(val) {
                if (val) {
                    this.dialogVisible = val
                }
            },
            dialogVisible: function(val) {
                if (!val) {
                    this.$emit('hide')
                }
            }
        },
        mounted() {

        },
        methods: {
            submit() {
                if (!testEmail(this.input.email)) {
                    this.$set(this.errTip, 0, true)
                    return
                }
                if (!testPassword(this.input.password)) {
                    this.$set(this.errTip, 1, true)
                    return
                }
                if (!this.isLogin && (this.input.repeatPwd !== this.input.password)) {
                    this.$set(this.errTip, 2, true)
                    return
                }
                if (!this.isLogin && !testVerifyCode(this.input.verifyCode)) {
                    this.$set(this.errTip, 3, true)
                    return
                }
                this.isLogin ? this.login() : this.registerOrResetPassword()
                // setTimeout(() => {
                //     this.showToast = true
                // }, 500)
            },
            // 切换模式
            changeMode() {
                this.isResetPassword = false
                this.$emit('changeMode', !this.isLogin)
            },
            // 切换重置模式
            changeResetMode() {
                this.$emit('changeMode', false)
                this.isResetPassword = !this.isResetPassword
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
            // 登录
            login() {
                pLogin.email = this.input.email
                pLogin.password = this.input.password
                this.$api.user.login(pLogin).then(async res => {
                    // 先保存token，才能请求余额
                    dataStore.saveToken(res.token)
                    // 获取账户余额
                    res.userInfo.balance = await this.fetchBalance()
                    console.log(res)
                    this.$store.dispatch('saveUserInfo', res.userInfo)
                    this.$bus.$emit('login')
                    this._hideLoginModal()
                })
            },
            // 注册
            registerOrResetPassword() {
                const param = this.isResetPassword ? pResetPassword : pRegister
                param.email = this.input.email
                param.password = this.input.password
                param.verifyCode = this.input.verifyCode
                this.$api.user[this.isResetPassword ? 'resetPassword' : 'register'](param).then(res => {
                    console.log(res)
                    dataStore.saveToken(res.token)
                    dataStore.saveUserInfo(res.userInfo)
                    this.$store.dispatch('saveUserInfo', res.userInfo)
                    this._hideLoginModal()
                })
            },
            fetchBalance() {
                return new Promise(resolve => {
                    this.$api.account.getBalance().then(res => {
                        console.log(res)
                        resolve(res.balance)
                    })
                })
            },
            // 获取验证码
            getVerifyCode() {
                if (!testEmail(this.input.email)) {
                    this.$set(this.errTip, 0, true)
                    return
                }
                pGetVerifyCode.email = this.input.email
                this.getting = true
                this.$api.public.getVerifyCode(pGetVerifyCode).then(res => {
                    console.log(res)
                    this.countdown()
                    setTimeout(() => {
                        this.getting = false
                    }, 990)
                })
            },
            // 隐藏登录模态框
            _hideLoginModal() {
                this.dialogVisible = false
                this.$emit('hide')
            }
        }
    }
</script>

<style lang="scss">
    .login {

        .el-dialog__header {
            text-align: center;
        }

        .el-dialog {
            border-radius: 10px;
        }

        .el-dialog__title {
            font-size: 26px;
        }

        .el-input {
            input {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #ee4400;
                margin-bottom: 15px;
                font-size: 16px;
                border-radius: 0;
            }

            img {
                width: 22px;
                height: 22px;
                padding-top: 7px;
            }

            .el-input__inner {
                padding-left: 40px;
            }

            .get-verify-code {
                margin-top: 4px;
                background: #ff4400;
                color: #fff;
                padding: 8px 10px;
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
                padding: 10px 0;
                font-size: 14px;
                color: #ff4400;
                display: inline-block;
            }
        }

        .el-button.is-round {
            width: 85%;
            margin-top: 15px;
            background: #ff6900;
            color: #fff;
            outline: none;
            font-size: 18px;

            &:active {
                border: 1px solid #ff6900;
            }

        }

        .footer-btn {
            width: 85%;
            display: flex;
            justify-content: space-between;
            margin: {
                top: 10px;
                bottom: -20px;
                left: auto;
                right: auto;
            };

            .el-button--text {
                color: #ff4400;
            }
        }

        .err-tip {
            text-align: left;
            margin-bottom: 2px;
            margin-top: -5px;
            padding-left: 8px;
            color: #F56C6C;
        }

    }
</style>
