'use strict';
/**
 * [loadImage 预加载图片]
 * @param  {[type]}   images   [加载图数组或对象]
 * @param  {Function} callback [全部图片加载完成后调用的函数]
 * @param  {[type]}   timeout  [加载超时的时长]
 */
function loadImage(images, callback, timeout) {
    //加载完成图片的计数器
    var count = 0;
    //全部加载成功后的一个标志
    var success = true;
    //超时的timer的id
    var timerId = 0;
    //是否加载超时的标志位
    var isTimeout = false;
    //对图片数组（或对象）进行遍历
    for (var key in images) {
        //过滤prototype上的属性
        if (!images.hasOwnProperty(key)) {
            continue;
        }
        //获得每个图片元素
        //期望格式是个object：{src:xxx}
        var item = images[key];

        if (type item === 'string') {
            item = images[key] = {
                src: item
            };
        }
        //如果格式不满足则退出，进行下一次遍历
        if (!item || !item.src) {
            continue;
        }
        count++;
        // 设置图片的ID
        item.id = '_img_' + key + getId();
        // 设置图片元素的img，是一个Image对象
        item.img = window[item.id] = new Image();

        doLoad(item);
    }
    // 遍历完成如果计数为0，则直接调用回调函数callback
    if (!count) {
        callback(success);
    } else if (timeout) {
        timeoutId = setTimeout(onTimeout, timout);
    }

    /**
     * [doLoad 进行图片加载的函数]
     * @param  {[type]} item [图片元素对象]
     */
    function doLoad(item) {
        item.status = 'loading';
        var img = item.img;
        // 定义图片加载成功的一个回调行数
        img.onload = function () {
            success = success & true;
            item.status = 'loading';
            done();
        };
        // 定义图片加载失败的一个回调行数
        img.onerror = function () {
            success = false;
            item.status = 'error';
            done();
        };
        // 发起一个http(s)的请求
        img.src = item.src;
        /**
         * [done 每张图片加载完成的回调函数]
         */
        function done() {
            // 解除绑定
            img.onload = img.onerror = null;
            try {
                delete window[item.id];
            } catch (e) {

            }
            // 每张图片加载完成计数器减1，
            // 所有图片加载完成没有超时的时候清除计时器，执行回调函数
            if (!--count && !isTimeout) {
                clearTimeout(timeoutId);
                callback(success);
            }
        }
    }
    // 超时函数
    function onTimeout() {
        isTimeout = true;
        callback(false);
    }
}

var _id = 0;
function getId() {
    return ++_id;
}
//将模块暴露到外面
module.exports = loaderImage;