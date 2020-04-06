<template>
    <div class="c-new-address x-center" @click.self="showEditAddress = true">
        <span>添加新地址</span>
        <c-edit-address :is-show="showEditAddress" :is-add="true" @hide="showEditAddress = false"/>
    </div>
</template>

<script>
    import CEditAddress from './../my/c-edit-address'

    export default {
        name: 'CNewAddress',
        components: {
            CEditAddress
        },
        data() {
            return {
                showEditAddress: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-new-address {
        width: 294px;
        height: 167px;
        margin-top: 20px;
        font-family: Source Han Sans CN;
        font-size: 14px;
        font-weight: 300;
        color: #666;
        background: url("./../../../../public/images/order/border-add.png") center no-repeat;

        span {
            margin-top: 140px;
        }
    }
</style>
