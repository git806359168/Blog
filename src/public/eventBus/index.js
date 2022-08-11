import Vue from 'vue';







// 事件总线插件
const app = new Vue()
Vue.prototype.$bus = app;
export default app;

/*
    事件触发原理：
        - 在某个组件中使用$refs获取当前页的总dom，利用该dom创建一个当前页的事件，该事件创建一个方法。
        - 然后在这个方法里使用$bus.$emit创建一个新事件并抛出。
        - 抛出的事件任何组件都能监听，根据抛出事件的名称即可接收监听。
*/
/*
    事件名：    Scroll
    触发条件：  详情页主页滚动条位置变化后触发
    参数：      触发事件后可以得到当前页的主dom。如果是undefined，则表示当前dom已经销毁。

    事件名：    setScroll
    触发条件：  当需要设置主区域滚动条位置时触发(ToTop抛出事件)
    参数：      触发事件后将某个dom的top值设置为0。
*/