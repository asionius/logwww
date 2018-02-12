//导入模块
import axios from 'axios'

function fetch(options) {
    return new Promise((resolve, reject) => {
        //创建一个axios实例
        const instance = axios.create({
            //设置默认根地址
            baseURL: '',
            //设置请求超时设置
            timeout: 1200000,
        })
        //请求处理
        instance(options)
            .then((response) => {
                let data = response.data
                if (data.code == 0)
                    resolve(data)
                else
                    if (data.code == 3000) {
                        location.href = "/login"
                    } else
                        reject({
                            code: data.code,
                            msg: data.msg
                        })
            })
            .catch((error) => {
                //请求失败时,根据业务判断状态
                if (error.response) {
                    let resError = error.response
                    let resCode = resError.status
                    let resMsg = error.message
                    reject({
                        code: resCode,
                        msg: resMsg
                    })
                }
            })
    })
}
export default fetch
