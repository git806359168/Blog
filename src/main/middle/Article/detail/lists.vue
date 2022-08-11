<template>
    <div>
        <h2>详情列表</h2>
        <List :list='activation' @select="handleSelect" />
    </div>
</template>

// 详情页右侧列表

<script>
import List from '@/public/components/List';
import { antiShake } from '@/public/plugin';
export default {
    components: {
        List
    },
    props: {
        Lists:{ // 数据来源index
            type: Array
        }
    },
    data(){
        return {
            activeAnchor: ''
        }
    },



    // 监听抛出事件 ~ 销毁事件
    created(){
        // 列表和滚动条选中状态的控制(4) - 最终激活
        this.setSelectAntiShake = antiShake(this.setSelect, 300);// 防抖
        this.$bus.$on('scrollBar', this.setSelectAntiShake);
    },
    destroyed(){
        this.$bus.$off('scrollBar', this.setSelectAntiShake);
    },



    methods: {
        handleSelect(item){
            // console.log(item);
            location.hash = item.anchor;
        },


        // 列表和滚动条选中状态的控制(3) - 滚动条位置判断
        setSelect(scrollDom){
            if (!scrollDom) {// 如果当前页面不存在了
                return;
            }
            this.activeAnchor = ''; 
            const range = 200;
            for(const dom of this.doms){
                if(!dom){
                    continue;
                }
                const top = dom.getBoundingClientRect().top;
                if (top >= 0 && top <= range) {
                    this.activeAnchor = dom.id;
                    return;
                }else if (top > range) {
                    return;
                }else{
                    this.activeAnchor = dom.id;
                }
            }
        }
    },



    computed: {
        // 列表和滚动条选中状态的控制(1) - 激活选择
        activation(){
            const getList = (Lists = []) => {
                return Lists.map(t => ({
                    ...t,
                    isSelect: t.anchor === this.activeAnchor,
                    children: getList(t.children)
                }));
            }
            return getList(this.Lists);
        },


        // 列表和滚动条选中状态的控制(2) - 提取id
        doms(){
            const doms = [];
            const addToDoms = Lists => {
                for(const t of Lists){
                    doms.push(document.getElementById(t.anchor));
                    if (t.children && t.children.length) {
                        addToDoms(t.children);
                    }
                }
            }
            addToDoms(this.Lists);
            return doms;
        }
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
        h2{
            font-weight: bold;
            letter-spacing: 2px;// 文字间距
            font-size: 1em;
            margin: 0;
        }
</style>