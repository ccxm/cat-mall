// m代表mixins
import { pLikeForGoods } from '@api/comment/params'

export const mLike = {
    data() {
        return {
            likeList: []
        }
    },
    computed: {
        checkIsLike() {
            this.likeList = this.$store.getters.getGoodsLikeList
            // 为了和详情区分开
            const goodsId = this.goodsInfo ? this.goodsInfo.goodsId : this.goodsDetail.goodsId
            return this.likeList.includes(goodsId)
        }
    },
    methods: {
        likeForGoods(goodsId) {
            console.log('开始点赞')
            pLikeForGoods.goodsId = goodsId
            this.$api.user.likeForGoods(pLikeForGoods).then(res => {
                console.log(res)
                if (this.goodsInfo) {
                    this.goodsInfo.likeNum = res.likeNum
                } else {
                    this.goodsDetail.likeNum = res.likeNum
                }
                this._updateLikeList(goodsId, res.likeState)
            })
        },
        // 更新点赞列表
        _updateLikeList(goodsId, likeState) {
            if (likeState) {
                this.likeList.push(goodsId)
            } else {
                this.likeList.splice(this.likeList.indexOf(goodsId))
            }
        }
    }
}
