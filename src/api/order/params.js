export const pCreateOrder = Object.seal({
    addressId: '',
    orderList: []
})

export const pCreateOrderItem = Object.seal({
    goodsId: '',
    purchaseNum: 0
})

export const pPayForOrder = Object.seal({
    orderId: '',
    paykey: ''
})

export const pGetOrderList = Object.seal({
    currentPage: 0,
    pageSize: 6
})

export const pDeleteOrder = Object.seal({
    orderId: ''
})
