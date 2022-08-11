







// 设置浏览器导航条的标题名称
export default {
    // 添加路由标题
    setRouteTitle(title){
        routeTitle = title;
        setTitle();
    },

    // 添加博客标题
    setSiteTitle(title){
        siteTitle = title;
        setTitle();
    }
}



let routeTitle = '',
    siteTitle = '';



function setTitle(){
    if (!routeTitle || !siteTitle) {// 数据还没加载完成时
        document.title = 'loading...';
    }else if (routeTitle && !siteTitle) {// 没博客标题
        document.title = routeTitle;
    }else if (!routeTitle && siteTitle) {// 没路由标题
        document.title = siteTitle;
    }else{
        document.title = `${siteTitle}-${routeTitle}`;
    }
}
