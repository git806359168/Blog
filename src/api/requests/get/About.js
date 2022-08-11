import interceptor from '../interceptor';







export async function getAbout(){
    return await interceptor.get('/api/about')
}
