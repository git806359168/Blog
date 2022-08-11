<template>
    <div class="message-container" ref="messageContainer">
        <CommentArea
            title="留言板"
            :subTitle='`(${ data.total })`'
            :isListLoading='isLoading'
            :commentList='data.rows'
            @submit='handleSubmit' />
    </div>
</template>

<script>
import CommentArea from '@/public/components/CommentArea/index';
import { handleData } from '@/public/plugin';
import { getMessage, postMessage } from '@/api/requests/get/Message';
import { monitors } from '@/public/plugin';// 滚动条监听
export default {
    mixins: [
        handleData({ total: 0, rows: [] }),
        monitors('messageContainer')
    ],
    components: {
        CommentArea
    },
    data(){
        return {
            page: 1,
            limit: 10
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
        async handleData(){
            return await getMessage(this.page, this.limit);
        },


        // 提交评论
        async handleSubmit(data, callback){
            const resp = await postMessage(data);
            callback('感谢您的留言');// 留言后的回调弹窗
            this.data.rows.unshift(resp);
            this.data.total++;
        },


        // 加载剩余的评论 - 事件触发
        async handleScroll(dom){
            if (this.isLoading || !dom) {// 避免评论一次性全部加载
                return;
            }
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            if (dec <= 100) {
                this.surplus();
            }
        },


        // 加载剩余的评论 - 数据加载
        async surplus(){
            if (this.data.rows.length > this.data.total) {
                return; // 如果加载数据>总数据了
            }
            this.isLoading = true;
            this.page++;
            const resp = await this.handleData();
            this.data.rows = this.data.rows.concat(resp.rows);
            this.isLoading = false;
            // console.log(this.data.rows.length);
        }
    }
}
</script>

<style scoped lang='less'>
    .message-container{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 25px 0;
        box-sizing: border-box;
        scroll-behavior: smooth;// 平滑滚动
        .commentarea-container{
            width: 700px;
            margin: 0 auto;
        }
    }
</style>