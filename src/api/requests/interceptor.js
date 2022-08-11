import axios from "axios";
import popup from "@/public/popup/index";








// 数据拦截器
const ins = axios.create();
ins.interceptors.response.use( function( resp ){
    if (resp.data.code !== 0) {
        popup({
            content: resp.data.msg,
            type: 'error'
        })
        return null;
    }
    return resp.data.data;
})

export default ins;