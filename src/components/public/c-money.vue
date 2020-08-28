<template>
    <div class="money" :class="size">
        <span class="money-icon" :style="setColor">¥</span>
        <span class="money-text" :style="setColor">{{money | formatMoney}}</span>
    </div>
</template>

<script>
    export default {
        name: 'CMoney',
        props: {
            money: {
                type: Number,
                default: 800
            },
            size: String,
            color: {
                type: String,
                default: '#DD524D'
            }
        },
        computed: {
            setColor() {
                return {
                    color: this.color
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .money {
        display: flex;
        align-items: center;
        font-family: Source Han Sans CN;

        span {
            color: #DD524D;
            padding: 0;
            display: block;
        }

        .money-icon {
            font-size: 20px;
            margin-right: 5px;
        }

        .money-text {
            font-size: 30px;
        }
    }

    .md {
        .money-icon {
            font-size: 18px;
        }

        .money-text {
            font-size: 28px;
        }
    }

    .sm {
        .money-icon {
            font-size: 16px;
        }

        .money-text {
            font-size: 24px;
        }
    }

    .xs {
        .money-icon {
            font-size: 14px;
        }

        .money-text {
            font-size: 20px;
        }
    }

    /*删除线*/

    .d-xs {
        span {
            font-size: 20px !important;
            margin-right: 0 !important;
            color: #999999 !important;
            text-decoration: line-through;
        }
    }
</style>
