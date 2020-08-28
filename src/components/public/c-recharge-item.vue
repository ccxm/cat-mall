<template>
    <div class="c-recharge-item xy-center">
        <span>100</span>
        <span>元</span>
    </div>
</template>

<script>
    export default {
        name: 'CRechargeItem'
    }
</script>

<style scoped lang="scss">
    $color: #00b537;
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
</style>
