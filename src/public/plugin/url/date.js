







export default function( timestamp, showTime = false ){ // showTime为默认值
    const date = new Date( +timestamp );
    const moneth = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
    const day = date.getDate().toString().padStart( 2, '0' );
    let str =  `${ date.getFullYear() }-${ moneth }-${ day }`;

    if ( showTime ) {// 如果为true时添加小时，false时只显示年份
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return str += `${hour}:${minute}:${second}`;
    }else{
        return str;
    }
}