import Element from 'element-ui'
import axios from 'axios'

// 前置拦截
axios.interceptors.request.use(config =>{
    return config
})

axios.interceptors.response.use(response =>{
    let resp = response.data
    const status = resp.code
    const message = resp.message
    if (status == "5000") {
        return response
    } else {
        Element.Message.error("登陆失败:"+message,{duration:3*100})
        return Promise.reject(response.data.message);
    }
})
