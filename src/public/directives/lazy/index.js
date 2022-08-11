import eventBus from '@/public/eventBus';
import { antiShake } from '@/public/plugin';
import imgLoad from '@/assets/imgLoad.gif';







// 事件总线监听滚动条，使用匿名函数调用setImages方法
eventBus.$on('scrollBar', antiShake(getImages, 50));// [1]



let imgs = [];

function getImages(){ // 得到所有图片
    for(const img of imgs){
        img.dom.src = imgLoad;// 在触发事件前先加载imgLoad图片
        setImages(img);
    }
};



function setImages(img){// 加载原图
    const rect = img.dom.getBoundingClientRect();
    const imgHeight = rect.height || 150;
    const clientHeight = document.documentElement.clientHeight;
    if (rect.top >= -imgHeight && rect.top <= clientHeight) {// 在适口范围内
        img.dom.src = img.src;// 原图插入dom
        imgs = imgs.filter((i) => i !== img);
    }
};


export default {
    inserted(el, binding){// 数据来源v-lazy指令
        const imgx = {
            dom: el,
            src: binding.value
        }
        imgs.push(imgx)
        getImages(imgx);// 立即执行该方法
    },
    unbind(el){
        imgs = imgs.filter((img) => img.dom !== el);// 清空过去数据
    }
}
