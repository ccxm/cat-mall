<template>
    <div class="c-edit-info" v-if="isShow">
        <c-modal :title="'编辑个人信息'" :is-show-confirm="false"
                 :is-show-modal="isShow" :is-custom="true" :width="'800px'" bg-color="#eee" @hide="onHide">
            <div class="edit-container" slot="custom">
                <div class="xy-center">
                    <span class="left-title">编辑昵称：</span>
                    <el-input class="right-container" placeholder="请输入你的昵称" v-model="tempUserInfo.nickName"
                              :suffix-icon="searchingNickname ? 'el-icon-loading' : nickNameCanUse ? 'el-icon-circle-check' : 'el-icon-circle-close'">
                    </el-input>
                </div>
                <div class="xy-center">
                    <span class="left-title">性别：</span>
                    <div class="xy-center right-container">
                        <div class="xy-center" @click="tempUserInfo.gender = 0">
                            <img
                                    :src="require(`./../../../../public/images/my/select_${tempUserInfo.gender === 0 ? 1 : 0}.png`)">
                            <img src="../../../../public/images/my/man.png">
                        </div>
                        <div class="xy-center" @click="tempUserInfo.gender = 1">
                            <img
                                    :src="require(`./../../../../public/images/my/select_${tempUserInfo.gender === 1 ? 1 : 0}.png`)">
                            <img src="../../../../public/images/my/woman.png">
                        </div>
                    </div>
                </div>
                <div class="xy-center">
                    <span class="left-title">头像：</span>
                    <div class="right-container">
                        <div class="xy-center">
                            <!--              <img src="./../../../../public/images/public/head-photo.png">-->
                            <c-upload @onUpload="onUpload" :avatar-url="tempUserInfo.avatarUrl"/>
                            <div class="yx-center">
                                <span>头像预览</span>
                                <div>
                                    <img :src="tempUserInfo.avatarUrl | addImagePrefix">
                                    <img :src="tempUserInfo.avatarUrl | addImagePrefix">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="save" @click="save">保存</button>
            </div>
        </c-modal>
    </div>
</template>

<script>
    import CModal from '@/components/public/c-modal'
    import CUpload from './c-upload'
    import { pCheckFieldCanUse, pUpdateUserInfo } from '@api/user/params'
    import dataStore from '@utils/dataStore'

    export default {
        name: 'CEditInfo',
        components: {
            CModal,
            CUpload
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            userInfo: Object
        },
        data() {
            return {
                temp: false,
                radio: '1',
                sex: -1,
                nickNameCanUse: true,
                searchingNickname: false,
                baseAvatarUrl: '', // 保存头像的原始链接
                tempUserInfo: {
                    nickName: '',
                    gender: '',
                    avatarUrl: ''
                } // 用来保存编辑的中间值
            }
        },
        watch: {
            userInfo(val) {
                this.tempUserInfo = Object.deepCopy(val)
            },
            'tempUserInfo.nickName': function(val) {
                console.log(val)
                this.checkNickNameCanUse(val)
            }
        },
        mounted() {
            this.tempUserInfo = Object.deepCopy(this.userInfo)
            this.baseAvatarUrl = this.tempUserInfo.avatarUrl
        },
        methods: {
            onHide() {
                this.$emit('hide')
            },
            onUpload(imageUrl, baseUrl) {
                this.tempUserInfo.avatarUrl = imageUrl
                this.baseAvatarUrl = baseUrl
            },
            // 检查昵称是否可用
            checkNickNameCanUse(val) {
                if (this.searchingNickname || !val) {
                    return
                }
                this.searchingNickname = true
                pCheckFieldCanUse.field = 'nickName'
                pCheckFieldCanUse.value = val
                this.$api.user.checkFieldCanUse(pCheckFieldCanUse).then(res => {
                    console.log(res)
                    this.nickNameCanUse = res.canUse
                    this.searchingNickname = false
                })
            },
            save() {
                console.log(this.tempUserInfo)
                this.updateUserInfo()
                // return
                // this.$message.success({
                //     message: '保存成功',
                //     duration: 1000
                // })
                // setTimeout(() => {
                //     this.$emit('hide')
                //     this.$emit('save', this.tempNickName, this.tempAvatarUrl)
                // }, 1000)
            },
            updateUserInfo() {
                console.log(this.tempUserInfo)
                pUpdateUserInfo.nickName = this.tempUserInfo.nickName
                pUpdateUserInfo.gender = this.tempUserInfo.gender
                pUpdateUserInfo.avatarUrl = this.baseAvatarUrl
                this.$api.user.updateUserInfo(pUpdateUserInfo).then(res => {
                    console.log(res)
                    this.$store.dispatch('saveUserInfo', res)
                    dataStore.saveUserInfo(res)
                    this.$emit('hide')
                })
            }
        }
    }
</script>

<style lang="scss">

    .edit-container {
        display: flex;
        flex-direction: column;
        margin: {
            top: 20px;
            bottom: 20px;
        }
        width: 760px;
        padding: 0 20px;
        background: #eee;

        .save {
            width: 200px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            border-radius: 8px;
            background: #ff6900;
            border: 0;
            outline: none;
            font-size: 22px;
            margin: {
                top: 40px;
                left: auto;
                right: auto;
            };
        }

        > div {
            justify-content: left;
            margin-top: 46px;

            .left-title {
                display: inline-block;
                text-align: left;
                width: 120px;
            }

            .right-container {
                width: 600px;
                align-items: flex-start !important;
                justify-content: flex-start !important;
            }

            &:nth-child(1) {
                margin-bottom: 10px;

                .el-input {
                    .el-input__inner {
                        border: 0;
                        border-radius: 0;
                        border-bottom: 1px solid #888;
                        background: #eee;
                    }
                }

                .el-input__suffix {
                    font-size: 30px;

                    .el-icon-circle-check {
                        color: #49D866;
                    }

                    .el-icon-circle-close {
                        color: #F56C6C;
                    }

                    /*.el-icon-loading {*/
                    /*  color: #fff;*/
                    /*}*/
                }
            }

            &:nth-child(2) {
                margin-bottom: 10px;

                .xy-center {
                    justify-content: center;
                    margin-right: 42px;

                    img {
                        width: 35px;
                        height: 35px;
                        object-fit: scale-down;
                        margin-right: 10px;
                    }
                }
            }

            &:nth-child(3) {
                img {
                    width: 182px;
                    height: 182px;
                    border-radius: 10px;
                }

                .xy-center {
                    justify-content: flex-start;
                }

                .yx-center {
                    width: 243px;
                    height: 164px;
                    padding: 0 22px;
                    background: #fff;
                    border-radius: 8px;
                    margin-left: 56px;
                    justify-content: left;
                    align-items: flex-start;

                    img {
                        width: 103px;
                        height: 103px;

                        &:nth-child(2) {
                            margin-left: 36px;
                            border-radius: 100%;
                        }
                    }

                    span {
                        font-size: 14px;
                        font-family: Source Han Sans CN;
                        color: rgba(136, 136, 136, 1);
                        margin: 14px 0;
                    }
                }
            }

        }
    }

</style>
