<template>
    <div class="c-like y-center" :class="isLike ? 'like' : ''">
        <img :class="isLike ? 'enlarge' : 'diminish'"
             :src="require(`./../../../public/svgs/like_${isLike ? 1 : 0}.svg`)">
        <span>{{likeNum | formatLikeNum}}</span>
        <span v-if="likeNum > 999" class="add">+</span>
    </div>
</template>

<script>
    export default {
        name: 'CLike',
        props: {
            isLike: {
                type: Boolean,
                default: false
            },
            likeNum: {
                type: Number,
                default: 1
            }
        },
        methods: {
            clickLike() {
                this.$emit('like')
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-like {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 200;
        color: rgba(136, 136, 136, 1);
        height: 20px;

        img {
            width: 18px;
            height: 18px;
            margin-right: 5px;
        }

        .diminish {
            animation: diminish .4s linear;
            -moz-animation: diminish .4s linear;
        }

        .enlarge {
            animation: enlarge .4s linear;
            -moz-animation: enlarge .4s linear;
        }

        .add {
            margin-top: -8px;
        }
    }

    .like {
        color: #FF7C25;
    }

    // 变小
    @keyframes diminish {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(0);
        }
    }

    @-webkit-keyframes diminish {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(0);
        }
    }

    // 变大
    @keyframes enlarge {
        from {
            transform: scale(0);
        }

        to {
            transform: scale(1);
        }
    }

    @-webkit-keyframes enlarge {
        from {
            transform: scale(0);
        }

        to {
            transform: scale(1);
        }
    }

</style>
