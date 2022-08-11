import { getSetting } from '@/api/requests/get/Setting';
import { browserTitle } from '@/public/plugin';








// 左侧菜单插件，在main中触发事件
export default {
    namespaced: true,
    state: {
        loading: false,
        data: null
    },


    mutations: {
        setLoading(state, payload){
            state.loading = payload;
        },
        setData(state, payload){
            state.data = payload;
        }
    },


    actions: {
        async getSettings(ctx){
            ctx.commit('setLoading', true);
            const resp = await getSetting();
            ctx.commit('setData', resp);
            ctx.commit('setLoading', false);
            if (resp.favicon) {// 如果服务器有favicon属性
                let link = document.querySelector('link[ref="shortcut icon"]')
                if (link) {// 如果项目中有该dom
                    return;
                }else{
                    link = document.createElement('link');
                    link.rel = 'shortcut icon';// 规定当前文档与被链接文档之间的关系。
                    link.type = 'images/x-icon';
                    link.href = resp.favicon;
                    document.querySelector('head').appendChild(link);
                }
            }

            // 给浏览器导航条添加博客标题(browserTitle文件)
            browserTitle.setSiteTitle(resp.siteTitle || '');
        }
    }
}
