import Mock from 'mockjs';







Mock.mock('/api/about', 'get', {
    code: 0,
    msg: '没有数据',
    data: 'https://www.strml.net/'
    // https://www.dandyweng.com/
})
    