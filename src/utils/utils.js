// 验证邮箱
export const testEmail = (email) => {
    const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/
    return reg.test(email)
}

// 验证密码
export const testPassword = (password) => {
    const reg = /^(\w){6,20}$/
    return reg.test(password)
}

// 验证验证码
export const testVerifyCode = (verifyCode) => {
    const reg = /^[0-9]{6}$/
    return reg.test(verifyCode)
}

// 保存token
export const saveToken = token => {
    localStorage.setItem('token', token)
}

// 删除token
export const deleteToken = () => {
    localStorage.removeItem('token')
}

// 保存token
export const getToken = () => {
    return localStorage.getItem('token')
}
