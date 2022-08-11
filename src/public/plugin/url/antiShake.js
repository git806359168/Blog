






// 防抖插件。为了避免多次触发事件，在触发事件后接下来的一段时间内禁止事件再次被调用。

export default function(fn, duration = 100){
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, duration);
    }
}

// clearTimeout：可取消由setTimeout方法设置的定时操作。
