<template>
    <div class="c-discount">
        <el-popover
                placement="bottom"
                width="300"
                popper-class="discount-popover"
                trigger="click">
            <div class="discount-container">
                <div class="discount-title y-center">
                    <img src="../../../../public/images/cart/trumpet.svg">
                    <span>已领取<span>{{ownDiscount}}</span>张优惠券，有新优惠券可以领取</span>
                </div>
                <div class="discount-detail xy-center">
                    <div>
                        <img src="../../../../public/images/cart/discount.png">
                    </div>
                    <p>
                        <span>30元优惠券 满199减30</span>
                        <span>2019.08.09-2019.09.30</span>
                    </p>
                    <button v-if="isGetDiscount">领取</button>
                    <span v-else>领取成功</span>
                </div>
            </div>
            <el-button class="xy-center" slot="reference">优惠券</el-button>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: 'CDiscount',
        props: {
            ownDiscount: {
                type: Number,
                default: 1
            },
            isGetDiscount: {
                type: Boolean,
                default: true
            }
        },
        methods: {}
    }
</script>

<style lang="scss">

    .c-discount {
        .el-button {
            width: 88px;
            height: 33px;
            margin-top: 5px;
            background: #FF4400;
            color: #fff;
            font-size: 16px;
            padding: 0;

            &:hover, &:active, &:focus {
                opacity: 0.8;
                font-weight: bold;
                background: #FF4400;
                border-color: #FF4400;
                color: #fff;
            }
        }
    }

    .discount-popover {
        width: 336px;
        height: 154px;
        background: #efefef;
        border-color: #FF7C25 !important;

        .popper__arrow {
            border-bottom-color: #FF7C25 !important;
        }
    }

    .discount-container {

        .discount-title {
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(239, 239, 239, 1);

            img {
                width: 15px !important;
                height: 15px !important;
                margin-right: 5px;
            }
        }

        .discount-detail {
            padding: 10px 0;

            div {
                width: 85px;
                height: 28px;
                border: 1px solid #FF7C25;
            }

            span {
                display: block;
                font-family: Source Han Sans CN;
                font-size: 12px;
                font-weight: 200;
                color: rgba(102, 102, 102, 1);
                margin: 0 10px;

                &:nth-child(1) {
                    color: #000;
                    // font-size: 14px;
                    font-weight: 400;
                }

                &:nth-child(3) {
                    color: #FF7C25;
                }
            }

            button {
                width: 48px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 200;
                color: rgba(255, 68, 0, 1);
                background: #fff;
                border: 1px solid rgba(255, 68, 0, 1);
                padding: 0;
                outline: none;

                &:active {
                    animation: fade .4s infinite;
                    -webkit-animation: fade .4s infinite;
                }
            }
        }

    }

</style>
