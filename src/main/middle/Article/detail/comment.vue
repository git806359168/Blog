<template>
    <div class="comment-container">
        <CommentArea
            title="评论列表"
            :subTitle='`(${ data.total })`'
            :commentList='data.rows'
            :isListLoading='isLoading'
            @submit='handleSubmit' />
    </div>
</template>

<script>
import CommentArea from '@/public/components/CommentArea/index';
import { handleData } from '@/public/plugin';
import { getComments, submitComment } from "@/api/requests/get/Article";
export default {
    mixins: [ handleData({ total: 0, rows: [] }) ],
    components: {
        CommentArea
    },
    data(){
        return {
            page: 1,
            limit: 10 // 视口可见的数据量
        }
    },

    // 监听抛出事件 ~ 销毁监听
    created(){
        this.$bus.$on('scrollBar', this.handleScroll);
    },
    destroyed(){
        this.$bus.$off('scrollBar', this.handleScroll);
    },



    methods: {
        // 获取服务器数据
        async handleData(){
            return await getComments( 
                this.$route.params.id,
                this.page,
                this.limit
            );
        },


        // 提交评论
        async handleSubmit(formData, callback){
            const resp = await submitComment({
                articleId: this.$route.params.id,
                ...formData
            })
            this.data.rows.unshift(resp);
            this.data.total++;
            callback('评论成功');// 告诉子组件这里处理完成
        },


        // 加载剩余的评论(1) - 数据加载
        async surplus(){
            if (this.data.rows.length > this.data.total) {
                return; // 如果加载数据>总数据了
            }
            this.isLoading = true;
            this.page++;
            const resp = await this.handleData();
            this.data.rows = this.data.rows.concat(resp.rows);
            this.isLoading = false;
        },
        // 加载剩余的评论(2) - 事件触发
        async handleScroll(dom){
            if (this.isLoading || !dom) {
                return;
            }
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);// 2
            if (dec <= 100) {// 3
                this.surplus();
            }
        }
    }
}
</script>

<style scoped lang='less'>
    .comment-container{
        margin: 30px 0;
    }
</style>