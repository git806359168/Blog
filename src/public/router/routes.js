import 'nprogress/nprogress.css';
import {start, done, configure} from 'nprogress';// 加载条插件
import NotFound from '@/public/components/NotFound';// 404








// 控制台测试用
// window.start = start;
// window.done = done;

// 加载条的配置
configure({
    trickleSpeed: 20,// 速度
    showSpinner: false // 删除右上角的loading
})



// 页面异步加载延迟函数
function delay(duration = 500){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration)
    })
}
// 页面异步加载处理方法
function getPageComponent(pageCompResolver){
    return async () => {
        // console.log('组件开始加载。');
        start();
        if (process.env.NODE_ENV === 'development') {
            await delay(2000);
        }
        const comp = await pageCompResolver();
        // console.log('组件加载结束。');
        done();
        return comp;
    }
}




export default[
    {
        name: 'Home',
        path: '/',
        component: getPageComponent(() => import(
            /*webpackChunkName: home*/'@/main/middle/Home'
        )),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'Article',
        path: '/article',
        component: getPageComponent(() => import(
            /*webpackChunkName: article*/'@/main/middle/Article/index'
        )),
        meta: {
            title: '文章'
        }
    },
    {
        name: 'ArticleClassify',
        path: '/article/cate/:classifyId',
        component: getPageComponent(() => import(
            /*webpackChunkName: articleClassify*/'@/main/middle/Article/index'
        )),
        meta: {
            title: '文章'
        }
    },
    {
        name: 'ArticleDetail',
        path: '/article/:id',
        component: getPageComponent(() => import(
            /*webpackChunkName: articleDetail*/'@/main/middle/Article/detail/index'
        ))
    },
    {
        name: 'Message',
        path: '/message',
        component: getPageComponent(() => import(
            /*webpackChunkName: message*/'@/main/middle/Message'
        )),
        meta: {
            title: '留言板'
        }
    },
    {
        name: 'Project',
        path: '/project',
        component: getPageComponent(() => import(
            /*webpackChunkName: project*/'@/main/middle/Project'
        )),
        meta: {
            title: '项目&效果'
        }
    },
    {
        name: 'About',
        path: '/about',
        component: getPageComponent(() => import(
            /*webpackChunkName: about*/'@/main/middle/About'
        )),
        meta: {
            title: '关于我'
        }
    },
    {
        name: 'NotFound',
        path: '*',// 如果的组件没有匹配到就进入这个组件
        component: NotFound    
    }
]