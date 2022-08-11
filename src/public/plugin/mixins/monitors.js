







// 该组件用于滚动条回到顶部事件监听
export default function(refValue){
    return {
        // 监听抛出事件 ~ 销毁事件
        mounted(){
            this.$refs[refValue].addEventListener('scroll', this.handle_Scroll);// 滚动条触发
            this.$bus.$on('setScroll', this.handle_SetScroll);// top归0
        },
        beforeDestroy(){
            this.$refs[refValue].removeEventListener('scroll', this.handle_Scroll);
            this.$bus.$off('setScroll', this.handle_SetScroll);
            this.$bus.$emit('scrollBar', undefined);// 如果当前页面不存在了就抛出事件销毁
        },



        // 事件操作
        methods: {
            handle_Scroll(){// 滚动条触发
                this.$bus.$emit('scrollBar', this.$refs[refValue]);
            },
            handle_SetScroll(scrollTop){// top归0[scrollTop数据来自ToTop的handleClick方法]
                this.$refs[refValue].scrollTop = scrollTop;
            }
        }
    }
}

/*
    工作原理：
        —— 上级文件根据mixins抛出$refs的容器值
        —— 当前文件根据抛出的值在钩子函数使用addEventListener创建一个滚动事件(scroll)，然后为该事件创建名为handle_Scroll的方法。
        —— handle_Scroll方法使用事件总线($bus)抛出一个名为scrollBar的事件(ToTop文件接收)。
        —— handle_Scroll方法执行完毕后，scroll事件及其方法在钩子函数中被销毁。

        —— 在当前文件的钩子函数中使用事件总线($bus)接收来自ToTop抛出的setScroll事件，并且为该创建一个名为handle_SetScroll的方法。
        —— handle_SetScroll方法根据ToTop文件传过来的数据将上级文件总dom的top值归为0。
        —— handle_SetScroll方法执行完毕后，setScroll事件及其方法在钩子函数中被销毁。
*/