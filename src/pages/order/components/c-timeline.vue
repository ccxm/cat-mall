<template>
    <div class="c-timeline">
        <div class="time-context">
            <div class="time-item" v-for="item in 4" :key="item">
                <div class="time-item">
                    <span :class="item <= curStep ? 'done' : ''">0{{item}}</span>
                </div>
                <div :class="item < curStep ? 'done-line' : ''" v-if="item <= 3" class="line"></div>
            </div>
        </div>
        <div class="timeline-context">
            <span v-for="(item, index) in stepText" :key="index"
                  :class="index < curStep ? 'done-span' : ''">{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CTimeline',
        props: {
            curStep: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                stepText: ['收货地址', '确认订单', '待支付', '支付成功']
            }
        }
    }
</script>

<style scoped lang="scss">
    .c-timeline {
        font-family: Source Han Sans CN;
        margin-top: 30px;

        .time-context {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 1200px;

            .time-item {
                display: flex;
                align-items: center;

                .line {
                    width: 293px;
                    height: 2px;
                    background: #B3B7C8;
                }

                .done-line {
                    background: #FF4400;
                }

                span {
                    display: block;
                    background: #B3B7C8;
                    width: 80px;
                    height: 80px;
                    font-size: 36px;
                    color: rgba(255, 255, 255, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 100%;
                }

                .done {
                    background: #FF4400;
                }
            }

        }

        .timeline-context {
            width: 1200px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 11px;
            font-size: 20px;
            color: rgba(179, 183, 200, 1);

            .done-span {
                color: rgba(255, 68, 0, 1);
            }
        }
    }
</style>
