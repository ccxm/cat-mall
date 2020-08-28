import { post } from '@/plugins/modules/request'

export const getVerifyCode = params => post('/public/get-verify-code', params)
