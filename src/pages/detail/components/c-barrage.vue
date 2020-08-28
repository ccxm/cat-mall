<template>
    <div class="c-barrage">
        <c-tag v-for="(item,index) in tempBriefList" :key="index" :detail="item" :goods-id="goodsId" :index="index"
               @change="onLikeNumChange"/>
        <c-input-tag class="c-input-tag" @inputTag="onTagInput"/>
    </div>
</template>

<script>
    import CTag from './c-tag'
    import CInputTag from './c-input-tag'
    import { pWriteBrief } from '@api/comment/params'

    export default {
        name: 'CBarrage',
        components: {
            CTag,
            CInputTag
        },
        props: {
            briefList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            goodsId: {
                type: String,
                default: ''
            }
        },
        watch: {
            briefList(val) {
                this.tempBriefList = val
            }
        },
        data() {
            return {
                tempBriefList: []
            }
        },
        mounted() {
            this.tempBriefList = this.briefList
        },
        methods: {
            onTagInput(text, color) {
                pWriteBrief.brief = text
                pWriteBrief.color = color
                pWriteBrief.goodsId = this.goodsId
                this.writeBrief()
            },
            writeBrief() {
                this.$api.comment.writeBrief(pWriteBrief).then(res => {
                    this.updateBriefList(res.briefItem)
                })
            },
            // 更新短评数组
            updateBriefList(temp) {
                // 如果存在则更新，不存在则直接push
                const briefItem = this.tempBriefList.find(item => item.briefId === temp.briefId)
                if (briefItem) {
                    briefItem.color = temp.color
                    briefItem.likeNum = temp.likeNum
                } else {
                    this.tempBriefList.push(temp)
                }
            },
            // 监听点赞数量的变化
            onLikeNumChange(index, likeNum) {
                this.tempBriefList[index].likeNum = likeNum
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-barrage {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        .c-input-tag {
            display: inline-block;
        }
    }
</style>
