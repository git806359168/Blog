<template>
    <div
        class="carouselitem-container"
        ref="container"
        @mousemove="mouseMove"
        @mouseleave="mouseLeave">

        <!-- 图片 -->
        <div
            class="carousel-img"
            :style="imagePosition"
            ref="iamge">
            <ImageLoader
                :src="carousel.bigImg"
                :placeholder='carousel.midImg'
                @load="showWords" />
        </div>

        <!-- 标题 -->
        <div 
            class="title"
            ref="title">
            {{ carousel.title }}
        </div>

        <!-- 描述 -->
        <div
            class="desc"
            ref="desc">
            {{ carousel.description }}
        </div>
    </div>
</template>

// 该组件为图片特效设定

<script>
import ImageLoader from '@/public/components/ImageLoader';
export default {
    components: {
        ImageLoader
    },
    props: ['carousel'],

    data(){
        return {
            titleWidth: 0,// 大标题宽度
            descWidth: 0,// 小标题宽度
            containerSize: null,// 框架容器尺寸
            innerSize: null,// 图片容器尺寸
            mouseX: 0,// 鼠标横坐标
            mouseY: 0,// 鼠标纵坐标
        }
    },



    mounted(){
        // 文字动态显示
        this.titleWidth = this.$refs.title.clientWidth;
        this.descWidth = this.$refs.desc.clientWidth;



        // 图片动态效果 - window触发setSize方法
        this.setSize();
        // 图片动态效果 - 鼠标中心点触发(图片也会居中)
        this.mouseX = this.center.x;
        this.mouseY = this.center.y;
        window.addEventListener('resize', this.setSize);
    },


    destroyed(){
        window.removeEventListener('resize', this.setSize);// 删除触发条件
    },

    // 普通方法
    methods: {
        
        // 文字动态显示
        showWords(){
            // 大标题
            this.$refs.title.style.opacity = 1;// 透明度
            this.$refs.title.style.width = 0;// 隐藏文字
            this.$refs.title.clientWidth;// 首次强制渲染
            this.$refs.title.style.transition = '2s';
            this.$refs.title.style.width = this.titleWidth + 'px';

            // 小标题
            this.$refs.desc.style.opacity = 1;
            this.$refs.desc.style.width = 0;
            this.$refs.desc.clientWidth;
            this.$refs.desc.style.transition = '3s 1.5s'; // 1.5s表示延迟
            this.$refs.desc.style.width = this.descWidth + 'px';
        },



        // 图片动态效果 - 实时获取最新尺寸数据
        setSize(){
            this.containerSize = {
                width: this.$refs.container.clientWidth,
                height: this.$refs.container.clientHeight
            };
            this.innerSize = {
                width: this.$refs.iamge.clientWidth,
                height: this.$refs.iamge.clientHeight
            }
        },



        // 图片动态效果 - 鼠标坐标获取
        mouseMove(e){
            const rect = this.$refs.container.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        },



        // 图片动态效果 - 鼠标移出后图片还原位置
        mouseLeave(){
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
        }
    },



    // 计算方法
    computed: {

        // 图片动态效果 - 移动计算
        imagePosition(){

            // 计算图片多出的尺寸(多余部分 = 图片尺寸 - 框架尺寸)
            if (!this.innerSize || !this.containerSize) {// 图片或框架的尺寸没有数据时
                return;
            }
            const extraWidth = this.innerSize.width - this.containerSize.width;
            const extraHeight = this.innerSize.height - this.containerSize.height;

            // 图片移动计算(多余部分 / 框架尺寸 * 鼠标坐标)
            const left = -extraWidth / this.containerSize.width * this.mouseX;
            const top = -extraHeight / this.containerSize.height * this.mouseY;
            return {
                transform: `translate( ${left}px, ${top}px )`
            }
        },



        // 图片动态效果 - 鼠标中心点触发
        center(){
            return{
                x: this.containerSize.width / 2,
                y: this.containerSize.height / 2
            }
        }
    }
}
</script>

<style lang='less' scoped>
    @import '~@/less/var.less';
    .carouselitem-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .carousel-img{
            width: 110%;
            height: 110%;
            left: 0;
            top: 0;
            transition: 0.3s;
        }
        .title, .desc{
            position: absolute;
            left: 60px;
            color: #fff;
            letter-spacing: 3px;
            white-space: nowrap;// 空白处被浏览器忽略
            overflow: hidden;
            opacity: 0;

            // 字体描边
            text-shadow: 1px 0 0 rgb(0, 0, 0.5), -1px 0 0 rgb(0, 0, 0.5), 0 1px 0 rgb(0, 0, 0.5), 0 -1px 0 rgb(0, 0, 0.5)// 左右下上(横向，纵向，扩散，颜色)
        }
        .title{
            top: calc(80% - 40px);
            font-size: 2em;
        }
        .desc{
            top: calc(80% + 20px);
            font-size: 1.2em;
            color: lighten(@lightWords, 20%); // 减轻颜色
        }
    }
</style>