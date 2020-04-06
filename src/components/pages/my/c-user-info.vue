<template>
    <div class="c-user-info">
        <div class="yx-center">
            <img src="./../../../../public/images/public/edit.png" @click="edit">
            <img v-if="getUserInfo" :src="getUserInfo.avatarUrl | addImagePrefix">
            <span v-if="getUserInfo">{{getTimeStr()}}</span>
            <span class="nick-name">{{getUserInfo.nickName | formatString}}</span>
        </div>
        <div class="yx-center">
            <span v-for="(item, index) in tabList" :key="index" :class="selectedTab === index ? 'selected' : ''"
            @click="changeTab(index)">{{item}}</span>
        </div>
        <c-edit-info v-if="getUserInfo" :is-show="isEdit" @hide="isEdit = false" :user-info="getUserInfo"/>
<!--        <c-edit-address :is-show="isShow" @hide="isShow = false"/>-->
    </div>
</template>

<script>
    import CEditInfo from './c-edit-info'
    import CEditAddress from './c-edit-address'

    export default {
        name: 'CUserInfo',
        props: ['selectedTab', 'tabList'],
        components: {
            CEditInfo,
            CEditAddress
        },
        computed: {
            getUserInfo() {
                return this.$store.getters.getUserInfo
            }
        },
        data() {
            return {
                isEdit: false,
                isShow: true
            }
        },
        methods: {
            changeTab(index) {
                this.$emit('changeTab', index)
            },
            edit() {
                console.log('开始编辑')
                this.isEdit = true
            },
            getTimeStr() {
                const hour = new Date().getHours()
                if (hour >= 0 && hour < 6) {
                    return '凌晨好'
                } else if (hour >= 6 && hour < 12) {
                    return '上午好'
                } else if (hour >= 12 && hour < 18) {
                    return '下午好'
                } else {
                    return '晚上好'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-user-info {
        width: 235px;
        height: 350px;
        background: #fff;

        div {
            color: #666;
            font-size: 16px;

            &:nth-child(1) {
                width: 195px;
                padding: 10px;
                border-bottom: 2px solid #f8f8f8;
                margin: 0 auto;

                img {
                    &:nth-child(1) {
                        width: 18px;
                        height: 18px;
                        margin: 8px -5px 0 auto;
                        /*margin-left: auto;*/
                    }

                    &:nth-child(2) {
                        width: 76px;
                        height: 76px;
                        margin: 0 auto;
                        border-radius: 100%;
                    }
                }

                span {
                    margin-top: 8px;
                }
            }

            &:nth-child(2) {
                margin-top: 20px;

                span {
                    line-height: 28px;

                    &:hover {
                        color: #FF7C25;
                    }
                }

                .selected {
                    font-size: 18px;
                    font-weight: 500;
                    color: #FF7C25;
                }
            }
        }

        .nick-name {
            /*font-family: DFPHaiBaoW12-GB;*/
            font-size: 16px;
            font-weight: 200;
            color: #ff4400;
        }
    }

</style>
