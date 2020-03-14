/*
* 文件名:login.js
* 功能:  登录功能
* 引用方式:requeire["login"]
* author:lechar
* Date:  2020-03-12
*/
define(["ajax"], function ($) {
    var txtMAccount = document.getElementById("txtmAccount");
    var txtAAccount = document.getElementById("txtaAccount");
    var txtEAccount = document.getElementById("txteAccount");

    var txtPwd = document.getElementById("txtPwd");
    var txtEPwd = document.getElementById("txtEPwd");

    var txtmVcode = document.getElementById("txtmVcode");
    var txtMsgVcode = document.getElementById("txtmsgVcode");

    var txtVcode = document.getElementById("txtVcode");
    var txtEVcode = document.getElementById("txtEVcode");

    var mImgCode = document.getElementById("mImgCode");
    var aImgCode = document.getElementById("aImgCode");

    var oBtnLogin = document.getElementById("btnLogin");

    var loginType = document.querySelector(".login-type");

    function init() {
        //初始时加载验证码
        mImgCode.src = "https://www.myzte.com/vcode-index-passport.html?" + new Date().getTime();

        //刷新验证码
        refreshCode(mImgCode);

        //登录按钮
        login(btnLogin);
    }

    // 选项卡切换登录类型
    function tab() {
        var oAs = document.querySelectorAll(".login-type a");
        var oTabs = document.querySelectorAll(".l-tab");
        for (var i = 0; i < oAs.length; i++) {
            oAs[i].index = i;
            oAs[i].onclick = function () {
                //重置所有样式
                for (var j = 0; j < oAs.length; j++) {
                    oAs[j].className = "";
                    oTabs[j].style.display = "none";
                }
                this.className = "active";

                //点击当前的选项卡对应的 模块显示
                oTabs[this.index].style.display = "block";

                if (this.index == 0) {
                    //使用中兴商城的生成验证码,暂时用假的
                    mImgCode.src = "https://www.myzte.com/vcode-index-passport.html?" + new Date().getTime();
                    loginType.setAttribute("lType", "m")
                    //刷新验证码
                    refreshCode(mImgCode);
                }
                else if (this.index == 1) {
                    aImgCode.src = "https://www.myzte.com/vcode-index-passport.html?" + new Date().getTime();
                    loginType.setAttribute("lType", "a")
                    //刷新验证码
                    refreshCode(aImgCode);
                }
                else {
                    loginType.setAttribute("lType", "e")
                }
            }
        }
    }

    //刷新验证码
    function refreshCode(mImgCode) {
        mImgCode.addEventListener("click", function () {
            //使用中兴商城的生成验证码,暂时用假的
            this.src = "https://www.myzte.com/vcode-index-passport.html?" + new Date().getTime();
        }, false);

    }

    //登录
    function login(oBtnLogin) {
        oBtnLogin.addEventListener("click", function () {
            if (checkLogin(true)) {
                var type = loginType.getAttribute("lType");
                switch (type) {
                    case "m":
                        //先验证数据
                        var account = txtMAccount.value;
                        var vcode = txtmVcode.value;
                        var msgCode = txtMsgVcode.value;
                        var data = {
                            account: account,
                            vcode, vcode,
                            msgCode: msgCode
                        };

                        alert(JSON.stringify(data));

                        break;
                    case "a":
                        var account = txtaAccount.value;
                        var vcode = txtVcode.value;
                        var pwd = txtPwd.value;
                        var data = {
                            account: account,
                            vcode, vcode,
                            pwd: pwd
                        };
                        alert(JSON.stringify(data));
                        break;
                    case "e":

                        var account = txtEAccount.value;
                        var vcode = txtEVcode.value;
                        var pwd = txtEPwd.value;
                        var data = {
                            account: account,
                            vcode, vcode,
                            pwd: pwd
                        };
                        alert(JSON.stringify(data));
                        break;
                }
            }

        }, false);
    }

    //离开焦点
    function inputBlur() {
        txtMAccount.onblur = function () {
            this.className = "onblur-input";
        }
        txtmVcode.onblur = function () {
            this.className = "onblur-input";
        }
        txtMsgVcode.onblur = function () {
            this.className = "onblur-input";
        }

        txtAAccount.onblur = function () {
            this.className = "onblur-input";
        }

        txtVcode.onblur = function () {
            this.className = "onblur-input";
        }

        txtEAccount.onblur = function () {
            this.className = "onblur-input";
        }


    }

    //检验数据
    function checkLogin(ischeck) {
        var type = loginType.getAttribute("lType");

        var oRequireTips = document.querySelector(`.${type}-require`);
        var oMsginfo = document.querySelector(".msginfo");
        var regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
        var regmVode = /^[a-zA-Z0-9]$/;

        if (type == "m") {
            if (txtMAccount.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "48px";
                txtMAccount.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }

            if (txtmVcode.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "100px";
                txtmVcode.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }

            if (ischeck) {
                if (txtMsgVcode.value.length == 0) {
                    oRequireTips.style.display = "block";
                    oRequireTips.style.top = "152px";
                    txtMsgVcode.className = "onfocus-input";
                    TipsClearInput(oRequireTips);
                    return false;
                }
            }

            if (!regPhone.test(txtMAccount.value)) {
                oMsginfo.style.display = "block";
                oMsginfo.innerText = "手机号码格式不正确";
                TipsClearMsg(oMsginfo);
                return false;
            }

            if (regmVode.test(txtmVcode.value)) {
                oMsginfo.style.display = "block";
                oMsginfo.innerText = "图形验证码格式不正确";
                TipsClearMsg(oMsginfo);
                return false;
            }

            if (regmVode.test(txtMsgVcode.value)) {
                oMsginfo.style.display = "block";
                oMsginfo.innerText = "短信验证码格式不正确";
                TipsClearMsg(oMsginfo);
                return false;
            }
        }
        else if (type == "a") {
            if (txtAAccount.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "48px";
                txtAAccount.className = "onfocus-input";
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

            if (txtVcode.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "152px";
                txtVcode.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }

            if (!regPhone.test(txtAAccount.value)) {
                oMsginfo.style.display = "block";
                oMsginfo.innerText = "手机号码格式不正确";
                TipsClearMsg(oMsginfo);
                return false;
            }

            if (regmVode.test(txtVcode.value)) {
                oMsginfo.style.display = "block";
                oMsginfo.innerText = "图形验证码格式不正确";
                TipsClearMsg(oMsginfo);
                return false;
            }
        }
        else if (type == "e") {
            if (txtEAccount.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "48px";
                txtEAccount.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }

            if (txtEPwd.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "100px";
                txtEPwd.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }

            if (txtEVcode.value.length == 0) {
                oRequireTips.style.display = "block";
                oRequireTips.style.top = "152px";
                txtEVcode.className = "onfocus-input";
                TipsClearInput(oRequireTips);
                return false;
            }

        }

        return true;

    }

    //获取验证码
    function getCode() {
        var oGetMcode = document.querySelector("#getMcode");
        oGetMcode.onclick = function () {
            var num = 120;
            if (checkLogin(false)) {
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
        }, 2000);
    }

    return {
        init: init,
        tab: tab,
        getCode:getCode,
        inputBlur:inputBlur
    }
});