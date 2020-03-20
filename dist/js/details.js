/*
* 文件名:details.js
* 功能:  详情页
* 引用方式:requeire["details"]
* author:lechar
* Date:  2020-03-18
*/
define(['ajax', 'urlParm', 'date'], function ($, u, date) {
    var oPiclistBox = document.querySelector(".picImg-data");

    //详情页初始化
    function init() {
        $.ajax({
            type: "get",
            url: "data/piclist.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg);

                var productId = u.urlParm.parm("productId");;

                // 此处先写死,productId=1
                productId = productId != 1 ? 1 : productId;

                if (data.productId == productId) {

                    getPicList(data);
                    getDetails(data);
                    imgBigShow();
                }
            }
        });
    }

    //获取副图片列表
    function getPicList(data) {

        var liHtml = "";
        for (var i = 0; i < data.piclist.length; i++) {
            liHtml += `<li>
                        <a href="javascript:">
                            <img src="${data.piclist[i]}" alt="">
                        </a>
                      </li>`;
        }

        oPiclistBox.innerHTML = liHtml;
        var oLis = oPiclistBox.querySelectorAll("li img");
        oLis[0].className = "active";

        imgTab();
        picBanner();

    }

    //图片列表切换
    function imgTab() {
        oPiclistBox.onclick = function (ev) {

            var e = ev || window.event;
            var target = e.target || window.event.srcElement;

            if (target.tagName.toLowerCase() == "img") {

                var oLis = this.querySelectorAll("li img");

                for (var j = 0; j < oLis.length; j++) {
                    oLis[j].className = "";
                }

                target.className = "active";

            }
        }
    }

    //图片轮播效果
    function picBanner() {
        //图片容器
        var oImgCon = document.querySelector(".pic-list");
        //图片初始下标
        var indexImg = 1;

        var indexNum = 0;

        //图片组
        var oImgs = oImgCon.querySelectorAll("li");
        // 获取一张图片的宽度
        imgWidth = oImgs[0].offsetWidth;
        var timer1;

        var oLeft = document.querySelector(".pic-pre");
        var oRight = document.querySelector(".pic-next");

        // 构造 5123451的图片结构
        var oLis = oPiclistBox.querySelectorAll("li");
        // 克隆第一张图片节点
        // var firstNode = oLis[0].cloneNode(true);
        //克隆最后一张图片节点
        var lastNode = oLis[oLis.length - 1].cloneNode(true);

        var firstNode = "";
        for (var k = 0; k < oLis.length; k++) {
            if (k <= 4) {
                firstNode = oLis[k].cloneNode(true);
                oPiclistBox.appendChild(firstNode);
            }
        }

        //插入最前main
        // oPiclistBox.appendChild(firstNode);
        // 插入最后面
        oPiclistBox.insertBefore(lastNode, oLis[0]);

        //图片初始位置
        oImgCon.scrollLeft = indexImg * imgWidth;

        //点击右按钮切换
        oRight.onclick = function () {
            indexImg++;
            //等于图片数量 长度之后
            if (indexImg >= oLis.length + 2) {
                indexImg = 2;

                oImgCon.scrollLeft = imgWidth;
            }

            startMove();
        }

        //点击右按钮切换
        oLeft.onclick = function () {
            indexImg--;
            //等于图片数量 长度之后
            if (indexImg < 0) {
                indexImg = oImgs.length - 1;

                oImgCon.scrollLeft = (indexImg + 1) * imgWidth;
            }
            startMove();

            startMove();
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
            timer1 = setInterval(function () {
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
    }

    //获取详情
    function getDetails(data) {
        var phoneName = document.querySelector(".phoneName");
        //sku模块
        var phoneSku = document.querySelector(".phoneSku");
        var phoneDesc = document.querySelector(".phoneDesc");
        var phonePrice = document.querySelector(".prod-price strong");
        phoneName.innerHTML = data.productName;
        phoneSku.innerHTML = `${data.color[0]}/${data.versions[0]}/${data.system[0]}`;
        phoneDesc.innerHTML = data.desc;
        phonePrice.innerHTML = `¥${data.productPrice}`;

        //活动模块
        var activeSales = document.querySelector(".sales-active")
        var liHtml = "";
        for (var i = 0; i < data.promotion.length; i++) {
            var activeData = data.promotion[i];

            var downDateStr = "";

            if (activeData.endTime) {
                downDateStr = countDown(activeData.endTime);
            }

            liHtml += ` <li>
                            <span>${activeData.title}</span>
                            <div class="plist-block">
                                <a href="javascript:">
                                    <img src="${activeData.activeImg}" alt="">
                                    <i>${activeData.type}</i>
                                    <div class="countdown">
                                        ${downDateStr}
                                    </div>
                                </a>
                            </div>
                         </li>`;
        }
        activeSales.innerHTML = liHtml;

    }

    //倒计时
    function countDown(target_date) {
        setInterval(function () {
            var currentDate = new Date();

            //获取当前时间到起点时间毫秒数
            var t1 = currentDate.getTime();
            //获取目标时间到起点时间毫秒数
            var targetDate = new Date(target_date);
            var t2 = targetDate.getTime();

            //时间戳
            var downtime = t2 - t1;

            //8个小时的毫秒数
            var downDate = new Date(downtime - 60 * 1000 * 60 * 8);

            var downDay = downDate.getDate() - 1;
            var downHour = downDate.getHours();
            var downMinutes = downDate.getMinutes();
            var downSeconds = downDate.getSeconds();

            if (downHour < 10) {
                downHour = "0" + downHour;
            }

            if (downMinutes < 10) {
                downMinutes = "0" + downMinutes;
            }

            if (downSeconds < 10) {
                downSeconds = "0" + downSeconds;
            }

            var dateText = `<span>${downDay}</span>天<span>${downHour}</span>时<span>${downMinutes}</span>分<span>${downSeconds}</span>秒`;

            var divObj = document.querySelector(".countdown");
            divObj.innerHTML = dateText;
        }, 300);
    }

    //图片放大镜
    function imgBigShow() {
        var small = document.querySelector(".smallImg");
        var smallImg = document.querySelector(".smallImg img");
        var big = document.querySelector(".bigImg");
        var bigImg = document.querySelector(".bigImg img");
        var mark = document.querySelector("#mark");

        small.onmouseenter = function () {
            big.style.display = "block";
        }

        small.onmouseleave = function () {
            big.style.display = "none";
        }

        small.onmousemove = function (ev) {
            var e = ev || window.event;

            var left = e.clientX - small.offsetLeft - 50;
            var top = e.clientY - small.offsetTop + 150;
            if (left <= 0) {
                left = 0;
            }

            if (left >= 300) {
                left = 300;
            }
            if (top <= 0) {
                top = 0;
            }

            if (top >= 300) {
                top = 300;
            }

            mark.style.left = left + "px";
            mark.style.top = top + "px";

            //右变大图片的位置，相当于左边遮罩层，反方向对应倍数的位置。
            bigImg.style.left = -2 * left + 'px';
            bigImg.style.top = -2 * top + 'px';
        }
    }

    return {
        init: init
    }
});