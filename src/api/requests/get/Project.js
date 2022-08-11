import interceptor from '../interceptor';







export async function getProject(){
    return await interceptor.get('/api/project')
}
