<template>
    <div>
        <el-popover
                placement="left"
                width="250"
                trigger="hover">
            <div class="address-popover-container">
                <p>{{address.name || '杨绍昕'}}</p>
                <p>{{address.completedAddress|| '广东省茂名市电白区麻岗镇牛林村'}}</p>
                <p>{{address.phone || 15217808825}}</p>
            </div>
            <span slot="reference" class="address-span">物流信息</span>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: 'CAddressPopover',
        props: ['address']
    }
</script>

<style scoped lang="scss">
    .address-popover-container {
        padding-left: 5px;

        p {
            margin: 10px !important;
            font-size: 14px !important;
            color: #333;

            &:nth-child(1) {
                font-weight: bold;
            }
        }
    }

    .address-span {
        &:hover {
            color: #ff4400;
            padding-bottom: 2px;
            border-bottom: 1px solid #ff4400;
        }
    }
</style>
