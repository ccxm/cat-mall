<template>
    <div class="c-see-more">
        <div class="up-side xy-center">
            <span>看了又看</span>
        </div>
        <div class="mid-side">
            <div :style="changeStyle" class="yx-center">
                <span class="none-more">没有更多数据了</span>
                <div class="see-more-image xy-center" v-for="(item, index) in moreGoodsList" :key="index">
                    <img v-lazy="item.masterImg" @click="goToDetail(item.goodsId)">
                    <span class="xy-center">{{item.goodsName}}</span>
                </div>
            </div>
        </div>
        <div class="down-side y-center__between">
            <i class="iconfont icon-down2" @click="activeTransform(1)"></i>
            <i class="iconfont icon-down2" @click="activeTransform(-1)"></i>
        </div>
    </div>
</template>

<script>
    import { pGetMoreGoods } from '@api/goods/params'

    export default {
        name: 'CSeeMore',
        data() {
            return {
                downActive: false,
                upActive: false,
                top: -215,
                // imgList: [1, 2, 3, 4, 5, 5, 4, 3, 2],
                moreGoodsList: []
            }
        },
        computed: {
            changeStyle() {
                return {
                    'margin-top': `${this.top}px`
                }
            }
        },
        methods: {
            // 激活过度动画
            activeTransform(dir) {
                this.top += 405 * dir
                console.log(this.top)
                if (dir < 0) {
                    // this.imgList.push(2)
                    // this.imgList.push(1)
                    // this.imgList.push(3)
                    this.getMoreGoods()
                } else if (this.top >= 190) {
                    setTimeout(() => {
                        this.top -= 405
                    }, 500)
                    // 回到了顶部，则截取数组
                    this.moreGoodsList.length = 3
                }
            },
            getMoreGoods(maxLength = 3) {
                pGetMoreGoods.maxLength = maxLength
                this.$api.goods.getMoreGoods(pGetMoreGoods).then(res => {
                    console.log(res)
                    this.moreGoodsList = this.moreGoodsList.concat(res.moreGoodsList)
                })
            },
            // 去详情
            goToDetail(goodsId) {
                const routes = this.$router.resolve({ path: '/detail', query: { goodsId } })
                window.open(routes.href, '_blank')
            }
        },
        mounted() {
            this.getMoreGoods()
        }
    }
</script>

<style scoped lang="scss">
    .c-see-more {
        width: 150px;
        height: 500px;
        box-shadow: 0 0 10px #ddd;
        border-radius: 8px;
        margin-left: 10px;

        .up-side {
            span {
                margin: 15px 0;
                font-size: 14px;
                font-family: Source Han Sans CN;
                color: #666;
                display: block;
                position: relative;

                &::before, &::after {
                    content: '';
                    width: 20px;
                    height: 1px;
                    background: #999;
                    position: absolute;
                    top: 50%;
                }

                &::before {
                    margin-left: -30px;
                }

                &::after {
                    margin-left: 10px;
                }
            }
        }

        .mid-side {
            height: 400px;
            flex: 1;
            overflow: hidden;

            div {
                transition: all .3s ease;
                -moz-transition: all .3s ease;
            }

            .see-more-image {
                width: 120px;
                height: 120px;
                margin-bottom: 15px;
                position: relative;

                img {
                    width: 118px;
                    height: 118px;

                    &:hover {
                        border: 1px solid #ff4400;
                    }
                }

                span {
                    position: absolute;
                    z-index: 10;
                    display: block;
                    bottom: 1px;
                    font-size: 12px;
                    background: #ff4400;
                    opacity: .7;
                    width: 118px;
                    text-align: center;
                    color: #fff;
                    font-weight: 200;
                    font-family: Source Han Sans CN;
                }
            }

            .none-more {
                display: inline-block;
                width: 100%;
                text-align: center;
                color: #999;
                font-size: 14px;
                height: 15px;
                line-height: 15px;
                margin-bottom: 200px;
            }
        }

        .down-side {
            padding: 0 20%;

            i {
                &:nth-child(1) {
                    transform: rotate(180deg);
                    margin-left: 10px;
                }
            }

            .icon-down2 {
                font-size: 25px;
                color: #999;
                font-weight: bolder;

                &:hover {
                    color: #333;
                }
            }
        }
    }

</style>
