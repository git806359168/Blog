






// 单文件插件地址引入文件，下列引入方式表示该插件的默认导出以xxx名称在index文件导出。

// 日期
export { default as date } from './url/date';

// 混入：(数据处理，滚动条监听)
export { default as handleData } from './mixins/handleData';
export { default as monitors } from './mixins/monitors';

// 防抖
export { default as antiShake } from './url/antiShake';

// 设置浏览器导航条的标题名称
export { default as browserTitle } from './url/browserTitle';
