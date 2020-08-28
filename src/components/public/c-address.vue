<template>
    <div class="c-address" :class="isSelected ? 'selected-address' : ''">
        <div class="up-side">
            <div>
                <img src="../../../public/images/order/head-photo.png"/>
                <span>{{address.name || ''}}</span>
            </div>
            <div>
                <img src="../../../public/images/order/edit.svg" @click="isShowEdit = true"/>
                <img src="../../../public/images/order/cancel.svg" @click="showDel"/>
            </div>
        </div>
        <div class="down-side">
            <div>
                <img src="../../../public/images/order/location.svg"/>
                <span>{{address.completedAddress | formatString(14)}}</span>
            </div>
            <div>
                <img src="../../../public/images/order/phone.svg"/>
                <span>{{address.phone || ''}}</span>
            </div>
        </div>
        <c-edit-address :is-show="isShowEdit" :address="address" @hide="isShowEdit = false"/>
        <c-modal :context="'是否删除这个地址？'" :is-show-modal="isShowDel" @hide="onHide" @confirm="deleteAddress"
                 :is-show-cancel="true"/>
    </div>
</template>

<script>
    import CModal from './c-modal.vue'
    import CEditAddress from '@/pages/my/components/c-edit-address'
    import { pDeleteAddress } from '@api/user/params'

    export default {
        name: 'CAddress',
        components: {
            CModal,
            CEditAddress
        },
        props: {
            isSelected: {
                type: Boolean,
                default: false
            },
            address: Object
        },
        data() {
            return {
                isShowDel: false,
                isShowEdit: false
            }
        },
        methods: {
            showDel() {
                this.isShowDel = true
            },
            onHide() {
                this.isShowDel = false
            },
            deleteAddress() {
                pDeleteAddress.addressId = this.address.addressId
                this.$api.user.deleteAddress(pDeleteAddress).then(res => {
                    console.log(res)
                    this.$bus.$emit('updateAddressList')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-address {
        width: 266px;
        height: 145px;
        margin-top: 20px;
        font-family: Source Han Sans CN;
        // border: 1px solid #ccc;
        padding: 11px 14px;
        border-radius: 2px;
        background: url("../../../public/images/order/border-0.png") center no-repeat;

        .up-side {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            div {
                &:nth-child(1) {
                    display: flex;
                    align-items: flex-end;

                    img {
                        width: 62px;
                        height: 62px;
                        border-radius: 100%;
                    }

                    span {
                        margin-left: 20px;
                        font-size: 30px;
                        color: #666666;
                    }
                }

                &:nth-child(2) {
                    display: flex;
                    height: 16px;

                    img {
                        margin-left: 10px;
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }

        .down-side {
            margin-top: 27px;
            font-size: 14px;
            font-weight: 300;
            color: #666;

            span {
                margin-left: 12px;
            }

            div {
                margin-bottom: 18px;
                display: flex;
                align-items: center;
                background: center no-repeat;
            }
        }
    }

    .selected-address {
        background: url("../../../public/images/order/border-1.png") center no-repeat;
    }
</style>
