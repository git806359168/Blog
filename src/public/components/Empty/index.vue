<template>
    <div class="empty-container">
        <Icon type="empty" />
        <p>{{ text }}</p>
    </div>
</template>

<script>
import Icon from "../Icon";
export default {
    components: {
        Icon,
    },
    props: {
        text: {
            type: String,
            default: "无数据"
        }
    }
}
</script>

<style scoped lang="less">
    @import "~@/less/mixin.less";
    @import "~@/less/var.less";
    .empty-container {
        .self-center();
        color: @gray;
        text-align: center;
        font-size: 24px;
        line-height: 20px;
    }
    .iconfont {
        font-size: 72px;
    }
</style>
