<template>
    <div class="c-bread container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in getRouters" :key="index"
                                :class="index === (getRouters.length -1) ? 'last-item' : ''"
                                :to="{ path: item.fullPath }">{{item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    import routerList from '../../router/routerList'

    export default {
        name: 'CBread',
        props: ['path'],
        computed: {
            getRouters() {
                return this.$store.getters.getRouters
            }
        },
        data() {
            return {
                routerList
            }
        },
        methods: {
            goToThePath(path) {

            },
            getQueryString(obj) {
                let str = ''
                for (let key in obj) {
                    str += `${key}=${typeof obj[key]}&`
                }
                return str.length ? str.substring(0, str.length - 1) : str
            }
        }
    }
</script>

<style lang="scss">
    .c-bread {
        background: #F2F2F2 !important;
        height: 40px;
        justify-content: left !important;
        padding-left: 20px;

        .el-breadcrumb__inner.is-link {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 500;

            &:hover {
                color: #FF7C25;
            }
        }

        .last-item .el-breadcrumb__inner {
            color: rgba(255, 124, 37, 1) !important;
        }

        .test {
            margin: 20px;
        }
    }

    .div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
