import loadingUrl from './loading.svg';
import styles from './loading.module.less';








// 在main文件注册全局方法

// 获取el的dom中是否有loading效果的img元素
function getLoadingImg(el){
    return el.querySelector("img[data-role=loading]");
}


// 创建loading
function createLoadingImg(){
    const img = document.createElement('img');
    img.dataset.role = 'loading';
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}


export default function(el, binding){// 数据来源v-Lading指令

    // 根据binding.value的值，决定创建或是删除loading元素
    const curImg = getLoadingImg(el);
    if (binding.value) { // value有值时
        if (!curImg) { // 如果没有img元素时
            const img = createLoadingImg();
            el.appendChild(img);
        }
    }else{
        if (curImg) { // 如果有img元素时
            curImg.remove();
        }
    }
}
