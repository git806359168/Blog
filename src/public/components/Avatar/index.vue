<template>
    <img
        class="avatar-img"
        :src="url" 
        :style="{
            width: size + 'px',
            height: size + 'px'
        }"
    >
</template>

// 头像属性组件

<script>
export default {
    props: {
        url: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 150
        }
    }
}
</script>

<style scoped> 
    .avatar-img{
        border: 1px solid #000;
        border-radius: 50%;
        object-fit: cover; /* 图片适应img的宽高：保持原有比例部分被剪切 */
        display: block;
    }
</style>