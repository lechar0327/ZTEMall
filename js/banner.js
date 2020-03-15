/*
* 文件名:banner.js
* 功能:  轮播图插件
* 引用方式:requeire["banner"]
* author:lechar
* Date:  2020-03-13
* 引用示例:
*           var options = {
*                elementCon: ".banner-inner",//滚动图片的容器
*                elementLeft: ".left-tab",//左切换箭头
*                elementRight: ".right-tab",//右切换箭头
*                elementActive: ".active-num",//数字切换容器
*                oImgWidth: null,//banner图片的宽度,null值铺满横屏
*                active: "active",//当前数字轮播切换的样式
*                data: msg   //轮播图数据
                    数据格式:  [{
                                "bannerId": 10001,
                                "imgSrc": "../images/banner01.jpg",
                                "linkAddress": "https://www.myzte.com/A7s.html"
                               }]
*            }
*            banner.Init(options);      
*/
define(function () {
    /************************私有属性***************************/
    // 滚动图片的容器
    var oImgCon;
    //数字切换容器
    var oActive;
    //图片组
    var oImgs;
    //切换的数字组
    var oNums;
    //图片初始下标
    var indexImg = 1;
    //数字初始下标
    var indexNum = 0;
    //当前数字轮播切换的样式
    var active;

    var imgWidth = 0;
    var timer1;
    var timer2;
    var oLeft;
    var oRight;

    function Init(options) {
        // 滚动图片的容器
        oImgCon = document.querySelector(options.elementCon);
        //左右切换箭头
        oLeft = document.querySelector(options.elementLeft);
        oRight = document.querySelector(options.elementRight);

        //数字切换容器
        oActive = document.querySelector(options.elementActive);
        //图片的宽度
        var oImgWidth = options.oImgWidth
        //当前数字轮播切换的样式
        active = options.active;

        var dataObj = options.data || [];

        //清空原来的结构
        oImgCon.innerHTML = "";
        //创建ul容器
        var oUl = document.createElement("ul");

        oUl.className = "clearfix";

        // 解析数据
        var data = JSON.parse(dataObj);

        for (var i = 0; i < data.length; i++) {
            var oLi = document.createElement("li");

            var oAs = document.createElement("a");
            oAs.href = data[i].linkAddress;
            oAs.target = "_blank";
            oAs.id = data[i].bannerId;
            var oImg = document.createElement("img");
            oImg.src = data[i].imgSrc;
            //让图片充满整个横屏
            oImg.style.width = oImgWidth || document.documentElement.clientWidth + 'px';

            oAs.appendChild(oImg);
            oLi.appendChild(oAs);

            oUl.appendChild(oLi);

            //创建ol中的li元素
            var oActiveLi = document.createElement("li");
            //初始li的样式是当前活动状态的
            if (i == 0) {
                oActiveLi.className = active;
            }

            //将li添加到切换图片容器
            oActive.appendChild(oActiveLi);
        }

        // 将ul添加到bannner图容器
        oImgCon.appendChild(oUl);

        //图片组
        oImgs = oImgCon.querySelectorAll("img");
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

        RightLeftTab();
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
        timer1 = setInterval(function(){
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
        timer2 = setInterval(function() {
            // 图片索引累加
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
            oNums[indexNum].className = active;
        }, 3000);
    }

    //点击数字切换
    function numTab() {
        for (var i = 0; i < oNums.length; i++) {

            oNums[i].index = i;
            oNums[i].onclick = function () {
                clearInterval(timer2);

                oNums[indexNum].className = "";
                indexNum = this.index;
                oNums[indexNum].className = active;

                indexImg = this.index + 1;//同步图片下标

                startMove();
                autoMove();
            }

        }
    }

    function RightLeftTab() {
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
            oNums[indexNum].className = active;
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
            oNums[indexNum].className = active;
            autoMove();
        }
    }


    return {
        Init: Init
    }
});