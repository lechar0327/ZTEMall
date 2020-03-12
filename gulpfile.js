/*
* 文件名:gulpfile.js
* 功能:  gulp主工作区,自动编译打包
* 引用方式:nodejs控制台命令
* author:lechar
* Date:  2020-03-12
*/

//引入gulp插件
const gulp = require("gulp");
//引入编译sass插件
const scss = require("gulp-sass");
//解决编译sass时语法出错导致的gulp监听停止问题
var handleErrors = require('./handleErrors');
//压缩css插件
const minifyCss = require("gulp-minify-css");
//重命名插件
const rename = require("gulp-rename");
//压缩js插件
const uglify = require("gulp-uglify");

//打包所有的html文件
gulp.task("copyhtml", function () {
    return gulp.src("web/*.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
});


// 打包所有图片,任意格式
gulp.task("copyimages", function () {
    return gulp.src("images/**/*")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
});

//打包数据源.json格式
gulp.task("copydata", function () {
    return gulp.src("data/*.json")
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload());
});

// 打包css
gulp.task("copycss", function () {
    return gulp.src("css/*.css")
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
});

// //打包重置的css
// gulp.task("resetscss", function () {
//     return gulp.src("css/scss/_reset.{sass,scss}")
//         .pipe(scss())
//         .pipe(gulp.dest("dist/css"))
//         .pipe(minifyCss())
//         .pipe(rename("reset.min.css"))
//         .pipe(gulp.dest("dist/css"))
//         .pipe(connect.reload());
// })

//打包处理登录页面的css
gulp.task("loginscss", function () {
    return gulp.src("css/scss/login.{sass,scss}")
        .pipe(scss({ outputStyle: 'compact' }).on('error', handleErrors)) // 用我们自己写的handleErrors替代处理错误
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("login.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})



// gulp.task("copyshop",function(){
//   return  gulp.src("css/shoppingCar.css")
//     .pipe(minifyCss())
//     .pipe(rename("shoppingCar.min.css"))
//     .pipe(gulp.dest("dist/css"))
//     .pipe(connect.reload());
// });

gulp.task("copyJs", function () {
    return gulp.src(["js/*.js", "!gulpfile.js", "!handleErrors.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});


gulp.task("copyloginJs",function(){
   return gulp.src("js/login.js")
   .pipe(gulp.dest("dist/js"))
   .pipe(uglify())
   .pipe(rename("login.min.js"))
   .pipe(gulp.dest("dist/js"))
   .pipe(connect.reload());
});


gulp.task("build", [
    "copyhtml",
    "copyimages",
    "copydata",
    "copycss",
    "loginscss",
    "copyJs",
    // "resetscss"
    "copyloginJs",
    // "scssAll"
    ], function () {
        console.log("全部构建成功");
    });

//gulp提供监听的机制，自动监听文件，如果发现文件发生改变，自动执行任务，完成更新
//编写我们监听的文件  
//第一个参数  监听文件路径  第二个参数（数组）  执行的任务
gulp.task("watch", function () {
    gulp.watch("web/*.html", ["copyhtml"]);
    gulp.watch("images/**/*", ["copyimages"]);
    gulp.watch("data/*.json", ["copydata"]);
    gulp.watch("css/*.css", ["copycss"]);
    // gulp.watch("css/scss/_reset.{sass,scss}", ["resetscss"]);
    gulp.watch("css/scss/login.{sass,scss}", ["loginscss"]);
    gulp.watch(["js/*.js"], ["copyJs"]);
    gulp.watch("js/login.js", ["copyloginJs"]);
  
});


//gulp-connect 本地启动一个服务器
const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist",//指定服务器的根目录
        port: 9998,
        livereload: true,//启动实时刷新
        fallback: 'login.html' //默认启动文件
    });
});

//同时执行watch和server这两个任务  设置默认任务  执行 gulp
gulp.task("default", ["server", "watch"]);