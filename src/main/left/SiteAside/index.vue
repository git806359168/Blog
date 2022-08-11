<template>
    <div class="site-aside-container" dir="rtl">
    <!-- dir滚动条移到左侧 -->
        <div v-if='data'>
            <Avatar :url="data.avatar" />
            <h3 class="title">{{ data.siteTitle }}</h3>
        </div>
        <Menu />
        <Contact v-if='data' />
        <p class="footer" v-if='data'>{{ data.icp }}</p>
    </div>
</template>

// 左侧菜单组合组件(头像部分)

<script>
import Avatar from '@/public/components/Avatar';
import Menu from '../Menu';
import Contact from '../Contact';
import { mapState } from 'vuex';
export default {
    components: {
        Avatar,
        Menu,
        Contact
    },
    computed: {
        ...mapState('setting', ['data'])
    }
}
</script>

<style scpoed lang='less'>
    @import '~@/less/var.less';
    @texta: center;
    .site-aside-container{
        min-width: 250px;
        height: 100%;
        padding: 20px 0;
        background: @words;
        overflow-x: hidden;
        overflow-y: auto;
        text-align:left; // 有dir="rtl"时让文本以左排列
        box-sizing: border-box;
        .avatar-img{
            margin: 0 auto;
        }
        .title{
            text-align: @texta;
            color: @white;
        }
        .footer{
            text-align: @texta;
            font-size: 14px;
            color: @white;
        }
    }
</style>