<template>
    <div class="commentarea-container">
        <Form v-on="$listeners" />
        <!-- $listeners"表示将from组件的$emit事件原封不动的往上级抛出 -->
        <h3>
            {{ title }}
            <span>{{ subTitle }}</span>
        </h3>
        <List :list='commentList' />
        <div class="loading" v-loading='isListLoading'></div>
    </div>
</template>

<script>
import Form from './Form';
import List from './List';
export default {
    components: {
        Form,
        List
    },
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 内容
        subTitle: {
            type: String,
            default: ''
        },
        // 评论列表
        commentList: {
            type: Array,
            default: () => []
        },
        // 是否显示列表加载
        isListLoading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang='less'>
    .loading{
        position: relative;
        height: 100%;
    }
</style>