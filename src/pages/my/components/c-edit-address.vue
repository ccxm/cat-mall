<template>
    <div class="c-edit-address" v-if="isShow">
        <c-modal :title="'编辑收货地址'" :is-show-confirm="false"
                 :is-show-modal="isShow" :is-custom="true" :width="'640px'" bg-color="#fff" @hide="hide">
            <div class="edit-address" slot="custom">
                <el-form :model="pAddAddress" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="联系人" prop="name">
                        <el-input v-model="pAddAddress.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="pAddAddress.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="收货地址" prop="regionList">
                        <el-cascader
                                size="large"
                                :options="regionOptions"
                                v-model="pAddAddress.regionList"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="detail-address" label="详细地址" prop="detailedAddress">
                        <el-input v-model="pAddAddress.detailedAddress"></el-input>
                    </el-form-item>
                </el-form>
                <button class="save" @click="submitForm('ruleForm')">保存</button>
            </div>
        </c-modal>
    </div>
</template>

<script>
    import CModal from '@components/public/c-modal'
    import { regionData } from 'element-china-area-data'
    import { pAddAddress } from '@api/user/params'

    export default {
        name: 'CEditAddress',
        components: {
            CModal
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            isAdd: {
                type: Boolean,
                default: false
            },
            address: Object
        },
        data() {
            const validatePhone = (rule, value, callback) => {
                const reg = /^[0-9(\-)]{5,11}$/
                if (!reg.test(value)) {
                    callback(new Error('长度在5到11个字符，电话号码不正确'))
                } else {
                    callback()
                }
            }
            return {
                regionOptions: regionData,
                pAddAddress,
                rules: {
                    name: [{
                        required: true, message: '请输入收货人姓名', trigger: 'blur'
                    }, {
                        min: 2, max: 6, message: '长度在3到5个字符', trigger: 'blur'
                    }],
                    phone: [{
                        required: true, message: '请输入您的联系电话', trigger: 'blur'
                    }, {
                        validator: validatePhone, trigger: 'blur'
                    }],
                    regionList: [{
                        type: 'array', required: true, message: '请选择您的地址', trigger: 'change'
                    }],
                    detailedAddress: [{
                        required: true, message: '请输入您的详细地址', trigger: 'blur'
                    }]
                }
            }
        },
        watch: {
            // 该数据为异步获取，监听该数据的变化
            address() {
                this.fillEditAddress()
            }
        },
        methods: {
            handleChange() {
                this._getRegion()
            },
            hide() {
                console.log('hide')
                this.$emit('hide')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!')
                        if (this.isAdd) {
                            this.addAddress()
                        } else {
                            this.updateAddress()
                        }
                    } else {
                        // console.log('error submit!!')
                        this.$tips.error('请输入完整的物流信息')
                        return false
                    }
                })
            },
            addAddress() {
                this.$api.user.addAddress(this._getReqParam()).then(res => {
                    console.log(res)
                    this.hide()
                    this.$bus.$emit('updateAddressList')
                })
            },
            updateAddress() {
                this.$api.user.updateAddress(this._getReqParam()).then(res => {
                    console.log(res)
                    this.hide()
                    this.$bus.$emit('updateAddressList')
                })
            },
            // 填充编辑的数据
            fillEditAddress() {
                if (!this.isAdd && this.address) {
                    // 如果非新增，则是编辑，则填充相关的数据
                    const region = this.address.addressTable
                    const regionList = [region.province.value, region.city.value, region.area.value]
                    this.pAddAddress = Object.assign({}, this.address, { regionList })
                }
            },
            // 获取区域数据
            _getRegion() {
                const province = regionData.find(item => item.value === this.pAddAddress.regionList[0])
                const city = province.children.find(item => item.value === this.pAddAddress.regionList[1])
                const area = city.children.find(item => item.value === this.pAddAddress.regionList[2])
                this.pAddAddress.addressTable = {
                    province: {
                        value: province.value,
                        label: province.label
                    },
                    city: {
                        value: city.value,
                        label: city.label
                    },
                    area: {
                        value: area.value,
                        label: area.label
                    }
                }
                console.log(this.pAddAddress.addressTable)
            },
            // 合成请求数据
            _getReqParam() {
                this._getCompleteAddress()
                // 删除地区列表
                const temp = Object.deepCopy(this.pAddAddress)
                delete temp.regionList
                return temp
            },
            _getCompleteAddress() {
                const address = this.pAddAddress.addressTable
                this.pAddAddress.completedAddress = address.province.label + address.city.label + address.area.label + this.pAddAddress.detailedAddress
            }
        },
        mounted() {
            this.fillEditAddress()
        }
    }
</script>

<style lang="scss">

    .edit-address {
        display: flex;
        flex-direction: column;
        margin: {
            top: 20px;
            bottom: 20px;
        }
        width: 560px;
        /*height: 400px;*/
        padding: 0 20px;
        background: #fff;

        .save {
            width: 200px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            border-radius: 8px;
            background: #ff6900;
            border: 0;
            outline: none;
            font-size: 22px;
            margin: {
                top: 60px;
                left: auto;
                right: auto;
            };
        }

        .el-form-item {
            display: flex;
            margin-bottom: 25px !important;
            /*border-bottom: 1px solid #DCDFE6;*/

            .el-form-item__label {
                font-weight: bold;
            }

            .el-form-item__error {
                padding-top: 6px;
            }

            .el-form-item__content {
                margin-left: 0 !important;

                .el-input {
                    .el-input__inner {
                        width: 200px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: 2px;
                    }
                }
            }
        }

        .detail-address {
            .el-input {
                .el-input__inner {
                    width: 400px !important;
                }
            }
        }
    }

    .el-cascader__dropdown {
        .el-cascader-menu {
            min-width: 150px !important;
        }
    }

</style>
