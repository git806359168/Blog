import { getHome } from '@/api/requests/get/Home';








export default {
    namespaced: true,
    state: {
        loading: false,
        data: []
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
        async getHomes(ctx){
            if (ctx.state.data.length) {
                return;
            };
            ctx.commit('setLoading', true);
            const resp = await getHome();
            ctx.commit('setData', resp);
            ctx.commit('setLoading', false);
        }
    }
}
