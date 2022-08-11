<template>
    <div class="about-container" v-loading="loading || !srcLoading" >
        <iframe
            class="iframe-container"
            :src="src"
            frameborder='0'
            v-if="src"
            @load="srcLoading = true">
        </iframe>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            srcLoading: false
        }
    },


    created(){
        this.$store.dispatch('about/getAbouts');// 生成dom时触发提取数据函数
    },


    computed: {
        ...mapState('about', {
            src: 'data',
            loading: 'loading'
        })
    }
}
</script>

<style scoped lang='less'>
    .about-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .iframe-container{
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }
</style>
