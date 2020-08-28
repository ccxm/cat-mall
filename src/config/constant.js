/**
 * 基础常量，存放一行的常量
 */

export const MAX_PRICE = 1000000000
export const PAGE_SIZE = 6

/**
 * 对象常量，存放多行的常量
 */

export const TIP_TYPE = Object.freeze({
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
})

export const PRICE_RANGE = Object.freeze({
    ALL: {
        start: 0,
        limit: MAX_PRICE,
        label: 'ALL',
        value: 'ALL'
    },
    CHEEPER: {
        start: 0,
        limit: 100,
        label: '0.00 - 100.00',
        value: 'CHEEPER'
    },
    CHEEP: {
        start: 100,
        limit: 500,
        label: '100.00 - 500.00',
        value: 'CHEEP'
    },
    EXPENSIVE: {
        start: 500,
        limit: 1000,
        label: '500.00 - 1000.00',
        value: 'EXPENSIVE'
    },
    EXPENSIVER: {
        start: 1000,
        limit: MAX_PRICE,
        label: '1000+',
        value: 'EXPENSIVER'
    }
})

export const SORT_TYPE = Object.freeze({
    ASC: 'ASC',
    DESC: 'DESC'
})
