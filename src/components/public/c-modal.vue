<template>
    <div v-if="isShowModal" class="c-dialog" :class="isShowMask ? '' : 'hide-mask'">
        <div class="c-dialog-container" :style="setStyle">
            <div v-if="isShowTitle" class="c-dialog-title">
                <span v-if="showClose" class="close" @click="cancel('close')"></span>
                <span :class="showClose ? '' : 'c-dialog-title-span'" :style="setTitleFontWeight">{{title}}</span>
            </div>
            <p v-if="!isCustom" slot="context">{{context}}</p>
            <!-- 自定义内容-->
            <slot v-else name="custom"></slot>
            <div class="c-dialog-btn" v-if="!isCustom"
                 :class="(isShowConfirm && isShowCancel) ? '' : 'c-dialog-lg-btn'">
                <button v-if="isShowConfirm" @click="confirm">{{confirmText}}</button>
                <button v-if="isShowCancel" @click="cancel">{{cancelText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CModal',
        props: {
            isShowModal: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '提示'
            },
            // 设置字体的粗细
            titleWeight: {
                type: String,
                default: 'bold'
            },
            context: {
                type: String,
                default: '是否继续？'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            isShowCancel: {
                type: Boolean,
                default: false
            },
            isShowConfirm: {
                type: Boolean,
                default: true
            },
            // 是否显示蒙层
            isShowMask: {
                type: Boolean,
                default: true
            },
            // 是否显示标题
            isShowTitle: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '400px'
            },
            // 自定义
            isCustom: {
                type: Boolean,
                default: false
            },
            bgColor: {
                type: String,
                default: '#fff'
            },
            // 是否显示右上角关闭的按钮
            showClose: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            setStyle: function() {
                return {
                    width: this.width,
                    background: this.bgColor
                }
            },
            setTitleFontWeight() {
                return {
                    'font-weight': this.titleWeight
                }
            }
        },
        watch: {
            isShowModal: function(val) {
                console.log(val)
                this.isShow = val
            }
        },
        data() {
            return {
                isShow: false// 组件内控制显示与隐藏
            }
        },
        methods: {
            confirm() {
                this.isShow = false
                this.$emit('confirm')
                this.$emit('hide')
            },
            cancel(type) {
                // type 判断是否是删除还是关闭
                this.isShow = false
                this.$emit('cancel', type)
                this.$emit('hide')
            }
        },
        mounted() {
            // document.body.style.overflow = 'hidden'
            // document.body.style.position = 'fixed'
        }
    }
</script>

<style scoped>
    .c-dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 100;
    }

    .hide-mask {
        background-color: rgba(255, 255, 255, 0);
    }

    .c-dialog-container {
        background: #fff;
        /*width: 450px;*/
        border-radius: 5px;
    }

    .c-dialog-title {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .c-dialog-title-span {
        margin-top: 15px;
    }

    .c-dialog-container p {
        font-size: 24px;
        font-weight: lighter;
        margin-bottom: 50px;
        margin-top: 30px;
        margin-left: 22px;
    }

    .c-dialog-container .close {
        text-align: right;
        margin-right: 8px;
        margin-top: 8px;
        border-radius: 12px;
        line-height: 20px;
        font-size: 18px;
    }

    .close::before {
        content: "\2716";
    }

    .c-dialog-container span:active {
        animation: fade .4s infinite;
        -webkit-animation: fade .4s infinite;
    }

    .c-dialog-container span:nth-child(2) {
        font-size: 25px;
        font-weight: bold;
    }

    .c-dialog-btn {
        width: 100%;
        height: 60px;
        background: #cccccc;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .c-dialog-btn button {
        width: 50%;
        height: 60px;
        border: 0;
        margin: 0;
        padding: 0;
        outline: none;
        color: #fff;
        font-size: 22px;
    }

    .c-dialog-lg-btn button {
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .c-dialog-btn button:active {
        animation: fade .4s infinite;
        -webkit-animation: fade .4s infinite;
    }

    .c-dialog-btn button:nth-child(1) {
        background: #FF7C25;
        border-bottom-left-radius: 5px;
    }

    .c-dialog-btn button:nth-child(2) {
        background: #B5BECD;
        border-bottom-right-radius: 5px;
    }

    @keyframes fade {
        from {
            opacity: 1.0;
        }
        50% {
            opacity: 0;
        }
        to {
            opacity: 1.0;
        }
    }

    @-webkit-keyframes fade {
        from {
            opacity: 1.0;
        }
        50% {
            opacity: 0;
        }
        to {
            opacity: 1.0;
        }
    }

</style>
