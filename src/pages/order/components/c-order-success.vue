<template>
    <div class="c-order-success yx-center">
        <img src="../../../../public/images/order/order-success.png"/>
        <span class="span1">恭喜您！</span>
        <span class="span1">{{isPayed ? '您已成功支付' : '您已成功下单,请支付'}}</span>
        <div>
            <div>
                <span>订单号：</span>
                <span>{{orderId}}</span>
            </div>
            <div>
                <span>待支付：</span>
                <c-money class="c-money" :money="totalAmount"/>
            </div>
        </div>
    </div>
</template>

<script>
    import CMoney from '../../../components/public/c-money'

    export default {
        name: 'COrderSuccess',
        components: {
            CMoney
        },
        props: ['orderId', 'totalAmount', 'isPayed']
    }
</script>

<style scoped lang="scss">
    .c-order-success {
        text-align: center;
        font-family: Microsoft YaHei;

        img {
            width: 151px;
            height: 166px;
            margin-bottom: 28px;
        }

        .span1 {
            font-size: 28px;
            font-weight: bold;
            color: rgba(255, 68, 0, 1);
            margin: {
                bottom: 28px;
                left: 15px;
            }
        }

        div {
            display: flex;
            margin-left: 20px;

            div {
                display: flex;
                align-items: center;

                &:nth-child(1) {
                    margin-right: 20px;
                }

                .c-money {
                    margin-left: 0;
                }

                span {
                    &:nth-child(1) {
                        color: #919191;
                        font-size: 24px;
                    }

                    &:nth-child(2) {
                        color: #1A1A1A;
                        font-size: 28px;
                    }
                }
            }
        }
    }
</style>
