<template>
    <div>
        <h1>{{ detail.title }}</h1>
        <div class="aside">
            <span>日期：{{ date( detail.createDate ) }}</span>
            <span>浏览量：{{ detail.scanNumber }}</span>
            <a href="#form-container">评论：{{ detail.commentNumber }}</a>
            <RouterLink :to="{
                name: 'ArticleClassify',
                params: {
                    classifyId: detail.classify.id
                }
            }">
                {{ detail.classify.name }}
            </RouterLink>
        </div>
        <div v-html="detail.htmlContent" class="markdown-body"></div>
    </div>
</template>

// 详情页文章展示部分

<script>
import { date } from '@/public/plugin';// 时间戳
import '@/less/markdown.css';// markdown-body的文件
import "highlight.js/styles/github.css";// 页面上的代码色调
export default {
    props: {
        detail: {// 数据来源index
            type: Object,
            required: true
        }
    },

    methods: {
        date
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    .aside{
        font-size: 12px;
        color: @gray;
        span{
            margin-right: 15px;
        }
        a{
            margin-right: 15px;
        }
    }
    .markdown-body{
        margin: 2em 0;
    }
</style>