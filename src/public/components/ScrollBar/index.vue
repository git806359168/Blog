<template>
    <div class="toTop-container" v-show='show' @click="handleClick">
        <i class="iconfont icon-shangjiantou"></i>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show: false
        }
    },

    // 开始监听 ~ 销毁监听
    created(){
        this.$bus.$on('scrollBar', this.handleScroll);
    },
    destroyed(){
        this.$bus.$off('scrollBar', this.handleScroll);
    },



    methods: {
        // 滚动条触发事件 - 显示元素
        handleScroll(dom){
            if (!dom) {// 如果当前页面不存在了
                this.show = false;
                return;
            }
            this.show = dom.scrollTop >= 500;
            // 如果滚动条下拉到500px后就触发v-show，将show改为true，反之改为false。
        },


        handleClick(){
            this.$bus.$emit('setScroll', 0);// monitors文件接收
        }
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    @import './iconfont/iconfont.css';
    .toTop-container{
        width: 45px;
        height: 45px;
        position: fixed;
        background: @primary;
        border-radius: 50%;
        z-index: 99;
        right: 3%;
        bottom: 4%;
        cursor: pointer;
        text-align: center;
        .iconfont{
            color: #fff;
            font-style: normal;// 去除斜体
            font-size: 20px;
            line-height: 42px;
        }
    }
</style>