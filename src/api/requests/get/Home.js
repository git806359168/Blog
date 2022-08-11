import interceptor from '../interceptor';








export async function getHome(){
    return await interceptor.get('/api/home');
}