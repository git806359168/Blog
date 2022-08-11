import getComponentRootDom from './getComponentRootDom';
import Icon from '@/public/components/Icon';
import styles from './index.module.less';






// 在mian文件注册全局方法
/*
    content   {string}      消息内容
    type      {string}      消息类型(info, error, success, warn)
    duration  {Number}      弹窗消失时间，0为不消失
    container {HTMLElement} 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
*/
export default function(options = {}){
    const content = options.content || '';
    const type = options.type || 'info';
    const duration = options.duration || '2000';
    const container = options.container || document.body;





    // 创建弹窗标签
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, { type });
    div.innerHTML = `<span class=" ${styles.icon} " > ${ iconDom.outerHTML } </span> <div> ${ content } </div>`;





    // 样式设置
    const background = styles[`popups-${ type }`];
    // 不同情况下的背景色，type为less模块化后的哈希名称

    div.className = `${ styles.popups } ${ background }`;





    // div放入容器中
    if (options.container) {
        if (getComputedStyle( container ).position !== undefined) {
            container.style.position = 'relative';
        }
    }
    container.appendChild(div);





    // 过渡效果
    div.clientHeight;// 首次强行渲染

    // 渲染后回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%)`;





    // 过渡效果
    setTimeout( () => {
        div.style.transform = `translate(-50%, -50%) translateY(-15px)`;
        div.style.opacity = 0;
        div.addEventListener(// 删除div标签
            'transitionend',
            function(){
                div.remove();
                options.callback && options.callback();// 当删除div后，如果有回调函数就运行回调函数，如果没有就创建回调等待触发
            },
            { once:true } // 事件只触发一次
        );
    }, duration)
}
