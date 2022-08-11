import Vue from 'vue';








/**
  获取某个组件渲染的Dom根元素
*/
export default function(comp, props) {
    const vm = new Vue({ // 生成vue实例
        render: h => h(comp, { props }) // 渲染 => (某个组件，{ 组件的属性 })
    })
    vm.$mount(); // vue实例挂载(不挂载无法生产真实dom)
    return vm.$el; // $el是vm里面的属性，它对应的是props的值(就是真实dom)
}