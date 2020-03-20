/*
* 文件名:index.js
* 功能:  首页
* 引用方式:requeire["index"]
* author:lechar
* Date:  2020-03-13
*/
define(["ajax"], function ($) {

    //图片组
    var oImgs;
    //切换的数字组
    var oNums;

    // 滚动图片的容器
    var oImgCon = document.querySelector(".banner-inner");
    //左右切换箭头
    var oLeft = document.querySelector(".left-tab");
    var oRight = document.querySelector(".right-tab");

    //图片初始下标
    var indexImg = 1;
    //数字初始下标
    var indexNum = 0;
    var imgWidth = 0;
    var timer1;
    var timer2;

    //加载banner图数据
    function loadBannerData() {
        $.ajax({
            type: "get",
            url: "data/banner.json",
            data: {},
            success: function (msg) {
                //清空原来的结构
                oImgCon.innerHTML = "";
                //创建ul容器
                var oUl = document.createElement("ul");
                oUl.className = "clearfix";
                //获取切换圆点容器
                var oActive = document.querySelector(".active-num");
                // 解析数据
                var data = JSON.parse(msg);

                for (var i = 0; i < data.length; i++) {
                    var oLi = document.createElement("li");

                    var oAs = document.createElement("a");
                    oAs.href = data[i].linkAddress;
                    oAs.taget = "_blank";

                    var oImg = document.createElement("img");
                    oImg.src = data[i].imgSrc;
                    //让图片充满整个横屏
                    oImg.style.width = document.documentElement.clientWidth + 'px';

                    oAs.appendChild(oImg);
                    oLi.appendChild(oAs);

                    oUl.appendChild(oLi);

                    //创建ol中的li元素
                    var oActiveLi = document.createElement("li");
                    //初始li的样式是当前活动状态的
                    if (i == 0) {
                        oActiveLi.className = "active";
                    }

                    //将li添加到切换图片容器
                    oActive.appendChild(oActiveLi);
                }

                // 将ul添加到bannner图容器
                oImgCon.appendChild(oUl);

                //图片组
                oImgs = document.querySelectorAll(".banner-inner img");
                //切换的数字组
                oNums = oActive.querySelectorAll("li");

                // 获取一张图片的宽度
                imgWidth = oImgs[0].offsetWidth;

                // 构造 5123451的图片结构
                var oLis = oUl.querySelectorAll("li");
                // 克隆第一张图片节点
                var firstNode = oLis[0].cloneNode(true);
                //克隆最后一张图片节点
                var lastNode = oLis[oLis.length - 1].cloneNode(true);

                //插入最前main
                oUl.appendChild(firstNode);
                // 插入最后面
                oUl.insertBefore(lastNode, oLis[0]);

                //图片初始位置
                oImgCon.scrollLeft = indexImg * imgWidth;

                //自动播放
                autoMove();
                //点击数字切换
                numTab();
            }
        });
    }


    //开始运动
    function startMove() {
        //最小的步长
        var minStep = 0;
        //走多少步
        var maxStep = 20;
        // 起始位置,横向滚动条的位置
        var start = oImgCon.scrollLeft;
        //结束位置,当前图片索引 *  一张图片的宽度
        var end = indexImg * imgWidth;
        //(结束的长度 -起始位置)/最大步长=每次走多少步
        var everyStep = (end - start) / maxStep;
        clearInterval(timer1);
        timer1 = setInterval(() => {
            minStep++;
            //步数走完之后清除定时器
            if (minStep >= maxStep) {
                clearInterval(timer1);
            }

            //起始位置累加每次的步数
            start += everyStep;
            //实现滚动条滚动
            oImgCon.scrollLeft = start;
        }, 20);
    }

    //自动切换
    function autoMove() {
        clearInterval(timer2);
        //每3秒轮播
        timer2 = setInterval(() => {
            // 图片索引累加
            indexImg++;
            //等于图片数量 长度之后

            if (indexImg >= oImgs.length) {
                indexImg = 2;

                oImgCon.scrollLeft = imgWidth;
            }
            startMove();
            // 清除上一个图片的数字切换样式
            // console.log(oNums);

            oNums[indexNum].className = "";

            indexNum++;
            if (indexNum >= oNums.length) {
                indexNum = 0;
            }
            //添加当前数字的样式
            oNums[indexNum].className = "active";
        }, 2000);
    }

    //点击数字切换
    function numTab() {
        for (let i = 0; i < oNums.length; i++) {

            oNums[i].index = i;
            oNums[i].onclick = function () {
                clearInterval(timer2);

                oNums[indexNum].className = "";
                indexNum = this.index;
                oNums[indexNum].className = "active";

                indexImg = this.index + 1;//同步图片下标

                startMove();
                autoMove();
            }

        }
    }

    //点击左按钮切换
    oLeft.onclick = function () {
        clearInterval(timer2);
        indexImg--;
        //等于图片数量 长度之后
        if (indexImg < 0) {
            indexImg = oImgs.length - 3;

            oImgCon.scrollLeft = (indexImg + 1) * imgWidth;
        }
        startMove();
        // 清除上一个图片的数字切换样式
        oNums[indexNum].className = "";

        indexNum--;
        if (indexNum < 0) {
            indexNum = oNums.length - 1;
        }
        //添加当前数字的样式
        oNums[indexNum].className = "active";
        autoMove();
    }

    //点击右按钮切换
    oRight.onclick = function () {
        clearInterval(timer2);
        indexImg++;
        //等于图片数量 长度之后
        if (indexImg >= oImgs.length) {
            indexImg = 2;

            oImgCon.scrollLeft = imgWidth;
        }
        startMove();
        // 清除上一个图片的数字切换样式
        oNums[indexNum].className = "";

        indexNum++;
        if (indexNum >= oNums.length) {
            indexNum = 0;
        }
        //添加当前数字的样式
        oNums[indexNum].className = "active";
        autoMove();
    }

    //获取热点图,今日推荐
    function getHot() {
        var oHotGoods = document.querySelector(".hot-goods");
        $.ajax({
            type: "get",
            url: "data/hot.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg);
                for (var i = 0; i < data.length; i++) {
                    var oA = document.createElement("a");
                    oA.href = "/details.html?productId="+data[i].productId;


                    var oI = document.createElement("img");
                    oI.src = data[i].imgsrc;

                    oA.appendChild(oI);
                    oHotGoods.appendChild(oA);
                }
            }
        });
    }

    //获取精品推荐数据
    function getBoutique() {
        var oBoutiqueGoods = document.querySelector(".boutique-prod");
        $.ajax({
            type: "get",
            url: "data/product.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg)[0].boutique;

                var strHtml = `<ul class="clearfix">`;
                var strLi = "";
                for (var i = 0; i < data.length; i++) {
                    var delHtml = "";
                    if (data[i].originalPrice != 0) {
                        delHtml = `<del>¥${data[i].originalPrice}</del>`;
                    }
                    strLi += ` <li index="${data[i].productId}">
                                <a href="${data[i].link}">
                                    <div class="goodImg">
                                        <img src="${data[i].imgsrc}" alt="">
                                    </div>
                                    <div class="good-details">
                                        <p class="phone-title">${data[i].productName}</p>
                                        <p class="phone-desc">${data[i].desc}</p>
                                        <p class="phone-price">¥<strong>${data[i].productPrice}</strong>
                                        ${delHtml}</p>
                                    </div>
                                </a>
                            </li>`;
                }
                strHtml += strLi + "</ul>";
                oBoutiqueGoods.innerHTML = strHtml;
            }
        });

    }

    //获取智能硬件数据
    function getCapacity() {
        var oCapacityGoods = document.querySelector(".capacity-prod");
        $.ajax({
            type: "get",
            url: "data/product.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg)[0].capacity;

                var strHtml = `<ul class="clearfix">`;
                var strLi = "";
                for (var i = 0; i < data.length; i++) {
                    var delHtml = "";
                    if (data[i].originalPrice != 0) {
                        delHtml = `<del>¥${data[i].originalPrice}</del>`;
                    }
                    strLi += `<li index="${data[i].productId}">
                                <a href="${data[i].link}">
                                    <div class="capacityImg">
                                        <img src="${data[i].imgsrc}" alt="">
                                    </div>
                                    <div class="capacityDetails">
                                        <p class="phone-title">${data[i].productName}</p>
                                        <p class="phone-desc">${data[i].desc}</p>
                                        <p class="phone-price">¥<strong>${data[i].productPrice}</strong>
                                        ${delHtml}</p>
                                    </div>
                                </a>
                            </li>`;
                }
                strHtml += strLi + "</ul>";
                oCapacityGoods.innerHTML = strHtml;
            }
        });
    }

    //获取配件专区菜单数据
    function partMenu() {
        var nodeDiv = document.querySelector(".parts-wrap .p-title ul");
        nodeDiv.innerHTML = "";
        $.ajax({
            type: "get",
            url: "data/product.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg)[0].parts;

                var strli = "";
                for (var i = 0; i < data.length; i++) {
                    strli += `<li><a  index="${data[i].typeId}" href="javascript:">${data[i].typeName}</a></li>`;
                }

                strli += `<li> <a href="javascript:">更多 &nbsp;<img src="images/look-all.png" alt=""></a> </li>`
                nodeDiv.innerHTML = strli;

                var oLis = nodeDiv.querySelectorAll("li a");
                for (var i = 0; i < oLis.length - 1; i++) {
                    oLis[i].parentNode.className = "";
                    oLis[i].ind = i;
                    oLis[i].onmouseenter = function () {
                        for (var j = 0; j < oLis.length; j++) {
                            oLis[j].parentNode.className = "";
                        }
                        this.parentNode.className = "parts-type";

                        getParts(this.getAttribute("index"));
                    }
                }

            }
        });
    }
    //获取配件专区
    function getParts(typeId) {
        var oPartsGoods = document.querySelector(".parts-prod");
        $.ajax({
            type: "get",
            url: "data/product.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg)[0].parts;

                var strHtml = `<ul class="clearfix">`;
                var strLi = "";
                for (var i = 0; i < data.length; i++) {

                    if (typeId == data[i].typeId) {
                        var prodata = data[i].prodata;

                        for (var j = 0; j < prodata.length; j++) {
                            var delHtml = "";
                            if (prodata[j].originalPrice != 0) {
                                delHtml = `<del>¥${prodata[j].originalPrice}</del>`;
                            }
                            strLi += `<li index="${prodata[j].productId}">
                                        <a href="${prodata[j].link}">
                                            <div class="partsImg">
                                                <img src="${prodata[j].imgsrc}" alt="">
                                            </div>
                                            <div class="partsDetails">
                                                <p class="phone-title">${prodata[j].productName}</p>
                                                <p class="phone-desc">${prodata[j].desc}</p>
                                                <p class="phone-price">¥<strong>${prodata[j].productPrice}</strong>
                                                ${delHtml}</p>
                                            </div>
                                        </a>
                                    </li>`;
                        }

                    }
                }
                strHtml += strLi + "</ul>";

                oPartsGoods.innerHTML = strHtml;
            }
        });
    }

    //导航栏移入移出
    function topNav() {
        var node = document.querySelector(".top-nav");

        node.addEventListener("mouseover", function (ev) {
            var e = ev || window.event;
            var target = e.target || window.event.srcElement;
            if (target.tagName.toLowerCase() == "a" && target.className == "axon-blade") {
                var goodsEle = document.querySelector(".detail-block ul");
                if (goodsEle) {
                    goodsEle.parentNode.removeChild(goodsEle);
                }

                var typeIndex = target.getAttribute("index");
                getNavData(typeIndex);
            }
        });
        node.addEventListener("mouseleave", function (ev) {
            var nodeData = document.querySelector(".detail-block");
            nodeData.style.display = "none";
            nodeData.innerHTML = "";
        });
    }

    // 获取导航栏数据
    function getNavData(typeIndex) {

        var nodeData = document.querySelector(".detail-block");
        nodeData.style.display = "block";
        nodeData.innerHTML = "";
        $.ajax({
            type: "get",
            url: "data/topnav.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg);

                for (var i = 0; i < data.length; i++) {

                    if (typeIndex == data[i].typeId) {
                        var d = data[i].data;
                        var oUl = `<ul class="container">`;
                        var liHtml = "";

                        for (var j = 0; j < d.length; j++) {
                            var delHtml = "";
                            if (d[j].originalPrice != 0) {
                                delHtml = `<del>¥${d[j].originalPrice}</del>`;
                            }
                            liHtml += ` <li>
                                        <a href="${d[j].link}">
                                            <div class="detail-img">
                                                <img src="${d[j].imgsrc}" alt="">
                                            </div>
                                            <div class="details">
                                                <p class="d-title">${d[j].productName}</p>
                                                <p class="d-price">¥<strong>${d[j].productPrice}</strong>
                                                ${delHtml}</p>
                                            </div>
                                        </a>
                                    </li>`
                        }
                        oUl += liHtml + " </ul >";
                        nodeData.innerHTML = oUl;
                    }
                }

                var lisImg = nodeData.querySelector("li .detail-img");

                lisImg.style.borderLeft = "none";
            }
        });
    }

    return {
        loadBannerData: loadBannerData,
        getHot: getHot,
        getBoutique: getBoutique,
        getCapacity: getCapacity,
        getParts: getParts,
        partMenu: partMenu,
        topNav: topNav
    }
});