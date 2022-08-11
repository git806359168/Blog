<template>
    <form
        id="form-container"
        ref="form"
        @submit.prevent="handleSubmit"
        class="form-container">
        <!-- prevent阻止表单回车提交的默认行为 -->

        <!-- 标题 -->
        <div class="form-item">
            <div class="input-area">
                <input
                    type="text"
                    maxlength="10"
                    v-model="formData.nickname"
                    placeholder="用户昵称"/>
                <span class="tip">{{ formData.nickname.length }}/10</span>
            </div>
            <div class="error">{{ error.nickname }}</div>
        </div>
        <!-- formData.nickname.length的数据被maxlength固定了 -->

        <!-- 内容 -->
        <div class="form-item">
            <div class="text-area">
                <textarea
                    maxlength="300"
                    placeholder="输入内容"
                    v-model="formData.content">
                </textarea>
                <span class="tip">{{ formData.content.length }}/300</span>
            </div>
            <div class="error">{{ error.content }}</div>
        </div>

        <!-- 提交 -->
        <div class="form-item">
            <div class="button-area">
                <button :disabled="isSubmiting">
                    {{ isSubmiting ? "提交中..." : "提交" }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            // 表单信息
            formData: {
                nickname: "",
                content: ""
            },

            // 错误消息
            error: {
                nickname: "",
                content: ""
            },

            // 是否正在提交数据
            isSubmiting: false,
        }
    },
    methods: {
        handleSubmit() {
            this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
            this.error.content = this.formData.content ? "" : "请填写内容";

            if (this.error.nickname || this.error.content) {// 有错误
                return;
            }
            this.isSubmiting = true; // 正在提交，防止重复点击

            // 向上级抛出事件让父组件来处理抛出的数据
            this.$emit(
                "submit",
                this.formData,
                (successMsg) => { // 父组件抛过来的回调
                    // 提交后的弹窗
                    this.$popup({
                        content: successMsg,
                        type: 'success',
                        duration: 1000,
                        container: this.$refs.form,
                        callback: () => {// 弹窗结束后清空表单
                            this.isSubmiting = false;
                            this.formData.nickname = "";
                            this.formData.content = "";
                        }
                    })
                }
            )
        }
    }
}
</script>

<style scoped lang="less">
    @import "~@/less/var.less";
    .form-container {
        margin-bottom: 20px;
        overflow: hidden;
        .form-item {
            margin-bottom: 8px;
            .input-area {
                width: 50%;
                position: relative;
                input {
                    padding: 0 15px;
                    height: 40px;
                }
            }
            .text-area {
                position: relative;
                textarea {
                    resize: none;
                    padding: 8px 15px;
                    height: 120px;
                }
            }
            input, textarea {
                display: block;
                width: 100%;
                box-sizing: border-box;
                border: 1px dashed @gray;
                outline: none;
                color: @words;
                font-size: 14px;
                border-radius: 4px;
                &:focus {
                    border-color: @primary;
                }
            }
            .tip {
                position: absolute;
                right: 5px;
                bottom: 5px;
                color: #b4b8bc;
                font-size: 12px;
            }
            .error {
                margin-top: 6px;
                color: @danger;
                font-size: 14px;
                height: 20px;
                line-height: 20px;
            }
            button {
                position: relative;
                cursor: pointer;
                border: none;
                outline: none;
                width: 100px;
                height: 34px;
                color: #fff;
                border-radius: 4px;
                background: @primary;
                &:hover {
                    background: darken(@primary, 10%);
                }
                &:disabled {
                    background: lighten(@primary, 20%);
                    cursor: not-allowed;
                }
            }
        }
    }
</style>
