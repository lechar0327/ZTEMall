/*
* 文件名:nav.js
* 功能:  左侧导航菜单
* 引用方式:requeire["nav"]
* author:lechar
* Date:  2020-03-15
*/
define(["ajax"], function ($) {
    function init() {
        var oNavUl = document.querySelector("#navUl");

        $.ajax({
            type: "get",
            url: "data/nav.json",
            data: {},
            success: function (msg) {
                var data = JSON.parse(msg);

                for (var i = 0; i < data.length; i++) {
                    var oLi = document.createElement("li");
                    oLi.setAttribute("index", data[i].catId);

                    var childs = data[i].childs;

                    var strHtml = `<h2><a index='${data[i].catId}' href="#">${data[i].categoryName}</a></h2>`;
                    var strLi = "<ul>";
                    for (var j = 0; j < childs.length; j++) {
                        if (childs[j].isShow) {
                            strLi += `<li><a href="#">${childs[j].typeName}</a> </li>`;
                        }
                    }
                    strLi += " </ul >";

                    strHtml = strHtml + strLi;

                    oLi.innerHTML = strHtml;

                    oNavUl.appendChild(oLi);
                  
                    mouseMove(oLi,data);
                }
            }
        });
    }

    //鼠标移入移出
    function mouseMove(ele,data) {
        ele.addEventListener("mouseenter", function (ev) {
            var liTargetId = this.getAttribute("index");
            var e = ev || window.event;
            var target = e.target || window.event.srcElement;
            if (target.tagName.toLowerCase() == "li" || target.hasAttributes("index")) {
                var goodsEle = document.querySelector(".goods-block");

                if (goodsEle) {
                    goodsEle.parentNode.removeChild(goodsEle);
                }

                var strGoods = `<div class="goods-block" style="display: block;"><ul>`;
                var strGoodsLi = "";
                for (var k = 0; k < data.length; k++) {
                    if (liTargetId == data[k].catId) {
                        var childs = data[k].childs;

                        for (var v = 0; v < childs.length; v++) {
                            strGoodsLi += `<li>
                        <div class="goods-img">
                            <img src="${childs[v].imgsrc}" alt="${childs[v].typeName}">
                        </div>
                        <div class="goods-title">
                            <a href="/list.html?cat_id=96">
                                <span>${childs[v].typeName}</span>
                            </a>
                        </div>
                        </li>`;
                        }

                        strGoodsLi += " </ul></div>";
                    }
                }
                strGoods += strGoodsLi;

                this.innerHTML += strGoods;
            }
        });

        ele.addEventListener("mouseleave", function (ev) {
            var goodsEle = document.querySelector(".goods-block");

            if (goodsEle) {
                goodsEle.parentNode.removeChild(goodsEle);
            }
        });
    }
    return {
        init: init
    }
});