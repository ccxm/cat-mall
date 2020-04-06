<template>
  <div class="c-price-range">
    <span class="c-price-title">价格范围</span>
    <el-checkbox-group class="price-checkbox"
                       v-model="checked"
                       @change="onChange"
                       :min="1">
      <el-checkbox v-for="(item, key) in PRICE_RANGE" :label="item.value" :key="key">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
    import { PRICE_RANGE } from './../../../js/const-table'
    export default {
        name: 'CPriceRange',
        data () {
            return {
                checked: ['ALL'],
                PRICE_RANGE
            }
        },
        methods: {
            onChange() {
                this.checked.shift()
                this.$emit('change', this.PRICE_RANGE[this.checked[0]].value)
            }
        }
    }
</script>

<style lang="scss">

  .c-price-range {
    width: 235px;
    height: 312px;
    background: #fff;
    font-family: Microsoft YaHei;
    text-align: left;

    .c-price-title {
      width: 215px;
      display: inline-block;
      font-size: 16px;
      color: rgba(102, 102, 102, 1);
      margin: {
        top: 10px;
        left: 10px;
        bottom: 5px;
      }
      padding: 7px 2px;
      border-bottom: 1px solid #ddd;
    }

    .price-checkbox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;

      .el-checkbox {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .el-checkbox__input {

          .el-checkbox__inner {
            width: 18px;
            height: 18px;

            &::after {
              width: 5px;
              box-sizing: content-box;
              content: "";
              border: 2px solid #FF7C25;
              border-left: 0;
              border-top: 0;
              height: 10px;
              left: 5px;
              position: absolute;
              top: 0;
            }

            &:hover {
              border-color: #FF7C25 !important;
            }
          }

          .ic-check .el-checkbox__inner {
            background-color: #fff;
            border-color: #FF7C25;
          }
        }

        .el-checkbox__label {
          transition: all .5s;
          -webkit-transition: all .5s;

          &:hover {
            margin-left: 10px;
            color:  #FF7C25;
          }
        }

        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-focus .el-checkbox__inner {
          background-color: #fff !important;
          border-color: #FF7C25 !important;
        }

        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #FF7C25 !important;
          transition: all .5s;
          -webkit-transition: all .5s;
        }

      }

      span {
        font-size: 22px;
        color: rgba(46, 46, 46, 1);
        /*line-height:40px;*/
      }
    }
  }

</style>
