
//导入模块
import * as api_users from './users'

const apiObj = {
    api_users,
}

const install = function (Vue) {
    if (install.installed) return
    install.installed = true

    //定义属性到Vue原型中
    Object.defineProperties(Vue.prototype, {
        $fetch: {
            get() {
                return apiObj
            }
        }
    })
}

export default {
    install
}
