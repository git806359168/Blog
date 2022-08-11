import interceptor from '../interceptor';








export async function getSetting() {
    return await interceptor.get("/api/setting");
}
