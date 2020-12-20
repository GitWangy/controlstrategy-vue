import axios from 'axios'

// 相当于复制了一个axios，，个人理解相当于对象的构造函数,对不同的属性进行自定义配置
const requset = axios.create({
    baseURL : 'http://localhost:8081'
})

requset.interceptors.request.use(
    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象
    // config 是可以修改的
    function (config) {
        let token = window.localStorage.getItem('jwt')
        // 如果有登录用户信息，则统一设置 token
        if (token) {
            config.headers.Authorization = `${token}`
        }

        // 然后我们就可以在允许请求出去之前定制统一业务功能处理
        // 例如：统一的设置 token

        // 当这里 return config 之后请求在会真正的发出去
        return config
    },
    // 请求失败，会经过这里
    function (error) {
        return Promise.reject(error)
    }
)

// 导出模块，该模块可以在别的地方被导入
export default requset;