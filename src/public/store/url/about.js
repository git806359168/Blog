import { getAbout } from '@/api/requests/get/About';







export default {
    namespaced: true,
    state: {
        loading: false,
        data: ''
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
        async getAbouts(ctx){
            if (ctx.state.data.length) {// 如果data里面有数据了
                return;
            };
            ctx.commit('setLoading', true);
            const resp = await getAbout();
            ctx.commit('setData', resp);
            ctx.commit('setLoading', false);
        }
    }
}
