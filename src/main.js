import Vue from 'vue';
import App from './App.vue';
import '@/less/global.less';
import router from '@/public/router/index';// 路由
import popup from '@/public/popup/index';// 弹窗
import { vLoading } from '@/public/directives';// 加载
import { vLazy } from '@/public/directives';// 获取dom指令
import '@/api/mock';// 响应数据
import '@/api/requests/get/Home';// 首页的数据请求
import '@/public/eventBus'// 事件总线
import store from '@/public/store';// 仓库











Vue.prototype.$popup = popup;
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

// 立即触发获取左侧菜单数据操作
store.dispatch('setting/getSettings');



// 渲染
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');