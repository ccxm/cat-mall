import { Message } from 'element-ui'
import { TIP_TYPE } from '@/config/constant'

export const common = (message, type = 'success', duration = 2000) => {
    Message({
        message,
        type,
        duration
    })
}

export const success = message => common(message)

export const warn = message => common(message, 'warning')

export const error = message => common(message, 'error')

export const info = message => common(message, 'info')

export const loading = (message) => {
    return Message({
        message,
        type: TIP_TYPE.SUCCESS,
        duration: 0,
        iconClass: 'el-icon-loading',
        customClass: 'loading-tips'
    })
}

export const emptyParam = message => {
    return Message({
        message,
        type: TIP_TYPE.ERROR,
        duration: 5000
    })
}

export const invalidParam = message => {
    return Message({
        message,
        type: TIP_TYPE.ERROR,
        duration: 5000
    })
}

export const sendVerifyCode = () => {
    return Message({
        message: '验证码已发送至您的邮箱，请注意查收',
        type: TIP_TYPE.WARNING,
        duration: 3000
    })
}
