<template>
    <Layout>
        <!-- 中间 -->
        <div
            ref='container'
            class="detail-index-container"
            v-loading='isLoading'>
            <Detail :detail='data' v-if="data" />

            <!-- 评论区 -->
            <Comment v-if='!isLoading' />
        </div>

        <!--列表 #right关联到Layout组件的right类 -->
        <template #right>
            <div
                class="detail-lists-container"
                v-loading='isLoading'>
                <DetailLists
                    :Lists='data.toc'
                    v-if="data" />
            </div>
        </template>
    </Layout>
</template>

// 详情页总组件

<script>
import { handleData } from '@/public/plugin';// 数据处理
import { monitors } from '@/public/plugin';// 滚动条监听
import { getArticleDetail } from '@/api/requests/get/Article';
import { browserTitle } from '@/public/plugin';// 浏览器导航条名称
import Layout from '@/main/Layout';
import Detail from './main';
import DetailLists from './lists';
import Comment from './comment';
export default {
    mixins: [ handleData(null), monitors('container') ],
    components: {
        Layout,
        Detail,
        Comment,
        DetailLists
    },



    updated(){
        // 滚动条触发事件系列 - 刷新地址栏
        const hash = location.hash;
        location.hash = '';
        setTimeout(() => {
            location.hash = hash;
        }, 50)
    },



    methods: {
        async handleData(){
            const resp = await getArticleDetail(this.$route.params.id);

            // 如果数据为空就显示404页面
            if (!resp) {
                this.$router.push('/404');
                return;
            }

            browserTitle.setRouteTitle(resp.title);// 浏览器导航栏添加标题
            return resp;
        }
    }
}
</script>

<style scoped lang='less'>
    .detail-index-container, .detail-lists-container{
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding: 20px;
        overflow-y: scroll;
    }
    .detail-index-container{
        width: 100%;
        overflow-x: hidden;
        scroll-behavior: smooth;// 平滑滚动
    }
    .detail-lists-container{
        width: 200px;
    }
</style>