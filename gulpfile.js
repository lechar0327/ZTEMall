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

const util=require("gulp-util");

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

//打包处理注册页面的css
gulp.task("registerscss", function () {
    return gulp.src("css/scss/register.{sass,scss}")
        .pipe(scss({ outputStyle: 'compact' }).on('error', handleErrors)) // 用我们自己写的handleErrors替代处理错误
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("register.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

//打包处理首页的css
gulp.task("indexscss", function () {
    return gulp.src("css/scss/index.{sass,scss}")
        .pipe(scss({ outputStyle: 'compact' }).on('error', handleErrors)) // 用我们自己写的handleErrors替代处理错误
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

//打包处理详情页的css
gulp.task("detailscss", function () {
    return gulp.src("css/scss/details.{sass,scss}")
        .pipe(scss({ outputStyle: 'compact' }).on('error', handleErrors)) // 用我们自己写的handleErrors替代处理错误
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("details.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

//打包处理购物车的css
gulp.task("Catcss", function () {
    return gulp.src("css/scss/shoppingCat.{sass,scss}")
        .pipe(scss({ outputStyle: 'compact' }).on('error', handleErrors)) // 用我们自己写的handleErrors替代处理错误
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("shoppingCat.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})



//登录JS
gulp.task("copyloginJs", function () {
    return gulp.src("js/login.main.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("login.main.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});
//注册JS
gulp.task("copyregisterJs", function () {
    return gulp.src("js/register.main.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("register.main.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});
//首页JS
gulp.task("copyindexJs", function () {
    return gulp.src("js/index.main.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("index.main.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});

//bannerJS
gulp.task("copybannerJs", function () {
    return gulp.src("js/banner.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        //打包时报错提示信息
        .on('error', function(err) {
            util.log(util.colors.red('[Error]'), err.toString());
        })
        .pipe(rename("banner.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});

//详情页JS
gulp.task("copydetailJs", function () {
    return gulp.src("js/details.main.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("details.main.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});

//购物车js
gulp.task("shoppingCatJs", function () {
    return gulp.src("js/shoppingCat.main.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("shoppingCat.main.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});


// 打包所有js到dist目录
gulp.task("copyJs", function () {
    return gulp.src(["js/*.js", "!gulpfile.js", "!handleErrors.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});


gulp.task("build", [
    "copyhtml",
    "copyimages",
    "copydata",
    "copycss",
    "loginscss",
    "registerscss",
    "detailscss",
    "Catcss",
    "copyregisterJs",
    "copyloginJs",
    "copyindexJs",
    "indexscss",
    "copybannerJs",
    "copyJs",
    "copydetailJs",
    "shoppingCatJs"

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
    gulp.watch("css/scss/login.{sass,scss}", ["loginscss"]);
    gulp.watch("css/scss/register.{sass,scss}", ["registerscss"]);
    gulp.watch("css/scss/index.{sass,scss}", ["indexscss"]);
    gulp.watch("css/scss/shoppingCat.{sass,scss}", ["Catcss"]);

    gulp.watch("css/scss/details.{sass,scss}", ["detailscss"]);
    gulp.watch("js/login.main.js", ["copyloginJs"]);
    gulp.watch("js/register.main.js", ["copyregisterJs"]);
    gulp.watch("js/index.main.js", ["copyindexJs"]);
    gulp.watch("js/banner.js", ["copyBannerJs"]);
    gulp.watch("js/details.main.js", ["copydetailJs"]);
    gulp.watch(["js/*.js"], ["copyJs"]);
    gulp.watch("js/shoppingCat.main.js", ["shoppingCatJs"]);
    
    
});
//gulp-connect 本地启动一个服务器
const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist",//指定服务器的根目录
        port: 9998,
        livereload: true,//启动实时刷新
        fallback: 'web/home.html' //默认启动文件
    });
});

//同时执行watch和server这两个任务  设置默认任务  执行 gulp
gulp.task("default", ["server", "watch"]);