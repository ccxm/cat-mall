import * as tips from './tips'

const Tips = {
    install(Vue) {
        Vue.prototype.$tips = tips
    }
}

export default Tips
