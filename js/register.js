/*
* 文件名:register.js
* 功能:  注册功能
* 引用方式:requeire["register"]
* author:lechar
* Date:  2020-03-13
*/
define(["ajax"], function ($) {
    var changeCode = document.querySelector("#changeCode");
    var rImgCode = document.querySelector("#rImgCode");
    var txtPhone = document.querySelector("#txtPhone");
    var txtPwd = document.querySelector("#txtPwd");
    var txtRePwd = document.querySelector("#txtRePwd");
    var txtRcode = document.querySelector("#txtRcode");
    var txtmsgVcode = document.querySelector("#txtmsgVcode");
    var oMsginfo = document.querySelector(".msginfo");

    //初始化
    function init() {
        rImgCode.src = "https://www.myzte.com/vcode-index-passport.html?" + new Date().getTime();
        refreshCode(changeCode);
    }

    //刷新验证码
    function refreshCode() {
        changeCode.addEventListener("click", function () {
            //使用中兴商城的生成验证码,暂时用假的
            rImgCode.src = "https://www.myzte.com/vcode-index-passport.html?" + new Date().getTime();
        }, false);

    }

    //获取验证码
    function getCode() {
        var oGetMcode = document.querySelector("#getMcode");
        oGetMcode.onclick = function () {
            var num = 120;
            if (checkRegister(false)) {
                sTimer = setInterval(() => {
                    num--;
                    this.innerHTML = "短信已发送," + num + "秒后可重试";
                    if (num == 0) {
                        clearInterval(sTimer);
                        this.innerHTML = "获取短信验证码";
                        this.parentNode.style.width = "124px";
                        this.style.color = "#000";
                    }
                }, 1000);

                this.innerHTML = "短信已发送," + num + "秒后可重试";
                this.parentNode.style.width = "170px";
                this.style.color = "#999";
            }


        }
    }

    //检验数据
    function checkRegister(ischeck) {
        var oRequireTips = document.querySelector(`.m-require`);
        var regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
        var regmVode = /^[a-zA-Z0-9]$/;

        if (txtPhone.value.length == 0) {
            oRequireTips.style.display = "block";
            oRequireTips.style.top = "48px";
            txtPhone.className = "onfocus-input";
            TipsClearInput(oRequireTips);
            return false;
        }

        if (txtPwd.value.length == 0) {
            oRequireTips.style.display = "block";
            oRequireTips.style.top = "100px";
            txtPwd.className = "onfocus-input";
            TipsClearInput(oRequireTips);
            return false;
        }

        if (txtRePwd.value.length == 0) {
            oRequireTips.style.display = "block";
            oRequireTips.style.top = "152px";
            txtRePwd.className = "onfocus-input";
            TipsClearInput(oRequireTips);
            return false;
        }

        if (txtRcode.value.length == 0) {
            oRequireTips.style.display = "block";
            oRequireTips.style.top = "204px";
            txtRcode.className = "onfocus-input";
            TipsClearInput(oRequireTips);
            return false;
        }

        if (ischeck) {
            if (txtmsgVcode.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "256px";
                txtmsgVcode.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }
        }

        if (!regPhone.test(txtPhone.value)) {

            oMsginfo.style.display = "block";
            oMsginfo.innerText = "手机号码格式不正确";
            TipsClearMsg(oMsginfo);
            return false;
        }

        if (txtPwd.value != txtRePwd.value) {

            oMsginfo.style.display = "block";
            oMsginfo.innerText = "两次密码输入不一致";
            TipsClearMsg(oMsginfo);
            return false;
        }

        if (regmVode.test(txtRcode.value)) {
            oMsginfo.style.display = "block";
            oMsginfo.innerText = "图形验证码格式不正确";
            TipsClearMsg(oMsginfo);
            return false;
        }

        if (regmVode.test(txtmsgVcode.value)) {
            oMsginfo.style.display = "block";
            oMsginfo.innerText = "短信验证码格式不正确";
            TipsClearMsg(oMsginfo);
            return false;
        }

        return true;

    }

    //注册
    function register() {
        var btnRegister = document.querySelector("#btnRegister");
        btnRegister.addEventListener("click", function () {
            if (checkRegister(true)) {
                var agree = document.querySelector("#agree");
                if (!agree.checked) {
                    oMsginfo.style.display = "block";
                    oMsginfo.innerText = "同意服务协议后方可注册";
                    TipsClearMsg(oMsginfo);
                    return false;
                }
                else {
                    var account = txtPhone.value;
                    var pwd = txtPwd.value;
                    var Rcode = txtRcode.value;
                    var msgCode = txtmsgVcode.value;

                    var data = {
                        account: account,
                        pwd: pwd,
                        Rcode: Rcode,
                        msgCode: msgCode
                    };

                    alert(JSON.stringify(data));
                }
            }

        });
    }

    //定时器清除文本框为空的提示样式
    function TipsClearInput(oRequireTips) {
        // clearTimeout(iTimer);
        iTimer = setTimeout(function () {
            oRequireTips.style.display = "none";
        }, 3000);
    }

    //定时器清除错误信息提示
    function TipsClearMsg(oMsginfo) {
        mTimer = setTimeout(function () {
            oMsginfo.style.display = "none";
        }, 3000);
    }

    return {
        init: init,
        refreshCode: refreshCode,
        getCode: getCode,
        register:register
    }
});