<template>
    <div class="c-cart" @click="goToCart">
        <img src="./../../../public/svgs/cart.svg">
        <span v-if="getCartLength">{{getCartLength}}</span>
    </div>
</template>

<script>
    export default {
        name: 'CCard',
        props: {
            cardNumber: {
                type: Number,
                default: 1
            }
        },
        computed: {
            getCartLength() {
                return this.$store.getters.getUserInfo.cartLength
            }
        },
        methods: {
            goToCart() {
                this.$router.push('/cart')
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-cart {

        display: flex;

        img {
            width: 50px;
            height: 50px;
            opacity: .9;
        }

        span {
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #EB767D;
            text-align: center;
            line-height: 30px;
            font-size: 22px;
            color: #fff;
            margin-left: -10px;
        }

    }
</style>
