<template>
    <div
        class="project-container"
        ref='project-container'
        v-loading='loading'>
        <a
            class="project-item"
            v-for="item in data"
            :key="item.id"
            :href="item.url ? item.url:`javascript:alert('该项目无法通过外网访问')`"
            :target="item.url ? '_blank' : '_self'">

            <img class="thumb" :src="item.thumb" v-lazy='item.thumb'>
            <div class="info">
                <h2>
                    {{ item.name }}
                    <a
                        class="github"
                        :href="item.github"
                        v-if="item.github"
                        target="_blank">
                        github
                    </a>
                </h2>
                <p v-for="(desc, i) in item.description" :key="i">
                    {{ desc }}
                </p>
            </div>
        </a>

        <!-- 无数据时展示的组件 -->
        <Empty v-if="data === undefined && !isLoading" />
    </div>
</template>

<script>
import { monitors } from '@/public/plugin';
import { mapState } from 'vuex';
import Empty from '@/public/components/Empty';// 无数据显示
export default {
    mixins: [monitors('project-container')],// 滚动条回顶
    components: {
        Empty
    },

    created(){
        this.$store.dispatch('project/getProjects');
    },

    computed: {
        ...mapState('project', ['loading', 'data'])
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    .project-container{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        overflow: auto;
        scroll-behavior: smooth;// 平滑滚动
        .project-item{
            transition: 0.5s;
            padding: 20px;
            display: flex;
            margin-bottom: 20px;
            &:hover{
                box-shadow: -1px 1px 5px #000;
                transform: scale(1.01) translate(3px, -3px);
                color: inherit;
            }
            .thumb{
                width: 250px;
                min-height: 150px;
                flex: 0 0 auto;
                object-fit: cover;
                border-radius: 5px;
                margin-right: 15px;
            }
            .info{
                line-height: 1.7;
                flex: 1 1 auto;
                h2{
                    margin: 0;
                    .github{
                        font-size: 14px;
                        color: @primary;
                    }
                }
            }
        }
    }
</style>