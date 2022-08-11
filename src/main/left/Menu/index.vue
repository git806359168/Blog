<template>
    <nav
        class="menu-container"
        dir="ltr"><!-- dir将文本以左排列 -->
        <RouterLink
            v-for="item in items"
            :key="item.link"
            :to="{ name: item.name }"
            :exact='item.exact'
            active-class="selectd"
            exact-active-class="">



            <div class="icon">
                <Icon :type='item.icon' />
                <span>{{ item.title }}</span>
            </div>
        </RouterLink>
    </nav>
</template>

// 一级菜单组件

<script>
import Icon from '@/public/components/Icon'
export default {
    components: {
        Icon
    },
    data(){
        return{
            items: [
                {
                    name: 'Home',
                    title: '首页',
                    icon: 'home',
                    exact: true
                },
                {
                    name: 'Article',
                    title: '文章',
                    icon: 'blog',
                    exact: false // 激活状态是否要精确匹配
                },
                {
                    name: 'Message',
                    title: '留言板',
                    icon: 'chat',
                    exact: true
                },
                {
                    name: 'Project',
                    title: '项目&效果',
                    icon: 'code',
                    exact: true
                },
                {
                    name: 'About',
                    title: '关于我',
                    icon: 'about',
                    exact: true
                },
            ]
        }
    }
}
</script>

<style scpoed lang='less'>
    @import '~@/less/var.less';
    .menu-container{
        color: @gray;
        margin: 24px 0;
        a{
            height: 45px;
            cursor: pointer;
            padding: 0 50px;
            display: flex;
            align-items: center;
            .icon{
                .iconfont{
                    margin: 0 10px;
                }
            }
            &:hover{
                color: @white;
            }
            &.selectd{
                background: darken(@words, 8%);
            }
        }
    }
</style>