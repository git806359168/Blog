import Mock, { Random } from "mockjs";








Mock.mock("/api/setting", "get", {
        code: 0,
        msg: "",
        data: {
        avatar: "https://img2.baidu.com/it/u=3824387043,3128627788&fm=253",
        siteTitle: "大白的空间",
        github: "https://github.com",
        qq: "3263023350",
        weixin: "yh777bao",
        mail: "duyi@mail.com",
        icp: "鄂ICP备17001719号",
        githubName: "DuYi-Edu",
        favicon: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F63%2F14%2F589bdc932ff44_610.jpg&app=2002"
    }
});