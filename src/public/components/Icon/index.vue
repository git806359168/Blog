<template>
  <i class="iconfont" :class="fontClass"></i>
</template>

// 小图标组件

<script>
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
};

export let types = Object.keys(classMap); // 具名导出key值
export default {
    props: {
        type: {
            type: String,
            required: true
        }
    },

    // 计算classMap所有属性
    computed: {
        fontClass(){
            return classMap[this.type];
        }
    }
}
</script>

<style scoped>
    @import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';
</style>