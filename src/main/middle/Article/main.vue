<template>
    <div
        class="article-main-container"
        ref="container"
        v-loading='isLoading'>
        <ul>
            <li
                v-for="item in data.rows"
                :key="item.id">



                <!-- 标题头像 -->
                <div
                    class="thumb"
                    v-if="item.thumb">
                    <RouterLink :to="{
                        name: 'ArticleDetail',
                        params: {
                            id: item.id
                        }
                    }">
                        <img 
                            v-lazy="item.thumb"
                            :alt="item.title"
                            :title="item.title">
                    </RouterLink>
                    <!-- v-lazy指令可获取img的dom和src -->
                </div>



                <!-- 标题 -->
                <div class="title">
                    <RouterLink :to="{
                        name: 'ArticleDetail',
                        params: {
                            id: item.id
                        }
                    }">
                        <h2>{{ item.title }}</h2>
                    </RouterLink>

                    <!-- 标题下的相关信息 -->
                    <div class="aside">
                        <span>日期：{{ date(item.createDate) }}</span>
                        <span>浏览量：{{ item.scanNumber }}</span>
                        <span>评论：{{ item.commentNumber }}</span>
                        <RouterLink :to='{
                            name: "ArticleClassify",
                            params: {
                                classifyId: item.classify.id
                            }
                        }'>
                            {{ item.classify.name }}
                        </RouterLink>
                    </div>



                    <!-- 简介 -->
                    <div class="desc">
                        {{ item.description }}
                    </div>
                </div>
            </li>
        </ul>

        <!-- 无数据时展示的组件 -->
        <Empty v-if="data.rows.length === 0 && !isLoading" />


        <!-- 下一页切换部分 -->
        <Pager
            v-if="data.total"
            :total='data.total'
            :current='routeInfo.page'
            :limit='routeInfo.limit'
            :visibleNumber='9'
            @pageChange='pageJump' />
    </div>
</template>

// 文章目录页

<script>
import Pager from '@/public/components/Pager';
import { getArticle } from '@/api/requests/get/Article';
import { handleData } from '@/public/plugin';
import { monitors } from '@/public/plugin';
import { date } from '@/public/plugin';// 时间戳
import Empty from '@/public/components/Empty';// 无数据显示
export default {
    mixins: [ handleData({ total: 0, rows: [] }), monitors('container') ],
    components: {
        Pager,
        Empty
    },



    methods: {
        async handleData(){
            return await getArticle(

                // 根据路由信息配对获取到的数据
                this.routeInfo.page,
                this.routeInfo.limit,
                this.routeInfo.classifyId
            );
        },
        
        date,// 发布时间

        // 通过路由下一页跳转
        pageJump(newPage){
            // console.log(newPage);
            const query = {
                page: newPage,
                limit: this.routeInfo.limit
            }
            if (this.routeInfo.classifyId === -1) { // 如果没有分类
                this.$router.push({
                    name: 'Article',
                    query
                })
            }else{
                this.$router.push({
                    name: 'ArticleClassify',
                    query,
                    params: {
                        classifyId: this.routeInfo.classifyId
                    }
                })
            }
        }
    },



    computed: {
        // 获取路由(地址栏)信息
        routeInfo(){
            const classifyId = +this.$route.params.classifyId || -1;
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return {
                classifyId,
                page,
                limit
            }
        }
    },



    // 监控路由信息
    watch: {
        async $route(){
            this.isLoading = true;
            this.$refs.container.scrollTop = 0;
            this.data = await this.handleData();
            this.isLoading = false;
            // 路由信息变化后将页面滚动条划到顶部，然后重新调用新的数据进行渲染。
        }
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    .article-main-container{
        width: 100%;
        height: 100%;
        line-height: 1.7;
        position: relative;
        padding: 20px;
        overflow-y: scroll;
        box-sizing: border-box;
        scroll-behavior: smooth;// 平滑滚动条
        ul{
            list-style: none;
            margin: 0;
            padding: 0;
            li{
                display: flex;
                padding: 15px 0;
                border-bottom: 1px solid @gray;// 分割线
                .thumb{
                    flex: 0 0 auto;
                    margin-right: 15px;
                    img{
                        display: block;
                        max-width: 200px;
                        border-radius: 5px;
                        border: 1px solid @gray;
                    }
                }
                .title{
                    flex: 1 1 auto;
                    h2{
                        margin: 0;
                    }
                }
                .aside{
                    font-size: 12px;
                    color: @gray;
                    span{
                        margin-right: 15px;
                    }
                }
                .desc{
                    margin: 15px 0;
                    font-size: 15px;
                }
            }
        }
    }
</style>