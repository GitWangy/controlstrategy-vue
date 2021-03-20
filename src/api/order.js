import requset from "../utils/request"
import axios from 'axios'
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

/**
 * 获取符合条件的订单信息
 * @returns {AxiosPromise}
 */
export const updateOrInsertControDic = data =>{
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
 * 获取符合条件的订单信息
 * @returns {AxiosPromise}
 */
export const updateOrInsertTransportOrder = data =>{
    return requset({
        method: 'POST',
        url:'/updateOrInsertTransportOrder',
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
export const getTransPortOrderById = params =>{
    return requset({
        method: 'GET',
        url:'/getTransPortOrderById',
        params
    })
}

export const getErrDate = params =>{
    return requset({
        method: 'GET',
        url:'/getErrData',
        params
    })
}

export const batchRunningData = params =>{
    return requset({
        method: 'GET',
        url:'/batchRunningData',
        params
    })
}


// 导出Excel公用方法
export function exportMethod(data) {
    requset({
        method: "post",
        url: "/exportOrderInfo",
        data,//导出的数据
        responseType: "blob"
    }).then(res => {
            const link = document.createElement("a");
            let blob = new Blob([res.data], { type: "multipary/form-data" });
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", decodeURI(Date.now()+'导出模板.xlsx'));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(res);
        })

}
