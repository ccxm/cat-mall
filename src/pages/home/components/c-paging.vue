<template>
    <div class="c-paging">
        <button @click="previous">上一页</button>
        <button v-for="(item, index) in tempPage" :key="index" @click="selectPage(index)"
                :class="selectedIndex === index ? 'selected-btn' : ''">
            {{item}}
        </button>
        <button @click="next">下一页</button>
    </div>
</template>

<script>
    const page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    export default {
        name: 'CPaging',
        data() {
            return {
                page,
                selectedIndex: 0,
                mid: 4,
                start: 0, // 分页从头开始
                end: 0, // 分页从尾开始
                tempPage: []
            }
        },
        mounted() {
            this.end = this.page.length - this.mid
            console.log(this.end)
            this.getTempPage()
        },
        methods: {
            // 算出中间页数是数组
            getTempPage(isAdd) {
                if (this.page.length > (this.mid * 2 + 1)) {
                    this.tempPage = []
                    if (isAdd) {
                        // 判断当前要截取的是否大于end
                        if ((this.start + this.mid) < this.end) {
                            this.tempPage = this.tempPage.concat(this.page.slice(this.start, this.mid + this.start), ['...'], this.page.slice(this.end, this.end + this.mid))
                        } else {
                            // 去掉了空格后，下标要+1
                            this.selectedIndex++
                            this.tempPage = this.page.slice(this.start - 1, this.end + this.mid)
                        }
                    } else {
                        if (this.end > (this.mid + this.start)) {
                            this.tempPage = this.tempPage.concat(this.page.slice(this.start, this.mid + this.start), ['...'], this.page.slice(this.end, this.end + this.mid))
                        } else {
                            this.selectedIndex--
                            this.tempPage = this.page.slice(this.start, this.end + this.mid)
                        }
                    }
                } else {
                    this.tempPage = this.page
                }
                this.listenValChange()
            },
            previous() {
                // 判断是否已经越界
                if (this.selectedIndex > 0) {
                    this.selectedIndex--
                    if (this.tempPage[this.selectedIndex] === '...') {
                        this.end--
                        this.selectedIndex++
                        this.getTempPage(false)
                    } else {
                        this.listenValChange()
                    }
                    return
                }
                // 当下标为0的时候，判断是否已经等于第一页，如果不等于，则回退一页
                if (this.tempPage[this.selectedIndex] !== 1) {
                    this.start--
                    this.getTempPage(true)
                }
            },
            next() {
                if (this.selectedIndex < (this.tempPage.length - 1)) {
                    this.selectedIndex++
                    if (this.tempPage[this.selectedIndex] === '...') {
                        this.start++
                        this.selectedIndex--
                        this.getTempPage(true)
                    } else {
                        this.listenValChange()
                    }
                    return
                }
                if (this.tempPage[this.selectedIndex] !== this.page[this.page.length - 1]) {
                    this.end++
                    this.getTempPage(false)
                }
            },
            selectPage(index) {
                this.selectedIndex = index
                this.listenValChange()
            },
            // 监听页数的变化
            listenValChange() {
                console.log(`当前的页数：${this.tempPage[this.selectedIndex]}`)
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-paging {
        display: flex;

        button {
            width: 28px;
            height: 28px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(217, 217, 217, 1);
            margin: 0 15px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            color: rgba(102, 102, 102, 1);
            outline: none;

            &:nth-child(1), &:nth-last-child(1) {
                width: 63px;
            }

            &:active {
                border: 0;
                outline: none;
            }
        }

        .selected-btn {
            background: #FF7C25;
            border-color: #FF7C25;
            color: #fff;
        }

    }
</style>
