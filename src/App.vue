<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import tokenInstance from '@utils/dataStore'

    export default {
        // 监听路由的变化，有变化就加入path数组里面
        watch: {
            $route(to, from) {
                this.$store.dispatch('changeRouter', {
                    to: to.path,
                    from: from.path,
                    fullPath: this.$route.fullPath
                })
            }
        },
        methods: {
            getCartList() {
                this.$api.cart.getCartLength().then(res => {
                    this.$store.dispatch('saveUserInfo', { ...res })
                })
            }
        },
        mounted() {
            this.$store.dispatch('saveUserInfo', tokenInstance.getUserInfo())
            this.getCartList()
            this.$bus.$on('updateCartLength', () => {
                this.getCartList()
            })
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/public";
    @import "./assets/scss/css/font-awesome.min.css";
    @import "./assets/scss/fonts/index.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        display: flex;
        justify-content: center;
        min-width: 1200px;
        margin: 0;
        padding: 0;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
