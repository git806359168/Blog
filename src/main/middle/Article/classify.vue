<template>
    <div class="article-classify-container" v-loading='isLoading'>
        <h2>文章分类</h2>
        <List :list='classifyData' @select="handleSelect" />
    </div>
</template>

// 文章分类页

<script>
import List from '@/public/components/List';
import { handleData } from '@/public/plugin';
import { getArticleClassify } from '@/api/requests/get/Article';
export default {
    mixins: [ handleData([]) ],
    components: {
        List
    },



    methods: {
        // 获取服务器数据
        async handleData(){
            return await getArticleClassify();
        },


        // 通过路由分类跳转总页面
        handleSelect(item){
            const query = {// 跳转分类数据(1)
                page: 1,
                limit: this.limit// 当前页多少条数据
            }
            if (item.id === -1) {// 如果没有进行分类
                this.$router.push({
                    name: 'Article',
                    query
                })
            }else{
                this.$router.push({
                    name: 'ArticleClassify',
                    query,
                    params: { // 给地址栏添加分类地址
                        classifyId: item.id
                    }
                })
            }
        }
    },



    computed: {
        // 通过路由信息获取分类id
        classifyId(){
            return +this.$route.params.classifyId || -1;
        },


        // 获取分类列表的所有数据
        classifyData(){
            const classCount = this.data.reduce((a, b) => a + b.articleCount, 0);
            const result = [
                {
                    name: '全部',
                    id: -1,
                    articleCount: classCount
                },
                ...this.data
            ];
            return result.map( it => ({
                ...it,
                isSelect: it.id === this.classifyId,
                aside: `${it.articleCount}篇`
            }))
        },


        // 跳转分类数据(2)
        limit(){
            return +this.$route.query.limit || 10;
        }
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    .article-classify-container{
        width: 200px;
        height: 100%;
        padding: 20px;
        position: relative;
        box-sizing: border-box;
        overflow-y: auto;
        h2{
            font-weight: bold;
            letter-spacing: 2px;
            font-size: 1em;
            margin: 0;
        }
    }
</style>