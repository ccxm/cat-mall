<template>
    <div>
      <el-carousel :height="imgHeight">
        <el-carousel-item v-for="item in 3" :key="item">
          <el-image ref="imgHeight"
            :src="require(`./../../../public/images/banner/banner_0${item}.png`)"
            fit="fill" @load="loadedImg"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
    export default {
        name: 'c-banner',
        data () {
            return {
                imgHeight: '440px'
            }
        },
        mounted () {
            window.onresize = () => {
                this.imgHeight = this.$refs.imgHeight[0].$el.clientHeight + 'px'
            }
        },
        methods: {
            loadedImg () {
                this.imgHeight = this.$refs.imgHeight[0].$el.clientHeight + 'px'
            }
        }
    }
</script>

<style lang="scss">

  .el-carousel ul li .el-carousel__button {
    width: 3.375rem;
    height: 0.25rem;
    background: #FF7C25;
    border-radius: 0.09375rem;
  }

</style>
