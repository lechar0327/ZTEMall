/*
* 文件名:index.main.js
* 功能:  首页
* 引用方式:requeire["index"]
* author:lechar
* Date:  2020-03-13
*/
//配置路径地址
require.config({
    paths: {
        "index": "index",
        "banner": "banner"
    }
});

require(["index", "banner", "ajax"], function (index, banner, $) {
    // index.loadBannerData();
    $.ajax({
        type: "get",
        url: "data/banner.json",
        data: {},
        success: function (msg) {

            var options = {
                elementCon: ".banner-inner",
                elementLeft: ".left-tab",
                elementRight: ".right-tab",
                elementActive: ".active-num",
                oImgWidth: null,
                active: "active",
                data: msg
            }
            banner.Init(options);
        }

    });
});