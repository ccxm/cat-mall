import { get, post, put, del } from '@/plugins/modules/request'

export const getCartList = params => get('/cart/cart', params)

export const addToCart = params => post('/cart/cart', params)

export const updateCart = params => put('/cart/cart', params)

export const deleteFromCart = params => del('/cart/cart', params, {
    showTip: true,
    tipMsg: '删除购物车成功'
})

export const getCartLength = () => get('/cart/cart-length')
