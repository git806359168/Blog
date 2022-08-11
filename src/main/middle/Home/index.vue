<template>
    <div
        class="homepage-container"
        ref="container"
        @wheel='handleWheel'
        v-loading='loading'>



        <!-- 数据部分 -->
        <ul
            class="carousel-container"
            :style="{ marginTop }"
            @transitionend='animationEnd'>
            <li
                v-for="item in data"
                :key="item.id">
                <Carouselitem :carousel='item' />
            </li>
        </ul>
        <!-- :style={ 获取ul的总高度 }
             @transitioned='css过渡完成后发出反馈' -->



        <!-- 指示箭头部分 - 上 -->
        <div
            class="icon icon-up"
            v-show="index >= 1"
            @click="switchTo(index - 1)">
            <Icon type='arrowUp' />
        </div>

        <!-- 下 -->
        <div 
            class="icon icon-down"
            v-show="index < data.length -1"
            @click="switchTo(index + 1)">
            <Icon type='arrowDown' />
        </div>



        <!-- 指示点部分 -->
        <ul class="indicator">
            <li
                v-for="(item, i) in data"
                :key="i"
                :class="{ active: i === index }"
                @click="switchTo(i)">
            </li>
        </ul>



        <!-- <Loading v-if="isLoading" /> -->
    </div>
</template>

// 该组件为搭框架设定

<script>
import Carouselitem from './carouselitem';
import Icon from '@/public/components/Icon';
import { mapState } from 'vuex';
export default {
    components: {
        Carouselitem,
        Icon
    },
    data(){
        return {
            index: 0, // 当前显示的是第几张图
            containerHeight: 0, // dom尺寸
            switching: false, // 记录是否正在翻页
        }
    },



    created(){
        this.$store.dispatch('home/getHomes');// 触发仓库
    },



    // 创建事件 ~ 销毁事件
    mounted(){
        // 图片切换计算
        this.containerHeight = this.$refs.container.clientHeight;

        // 窗口自适应事件
        window.addEventListener('resize', this.handleResize);
        // 当改变浏览器大小时，重新获取宽高让页面适应新的尺寸
    },
    destroyed(){
        window.removeEventListener('resize', this.handleResize);
    },



    methods: {

        // 图片切换控制 - 箭头点击
        switchTo(i){
            this.index = i;
        },

        // 滚轮切换
        handleWheel(e){
            if (this.switching) {// 为true时
                return;
            }
            if (e.deltaY < 1 && this.index > 0) {// 事件小于1并且索引大于0
                this.index--;
                this.switching = true;
            }else if (e.deltaY > 1 && this.index < this.data.length -1) {
                this.index++;
                this.switching = true;
            }
        },
        // css过渡效果完成后执行这里
        animationEnd(){
            this.switching = false;
        },



        // 窗口自适应事件
        handleResize(){
            this.containerHeight = this.$refs.container.clientHeight;
        }
    },



    computed: {
        // 图片切换计算
        marginTop(){
            return -this.index * this.containerHeight + 'px';
        },

        ...mapState('home', ['loading', 'data'])// 仓库数据
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/mixin.less';
    @import '~@/less/var.less';
    @gap: 25px;
    @jump: 10px;
    .homepage-container{
        width: 100%;
        height: 100%;
        overflow: hidden; // 避免和子组件合并
        ul{
            margin: 0;
            padding: 0;
            list-style: none;
        }



        // 指示箭头部分
        .icon{
            .self-center();
            transform: translateX(-50%);
            &.icon-up{
                top: @gap;
                animation: jump-up 2s infinite;
            }
            &.icon-down{
                top: auto;
                bottom: @gap;
                animation: jump-down 2s infinite; // infinite表示重复
            }
            i{
                font-size: 30px;
                color: @gray;
                cursor: pointer;
            }

            // 跳跃动画 - 向上
            @keyframes jump-up{
                0% {
                    transform: translate(-50%, @jump);
                }
                50% {
                    transform: translate(-50%, -@jump);
                }
                100% {
                    transform: translate(-50%, @jump);
                }
            }
            // 向下
            @keyframes jump-down{
                0% {
                    transform: translate(-50%, -@jump);
                }
                50% {
                    transform: translate(-50%, @jump);
                }
                100% {
                    transform: translate(-50%, -@jump);
                }
            }
        }



        // 指示点部分
        .indicator{
            .self-center();
            transform: translateY(-50%);
            left: auto;
            right: @gap;
            li{
                width: 7px;
                height: 7px;
                background: @words;
                cursor: pointer;
                border-radius: 50%;
                border: 1px solid @white;
                box-sizing: border-box;
                margin: 30px 10px;
            }
            .active{
                background: @white;
            }
        }



        // 数据部分
        .carousel-container{
            width: 100%;
            height: 100%;
            transition: 500ms; // 500毫秒内完成动画
            li{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>