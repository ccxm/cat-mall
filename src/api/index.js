import * as user from './user'
import * as publicRequest from './public'
import * as account from './account'
import * as cart from './cart'
import * as comment from './comment'
import * as order from './order'
import * as goods from './goods'

const api = {
    user,
    account,
    cart,
    comment,
    order,
    goods,
    public: publicRequest
}

export default api
