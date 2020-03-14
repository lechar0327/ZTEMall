/*
* 文件名:ajax.js
* 功能:  封装的ajax请求
* 引用方式:requeire["ajax"]
* author:lechar
* Date:  2020-03-13
*/
define(function () {
    function $ajax(options) {
        options = options || {};//若没有指定options,则赋值空对象{}
        options.type = (options.type || "GET").toUpperCase();//设置请求格式,get和post,默认为Get
        options.dataType = options.dataType || "json";//响应的数据格式,默认为json

        var params = formatParams(options.data);//对请求的数据封装
        //1.创建XMLHttpRequest对象
        // var xmlhttp = window.XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");
        var xmlhttp;
        try {
            xmlhttp = new XMLHttpRequest();
        } catch (error) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }

        //2 设置请求行
        if (options.type == "GET") {
            xmlhttp.open("GET", options.url + "?" + params, true);
            xmlhttp.send();
        }
        else if (options.type == "POST") {
            xmlhttp.open("POST", options.url, true);
            // 3.设置请求头
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //4.发送请求
            xmlhttp.send(params);
        }

        // 5.接收响应数据 触发会触发onreadystatechange事件
        xmlhttp.onreadystatechange = function () {
            //内容解析完成
            if (xmlhttp.readyState == 4) {
                var status = xmlhttp.status;
                if (status >= 200 && status < 300 || status == 304) {
                    options.success && options.success(xmlhttp.responseText, xmlhttp.responseXML);
                }
                else {
                    options.error && options.error(status);
                }
            }
        }
    }

    function formatParams(data) {
        var arr = [];
        for (var item in data) {
            //使用encodeURIComponent 对非标准的字符进行编码
            arr.push(encodeURIComponent(item) + "=" + encodeURIComponent(data[item]));
        }
        //使用随机数,确保每次请求的参数为最新的
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }

    return { ajax: $ajax };
});
