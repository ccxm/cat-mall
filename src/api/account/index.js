import { get, put } from '@/plugins/modules/request'

export const getBalance = () => get('/account/balance')

export const getRechargeList = () => get('/account/recharge-list')

export const recharge = params => put('/account/recharge', params, {
    showTip: true,
    tipMsg: '充值成功'
})

export const checkHasPaykey = () => get('/account/check-has-paykey')

export const updatePaykey = params => put('/account/paykey', params, {
    showTip: true,
    tipMsg: '设置支付密码成功'
})
