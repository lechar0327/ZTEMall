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
        "banner": "banner",
        "nav": "nav"
    }
});

require(["index", "banner", "ajax", "nav"], function (index, banner, $, nav) {
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

    //导航栏初始化
    nav.init();
    //获取热点数据
    index.getHot();
    //获取精品推荐数据
    index.getBoutique();
    //获取智能硬件数据
    index.getCapacity();
    //获取配件专区(初始化)
    index.getParts(1);
    //获取配件专区菜单数据
    index.partMenu();
    //顶部菜单移入移出
    index.topNav();
});