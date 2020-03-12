/*
* 文件名:handleErrors.js
* 功能:解决编译sass时语法出错导致的gulp监听停止问题
* 引用方式:
* author:lechar
* Date: 2020-03-12
*/
var notify = require('gulp-notify');
module.exports = function(){
 
    var args = Array.prototype.slice.call(arguments);
 
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象
 
    this.emit();//提交
}