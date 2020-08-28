<template>
    <div class="c-star">
        <div class="star-score">
            <span>{{getStarNum}}</span>
        </div>
        <div class="star-line">
            <div v-for="item in 5" :key="item" class="star-item">
                <div>
                    <i class="iconfont icon-start1"></i>
                </div>
                <div :class="(item - 1 < starNum && !edit) || item <= selected ? 'cover-star' : ''"
                     :style="(item - 1 < starNum && item > starNum && !edit) ? getSurplusWidth : ''"
                     @click="select(item)">
                    <i class="iconfont icon-start1"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const SIZE = 16
    export default {
        name: 'CStar',
        props: {
            star: {
                type: Number,
                default: 3.5
            },
            // 是否是编辑模式，编辑模式不显示默认的星星，只显示编辑的
            edit: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                selected: -1,
                starNum: 0
            }
        },
        computed: {
            // 计算剩余的星星的宽度
            getSurplusWidth() {
                const temp = parseFloat((this.star - parseInt(this.star)).toFixed(1))
                return {
                    width: `${temp * SIZE}px`
                }
            },
            // 初始化星星
            getStarNum: {
                set() {
                    this.starNum = this.star
                },
                get() {
                    return this.starNum
                }
            }
        },
        methods: {
            select(index) {
                if (!this.edit) {
                    return
                }
                this.selected = index
                this.starNum = index
                this.$emit('star', index)
            }
        },
        mounted() {
            this.starNum = this.star
            this.selected = this.starNum
        }
    }
</script>

<style scoped lang="scss">
    .c-star {
        width: 80px;
    }

    .star-score {
        font-size: 40px;
        font-family: Source Han Sans CN;
        font-weight: 800;
        color: #ff4400;
        text-align: center;
    }

    .star-line {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .star-item {
            $size: 16px;
            position: relative;
            width: $size;
            height: $size;

            div {
                position: absolute;
                width: $size;
                height: $size;
                overflow: hidden;
                color: #ccc;

                i {
                    display: inline-block;
                    width: $size;
                    height: $size;
                    font-size: $size;
                    top: 0;
                    left: 0;
                    position: absolute;
                }
            }

            /*整个填充*/
            .cover-star {
                width: $size;
                overflow-x: hidden;
                z-index: 10;
                color: gold;
            }

        }
    }

</style>
