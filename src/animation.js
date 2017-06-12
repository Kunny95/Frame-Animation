// 定义接口函数

'use strict';
var loadImage = require('./imageloader');

// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 停止状态
var STATE_STOP = 2;
// 异步任务
var TASK_SYNC = 0;
// 同步任务
var TASK_ASYNC = 1;

/**
 * [Anamation 帧动画类]
 */
function Anamation(){
    this.taskQueue = []; //任务链
    this.index = 0;
    this.state = STATE_INITIAL;

}

/**
 * [loadImage 添加一个同步任务，去预加载图片]
 * @param  {[type]} imglist [图片数组]
 */
Anamation.prototype.loadImage = function(imglist){
    var taskFn = function(next){
        loadImage(imglist.slice(),next);
    };
    var type = TASK_SYNC;
    return this._add(taskFn,type);

};

/**
 * [changePosition 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画]
 * @param  {[type]} ele      [dom对象]
 * @param  {[type]} position [背景位置数组]
 * @param  {[type]} imageUrl [图片地址]
 */
Anamation.prototype.changePosition = function(ele,position,imageUrl){

};

/**
 * [changeSrc 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画]
 * @param  {[type]} ele     [image标签]
 * @param  {[type]} imglist [图片数组]
 */
Anamation.prototype.changeSrc = function(ele,imglist){

};

/**
 * [enterFrame 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数]
 * @param  {[type]} taskFn [自定义每帧执行的任务函数]
 */
Anamation.prototype.enterFrame = function(taskFn){

};

/**
 * [then 添加一个同步任务，可以在上一个函数完成后执行函数任务]
 * @param  {[type]} callback [回调函数]
 */
Anamation.prototype.then = function(callback){

};

/**
 * [start 开始执行任务，异步定义任务执行的间隔]
 * @param  {[type]} interval [description]
 */
Anamation.prototype.start = function(interval){
    if(this.state === STATE_START){
        return this;
    }
    // 如果任务链中没有任务则返回
    if(!this.taskQueue.length){
        return this;
    }
    this.state = STATE_START;
    this.interval = interval;
    this._runTask();
    return this;
};

/**
 * [repeat 添加一个同步任务，该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果，可以定义重复的次数]
 * @param  {[type]} times [重复的次数]
 */
Anamation.prototype.repeat = function(times){

};

/**
 * [repeatForever 添加一个同步任务，相当于repeat（）更友好的接口，无限循环上一次任务]
 * @return {[type]} [description]
 */
Anamation.prototype.repeatForever = function(){

};

/**
 * [wait 设置当前任务执行完毕之后到下一个任务开始前的等待时间]
 * @param  {[type]} time [等待时间]
 */
Anamation.prototype.wait = function(time){

};

/**
 * [pause 暂停当前异步定时任务]
 */
Anamation.prototype.pause = function(){

};

/**
 * [restart 重新执行上一次暂停的异步任务]
 */
Anamation.prototype.restart = function(){

};

/**
 * [dispose 释放资源]
 */
Anamation.prototype.dispose = function(){

};

/**
 * [_add 添加一个任务队列中]
 * @param {[type]} taskFn [任务方法]
 * @param {[type]} type   [任务类型]
 */
Anamation.prototype._add = function(taskFn,type){
    this.taskQueue.push({
        taskFn:taskFn,
        type:type
    });
    return this;
};
//执行任务
Anamation.prototype._runTask = function(){
    // 任务链执行完毕
    if(!this.taskQueue || this.state.taskQueue.length){
        this.dispose();
        return;
    }
    // 获取当前任务
    var task = this.taskQueue[this.index];

};


