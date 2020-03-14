/*
* 文件名:login.main.js
* 功能:  登录功能
* 引用方式:requeire["login.main"]
* author:lechar
* Date:  2020-03-12
*/
//配置路径地址
require.config({
    paths: {
        "login": "login"
    }
});

require(["login"], function (login) {
    //初始化
    login.init();
    // tab切换
    login.tab();
    //获取验证码
    login.getCode();
    // 文本框离开焦点效果
    login.inputBlur();

});