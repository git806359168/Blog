import interceptor from '../interceptor';







// 获取消息
export async function getMessage(page = 1, limit = 10){
    return await interceptor.get('/api/message', {
        params: {
            page,
            limit
        }
    })
}



// 提交消息
export async function postMessage(msgInfo){
    return await interceptor.post('/api/message', msgInfo)
}