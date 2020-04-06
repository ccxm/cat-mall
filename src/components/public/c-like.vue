<template>
  <div class="c-like" :class="isLike ? 'like' : ''">
    <img :src="require(`./../../../public/svgs/like_${isLike ? 1 : 0}.svg`)">
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
            clickLike () {
                this.$emit('like')
            }
        }
    }
</script>

<style scoped lang="scss">
  .c-like {
    display: flex;
    align-items: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(136,136,136,1);

    img {
      width: 19px;
      height: 19px;
      margin-right: 5px;
    }

    .add {
      margin-top: -8px;
    }
  }

  .like {
    color: #FF7C25;
  }
</style>
