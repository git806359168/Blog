import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { browserTitle } from '@/public/plugin';








// 避免和打包冲突，判断VueRouter是否全局存在
if (!window.VueRouter) {
  Vue.use(VueRouter);
}



// 路由实例配置
const router = new VueRouter({
  mode: 'history',
  routes
});



// 给浏览器导航条添加路由标题(browserTitle文件)
router.afterEach((to, from) => {
  browserTitle.setRouteTitle(to.meta.title || '');
});


export default router;