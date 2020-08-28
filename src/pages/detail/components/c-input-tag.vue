<template>
    <div class="input-tag">
        <div v-if="inputVisible" class="input-container" :style="setStyle">
            <div>
                <el-color-picker v-model="pickerColor"/>
            </div>
            <div class="input-right">
                <input maxlength="10" :style="setColor"
                       v-model="inputValue"
                       ref="input"
                       size="small"
                       @keyup.enter="handleInputConfirm"
                       autofocus="autofocus"/>
                <i class="iconfont icon-cuo" :style="isHover ? setBackground : ''"
                   @mouseover="isHover = true" @mouseout="isHover = false"
                   @click.self="closeInput"></i>
            </div>
        </div>
        <button v-else class="button-tag" @click="showInput">+ 新弹幕</button>
    </div>
</template>

<script>
    export default {
        name: 'CInputTag',
        data() {
            return {
                inputVisible: false,
                inputValue: '',
                pickerColor: '#409EFF',
                isHover: false
            }
        },
        computed: {
            setStyle() {
                return {
                    border: `1.2px solid ${this.pickerColor}`,
                    color: this.pickerColor
                }
            },
            setColor() {
                return {
                    color: this.pickerColor
                }
            },
            setBackground() {
                return {
                    'background-color': this.pickerColor
                }
            }
        },
        methods: {
            showInput() {
                console.log('show')
                this.isHover = false
                this.inputVisible = true
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            },
            handleInputConfirm() {
                if (this.inputValue) {
                    this.$emit('inputTag', this.inputValue, this.pickerColor)
                }
                this.inputVisible = false
                this.inputValue = ''
                console.log('handle')
            },
            closeInput() {
                this.inputVisible = false
                this.isHover = false
                console.log('close')
            }
        }
    }
</script>

<style lang="scss">

    .input-tag {
        display: inline-block;
        margin: 5px 8px;
        height: 34px;

        .input-container {
            $default-color: #409EFF;
            $height: 32px;
            display: flex;
            border: 1.2px solid $default-color;
            border-radius: 4px;
            height: $height;
            width: 150px;
            color: $default-color;

            .el-color-picker__trigger {
                width: $height !important;
                height: $height !important;
                padding: 0;
                border: 0;
                border-radius: 4px;

                .el-color-picker__color {
                    border: 0;
                }

                .el-color-picker__icon::before {
                    content: '';
                }
            }

            .input-right {
                display: flex;
                align-items: center;
                padding: 0 5px;

                input {
                    height: 30px;
                    line-height: 30px;
                    width: 90px;
                    margin: 0 !important;
                    padding: 0 !important;
                    border: 0;
                    outline: none;
                    font-size: 14px;
                }

                i {
                    font-size: 16px;
                    font-weight: 300;
                    border-radius: 100%;

                    &:hover {
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        text-align: center;
                        color: #fff;
                        border-radius: 100%;
                    }
                }
            }

        }

        .button-tag {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 34px !important;
            font-size: 14px;
            background: #fff;
            outline: none;
            border: 1px solid #409EFF;
            border-radius: 4px;
            color: #606266;
            padding: 0 20px;

            &:hover {
                background: rgb(236, 245, 255);
            }
        }
    }

</style>
