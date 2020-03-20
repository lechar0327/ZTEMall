/*
* 文件名:date.js
* 功能:  封装的时间
* 引用方式:requeire["date"]
* author:lechar
* Date:  2020-03-20
*/
define(function () {
     //倒计时
     function downDate(targetDate,) {
        setInterval(function () {
            var currentDate = new Date();
            //获取当前时间到起点时间毫秒数
            var t1 = currentDate.getTime();
            //获取目标时间到起点时间毫秒数
            var targetDate = new Date("2020/02/03 00:00:00");
            var t2 = targetDate.getTime();

            //时间戳
            var downtime = t2 - t1;

            //8个小时的毫秒数
            var downDate = new Date(downtime - 60 * 1000 * 60 * 8);

            var downDay = downDate.getDate() - 1;
            var downHour = downDate.getHours();
            var downMinutes = downDate.getMinutes();
            var downSeconds = downDate.getSeconds();
            var downMiSeconds = downDate.getMilliseconds();

            if (downHour < 10) {
                downHour = "0" + downHour;
            }

            if (downMinutes < 10) {
                downMinutes = "0" + downMinutes;
            }

            if (downSeconds < 10) {
                downSeconds = "0" + downSeconds;
            }

            var dateText = "距离开学还有:" + downDay +
                "日 " + downHour +
                "时" + downMinutes +
                "分" + downSeconds +
                "秒" + downMiSeconds;

            var divObj = document.querySelector(".downDate");
            divObj.innerText = dateText;
        }, 300);
    }
    //返回年月日时分秒对象
    function DateObject(currentDate) {
        var dateobj = {};
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1;
        var date = currentDate.getDate();

        var hour = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();

        if (month < 10) {
            month = "0" + month;
        }

        if (date < 10) {
            date = "0" + date;
        }

        if (hour < 10) {
            hour = "0" + hour;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return dateobj = {
            year: year,
            month: month,
            date: date,
            hour: hour,
            minutes: minutes,
            seconds: seconds
        };
    }
});