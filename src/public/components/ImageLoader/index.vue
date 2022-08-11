<template>
    <div class="image-loader-container">

        <!-- 占位图 -->
        <img
            class="placeholder"
            :src="placeholder"
            v-if="!everythingDone">
        <!-- 如果everythingDone为true时，隐藏img' -->


        <!-- 原图 -->
        <img
            @load="handleLoad"
            class="origin" 
            :src="src"
            :style="{ 
                opacity: originOpacity,
                transition: `${ duration }ms`
            }">
    </div>
</template>

// 图片懒加载组件

<script>
export default {
    props: {
        // 原图
        src: {
            type: String,
            required: true
        },

        // 占位图
        placeholder: {
            type: String,
            required: true
        },

        // 占位图切换到原图的时间
        duration: {
            type: Number,
            default: 500
        }
    },
    data(){
        return{
            originLoaded: false,// 原图的状态
            everythingDone: false// 占位图的状态
        }
    },
    computed: {
        originOpacity(){
            return this.originLoaded ? 1 : 0
            // 当原图的状态为false时，将img的opacity变为0。当原图的状态为true时，将img的opacity变为1。
        }
    },
    methods: {
        handleLoad(){
            this.originLoaded = true // 更改原图状态

            // 更改占位图状态
            setTimeout( ()=>{
                this.everythingDone = true;
                this.$emit('load');// 向App文件的load抛出状态
            }, this.duration);
        }
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/mixin.less';
    .image-loader-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    img{
        .self-fill();
    }
    .placeholder{
        filter: blur(2vw); // 虚化图片
    }
</style>