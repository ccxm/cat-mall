<template>
    <div class="c-card-total">
        <el-popover
                placement="top"
                width="1200"
                offset="300"
                trigger="manual"
                v-model="visible">
            <div class="c-total-container">
                <p>普通商品<span>1</span>件</p>
                <div class="total-img-container xy-center">
                    <img src="../../../../public/images/cat/cat_01.png">
                    <img src="../../../../public/images/cat/cat_02.png">
                </div>
            </div>
            <el-button slot="reference" @click="visible = !visible">手动激活</el-button>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: 'CardTotal',
        data() {
            return {
                visible: false
            }
        }
    }
</script>

<style scoped>

    .c-total-container {
        background: #494949;

        p {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);

            span {
                color: #FF6B67;
                font-size: 16px;
            }

        }

        img {
            width: 50px;
            height: 50px;
        }
    }

</style>
