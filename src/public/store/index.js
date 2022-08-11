import Vue from 'vue';
import { Store, install} from 'vuex';
import home from './url/home';
import setting from './url/setting';
import about from './url/about';
import project from './url/project';







// 避免和打包冲突，判断Vuex是否全局存在
if (!window.Vuex) {
    install(Vue);
}


const store = new Store({
    modules: {
        home,
        setting,
        about,
        project
    },
    strict: true // 开启严格模式
});

// window.store = store;// 控制台测试
export default store;