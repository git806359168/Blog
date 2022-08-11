<template>
    <ul class="contact-container">
        <li>
            <a :href="data.github">
                <div class="icon">
                    <Icon type="github" />
                    <span>{{ data.githubName }}</span>
                </div>
            </a>
        </li>
        <li>
            <a :href="`mailto:${data.mail}`">
                <div class="icon">
                    <Icon type="mail" />
                    <span>{{ data.mail }}</span>
                </div>
            </a>
        </li>
        <li>
            <a>
                <div class="icon">
                    <Icon type="qq" />
                    <span>{{ data.qq }}</span>
                </div>
            </a>
            <div class="pop">
                <p/>
            </div>
        </li>
        <li>
            <a>
                <div class="icon">
                    <Icon type="weixin" />
                    <span>{{ data.weixin }}</span>
                </div>
            </a>
            <div class="pop">
                <p/>
            </div>
        </li>
    </ul>
</template>

// 二级菜单组件

<script>
import Icon from '@/public/components/Icon';
import { mapState } from 'vuex';
export default {
    components: {
        Icon
    },
    computed: {
        ...mapState('setting', ['data'])// 提取仓库数据
    }
}
</script>

<style scoped lang='less'>
    @import '~@/less/var.less';
    @height: 30px;
    .contact-container{
        list-style: none;
        padding: 20px;
        margin: 0;
        li{
            height: @height;
            line-height: @height;
            margin: 14px 0;
            position: relative;
            a{
                height: 100%;
                display: inline-block;
                cursor: pointer;
                color: @lightWords;
                .icon {
                    height: 100%;
                    .iconfont{
                        margin: 0 10px;
                        font-size: 26px;
                    }
                    span{
                        vertical-align: top;
                    }
                }
            }
            .pop{
                width: 110px;
                height: 110px;
                position: absolute;
                display: flex;
                left: 10px;
                bottom: @height + 5;
                padding: 10px;
                background: @white;
                border-radius: 5px;
                transform: scaleY(0);
                transform-origin: center bottom;
                transition: 0.3s;
                p{
                    width: 100%;
                    height: 100%;
                    align-self: center;// 基于父元素flex纵向居中
                    background-image: url('@/assets/qr-code.png');
                    background-position: center;
                    background-size: 100%;
                }
                &::after{
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg); // rotate旋转元素45度
                    width: 8px;
                    height: 8px;
                    background: @white;
                    bottom: -4px;
                }
            }
            &:hover{
                .pop{
                    transform: scaleY(1);
                }
            }
        }
    }
</style>