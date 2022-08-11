import interceptor from '../interceptor';







// 获取首页数据
export async function getArticle(page = 1, limit = 10, classifyid = -1){
    // console.log(page, limit, categoryid);
    return await interceptor.get('/api/article', {
        params: {
            page,
            limit,
            classifyid
        }
    })
}



// 获取文章分类
export async function getArticleClassify(){
    return await interceptor.get('/api/classify')
}



// 获取文章详情数据
export async function getArticleDetail(id){
    return await interceptor.get(`/api/article/${id}`);
}




// 提交评论
export async function submitComment(commentInfo){
    return await interceptor.post('/api/comment', commentInfo);
}




// 获取分页评论
export async function getComments(articleid, page = 1, limit = 10){
    return await interceptor.get('/api/comment', {
        articleid,
        page,
        limit
    })
}
