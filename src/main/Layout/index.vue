<template>
    <div class="main-container">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

// 整个页面框架组件

<style scoped lang='less'>
    .main-container{
        width: 100%;
        height: 100%;
        display: flex;
        .middle{
            position: relative;
            overflow: hidden;
            flex: auto;
        }
        .right{
            overflow: hidden;
            flex: none;
        }
    }
</style>