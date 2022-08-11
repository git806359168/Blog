







// 处理服务器数据和loading设定
export default function( defaultDataValue = null ){ // 默认值为空对象
    return{
        data(){
            return {
                data: defaultDataValue, // 存放服务器数据
                isLoading: true // loading状态
            }
        },

        // 钩子函数(注入过后)
        async created(){
            this.data = await this.handleData(); // 服务器的数据由这里传入
            this.isLoading = false; // 数据加载完成后删除loading
        }
    }
}