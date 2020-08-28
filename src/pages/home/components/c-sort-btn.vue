<template>
    <div class="c-sort-btn xy-center">
        <span>排序</span>
        <i class="el-icon-top" :class="sortType === 'ASC' ? '' : 'down'" @click="changeSortType"></i>
    </div>
</template>

<script>
    export default {
        name: 'CSortBtn',
        props: {
            sortType: {
                type: String,
                default: 'ASC'
            }
        },
        methods: {
            changeSortType() {
                this.$emit('change')
            }
        }
    }
</script>

<style scoped lang="scss">

    .c-sort-btn {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        .el-icon-top {
            margin-left: 10px;
            font-size: 25px;
            transition: All 0.4s ease;
            -webkit-transition: All 0.4s ease;
        }

        .down {
            transform: rotate(180deg);
        }
    }

</style>
