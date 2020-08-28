export const pLogin = Object.seal({
    email: '',
    password: ''
})

export const pRegister = Object.seal({
    email: '',
    password: '',
    verifyCode: ''
})

export const pResetPassword = Object.seal({
    email: '',
    password: '',
    verifyCode: ''
})

export const pCheckFieldCanUse = Object.seal({
    field: '',
    value: ''
})

export const pUpdateUserInfo = Object.seal({
    nickName: '',
    gender: 0, // 0：男，1：女
    avatarUrl: ''
})

export const pAddAddress = {
    name: '',
    phone: '',
    detailedAddress: '',
    completedAddress: '',
    regionList: [],
    addressTable: {
        province: {
            value: '',
            label: ''
        },
        city: {
            value: '',
            label: ''
        },
        area: {
            value: '',
            label: ''
        }
    }
}

export const pDeleteAddress = Object.seal({
    addressId: ''
})
