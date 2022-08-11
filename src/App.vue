<template>
    <div class="app-container">
        <Layout>
            <template #left>
                <SiteAside />
            </template>
            <template>
                <RouterView />
            </template>
        </Layout>
        <ScrollBar />
    </div>
</template>

<script>
import Layout from '@/main/Layout';
import SiteAside from '@/main/left/SiteAside';
import ScrollBar from '@/public/components/ScrollBar';
export default {
    components: {
        Layout,
        SiteAside,
        ScrollBar
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/mixin.less';
    .app-container{
        .self-fill(fixed); // 使用固定定位撑满浏览器页面
    }
</style>