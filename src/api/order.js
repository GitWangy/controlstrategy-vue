import requset from "../utils/request"

/**
 * 获取符合条件的订单信息
 * @returns {AxiosPromise}
 */
export const getAllOrderBasicInfo = data =>{
    return requset({
        method: 'POST',
        url:'/getAllOrderBasicInfo',
        // Body 参数使用 data 设置
        // Query 参数使用 params 设置
        // Headers 参数使用 headers 设置
        data
    })
}

/**
 * 根据类型获取字典值
 * @param params
 * @returns {AxiosPromise}
 */
export const getAllControDicByType = params =>{
    return requset({
        method: 'GET',
        url:'/dic/getAllControDicByType',
        params
    })
}


/**
 * @returns {AxiosPromise}
 */
export const getControDicByParam = data =>{
    return requset({
        method: 'POST',
        url:'/dic/getControDicByParam',
        // Body 参数使用 data 设置
        // Query 参数使用 params 设置
        // Headers 参数使用 headers 设置
        data
    })
}

/**
 * 获取符合条件的订单信息
 * @returns {AxiosPromise}
 */
export const updateControDicByParam = data =>{
    return requset({
        method: 'POST',
        url:'/dic/updateControDicByParam',
        // Body 参数使用 data 设置
        // Query 参数使用 params 设置
        // Headers 参数使用 headers 设置
        data
    })
}


/**
 * 通过主键获取字典信息
 * @param params
 * @returns {AxiosPromise}
 */
export const getControDicById = params =>{
    return requset({
        method: 'GET',
        url:'/dic/getControDicByid',
        params
    })
}