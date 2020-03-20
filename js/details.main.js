/*
* 文件名:details.main.js
* 功能:  详情页
* 引用方式:requeire["details"]
* author:lechar
* Date:  2020-03-18
*/
//配置路径地址
require.config({
    paths: {
        "details": "details",
        "banner": "banner"
    }
});

require(["details", "banner"], function (details, banner) {
    details.init();
});


