<template>
    <div class="address-container">
        <c-address v-for="(item, index) in addressList" :key="index" :address="item"/>
        <c-new-address />
    </div>
</template>

<script>
    import CAddress from '../../public/c-address'
    import CNewAddress from './../order/c-new-address'

    export default {
        name: "CAddressContainer",
        components: {
            CAddress,
            CNewAddress,
        },
        data() {
            return {
                addressList: [],
            }
        },
        methods: {
            fetchAddressList() {
                this.$api.getAddress().then(res => {
                    console.log(res)
                    this.addressList = res.addressList
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        mounted() {
            this.fetchAddressList()
            this.bus.$on('updateAddressList', () => {
                this.fetchAddressList()
            })
        }
    }
</script>

<style lang="scss" scoped>

    .address-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 600px;
        margin: 0 auto;
    }
</style>
