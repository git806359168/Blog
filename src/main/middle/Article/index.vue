<template>
    <Layout>
        <Article />
        <template #right>
            <ArticleClassify />
        </template>
    </Layout>
</template>

// 文章页的目录和分类组合组件

<script>
import Layout from '@/main/Layout';
import Article from './main';
import ArticleClassify from './classify';
export default {
    components: {
        Layout,
        Article,
        ArticleClassify
    },
    created(){
        // console.log(this.$route);// 路由所有信息
    }
}
</script>