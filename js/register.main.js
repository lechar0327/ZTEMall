/*
* 文件名:register.main.js
* 功能:  注册功能
* 引用方式:requeire["login.main"]
* author:lechar
* Date:  2020-03-12
*/

//配置路径地址
require.config({
    paths: {
        "register": "register"
    }
});


require(["register"], function (register) {
    //初始化
    register.init();
    //刷新验证码
    register.refreshCode();

    //获取短信验证码
    register.getCode();

    //点击注册
    register.register();

});