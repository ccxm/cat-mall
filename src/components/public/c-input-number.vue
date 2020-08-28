<template>
    <div class="c-input-number">
        <button class="btn-minus" @click="minus">
        </button>
        <span>{{getNum}}</span>
        <button class="btn-add" @click="add">
        </button>
    </div>
</template>

<script>
    export default {
        name: 'CInputNumber',
        props: {
            num: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 1
            },
            // 当前项的下标
            index: {
                type: Number,
                default: 0
            }
        },
        computed: {
            getNum: {
                get() {
                    return this.tempNum
                },
                set() {
                    this.tempNum = this.num
                }
            }
        },
        data() {
            return {
                tempNum: 1
            }
        },
        methods: {
            add() {
                if (this.tempNum < this.max) {
                    this.tempNum++
                    this.$emit('change', this.tempNum, this.index)
                }
            },
            minus() {
                if (this.tempNum > this.min) {
                    this.tempNum--
                    this.$emit('change', this.tempNum, this.index)
                }
            }
        },
        mounted() {
            this.tempNum = this.num
        }
    }
</script>

<style lang="scss">

    .c-input-number {
        display: flex;
        align-items: center;
        border: 2px solid #f0f0f0;
        border-radius: 4px;

        span {
            display: inline-block;
            padding: 0 15px;
            font-size: 16px;
            border-radius: 4px;
            color: #000;
        }

        button {
            width: 25px;
            height: 25px;
            border: none;
            outline: none;
        }

        button:active {
            animation: fade .6s infinite;
            -webkit-animation: fade .6s infinite;
        }

        .btn-minus {
            background: #f0f0f0 url("./../../../public/svgs/minus.svg") no-repeat center;
            background-size: 15px 15px;
        }

        .btn-add {
            background: #f0f0f0 url("./../../../public/svgs/add.svg") center no-repeat;
            background-size: 15px 15px;
        }

    }

</style>
