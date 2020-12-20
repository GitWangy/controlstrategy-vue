
import requset from "../utils/request"

/**
 * 登录接口
 * @param data
 * @returns {AxiosPromise}
 */
export const login = data => {
    return requset({
        method: 'POST',
        url: '/login',
        // data 用来设置 POST 请求体
        data
    })
}


/**
 * 获取用户信息
 * @returns {AxiosPromise}
 */
export const getUserProfile = () =>{
    const token = window.localStorage.getItem("jwt")
    return requset({
        method: 'GET',
        url:'/getUserInfo'
    })
}