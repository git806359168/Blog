<template>
    <ul class="list-container">
        <li
            v-for="(item, i) in list"
            :key="i">

            <!-- 分类名称 -->
            <span
                @click="handleClick(item)"
                :class="{ active: item.isSelect }">
                {{ item.name }}
            </span>
            
            <!-- 分类的数值 -->
            <span
                class="aside"
                v-if="item.aside"
                @click="handleClick(item)"
                :class="{ active: item.isSelect }">
                {{ item.aside }}
            </span>

            <SubList :list='item.children' @select="handleClick" />
            <!-- 父子组件递归生成新标签 -->
        </li>
    </ul>
</template>

// 该组件用于列表数据排列

<script>
export default {
    name: 'SubList', // 递归组件的默认名称
    props: {
        list: {
            type: Array,
            default: () => [] // 默认值
            /*
                数组里的对象参数：
                {
                    name:'xxx', // 名称
                    isSelect:true, // 选择状态
                    children:[{ name:'yyy', isSelect:false }] // 选中后的子项数据
                }
            */
        }
    },


    methods: {

        // 事件递归
        handleClick(item){
            if (!item.isSelect) { // 没有被选中时
                this.$emit('select', item);// 触发事件后向父组件抛出事件
            }
        }
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    .list-container{
        list-style: none;
        padding: 0;
        .list-container{ // 内层ul
            margin-left: 1em;
        }
        li{
            line-height: 36px;
            line-break: 40px;
            font-size: 14px;
            cursor: pointer;
            .active{
                color: @warn;
                font-weight: bold;
            }
        }
        .aside{
            font-size: 12px;
            margin-left: 20px;
            color: @gray;
        }
    }
    
</style>