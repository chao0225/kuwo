//read a cookie
function getCookie(cookieName){
    var arg = cookieName + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    //alert(document.cookie);
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            var endstr = document.cookie.indexOf(";", j);
            if (endstr == -1) {
                endstr = document.cookie.length;
            }
            var ret = unescape(document.cookie.substring(j, endstr));
            if (ret != "") {
                return ret;
            }
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) 
            break;
    }
    return "";
}

//delete a cookie
function delCookie(cookieName){
    var exp = new Date();
    exp.setTime(exp.getTime() - 100);
    document.cookie = cookieName + "=; path=/; domain=kuwo.cn; expires=" + exp.toGMTString();
    document.cookie = cookieName + "=; path=/; expires=" + exp.toGMTString();
    //alert(exp.toGMTString());
    //alert("after del : " + document.cookie);
}

//add a cookie
function addCookie(cookieName, cookieValue){
    var expdate = new Date();
    var argv = addCookie.arguments;
    var argc = addCookie.arguments.length;
    var expires = (argc > 2 && argv[2] != 0) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    if (expires != null) {
        expdate.setTime(expdate.getTime() + (expires * 1000));
    }
    //set the domain!
    //domain = "http://js.kuwo.cn/kuwo.cn";
    //domain = null;
    document.cookie = cookieName + "=" + escape(cookieValue) +
    ((expires == null) ? "" : ("; expires=" + expdate.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
    //alert(expdate.toGMTString());
    //alert(path);
    //alert(domain);
    //alert("after add : " + document.cookie);
}

function isLogin(){
    if (getCookie('userid') == null || getCookie('userid') == '') {
        return false;
    }
    return true;
}

function isHost(uid){
    if (uid == getCookie('userid')) {
        return true;
    }
    return false;
}

function isMlogActivated(uid){
    if (uid == getCookie('userid') && getCookie('mlogdomain') != null && getCookie('mlogdomain') != '') {
        return true;
    }
    return false;
}

function checkInterval(cookieName, operation, time){
    var cookieValue = getCookie(cookieName);
    var curTime = new Date();
    if (cookieValue == '') {
        var cookieValue = curTime.getTime();
        addCookie(cookieName, cookieValue, 3600, '/', 'http://js.kuwo.cn/kuwo.cn');//1 hour
    }
    else 
        if (curTime.getTime() - cookieValue < time) {
            if (time < 60000) {
                inf('\u5BF9\u4E0D\u8D77\uFF0C\u4E24\u6B21' + operation + '\u5FC5\u987B\u95F4\u9694' + (time / 1000) + '\u79D2\u4EE5\u4E0A');
            }
            else {
                inf('\u5BF9\u4E0D\u8D77\uFF0C\u4E24\u6B21' + operation + '\u5FC5\u987B\u95F4\u9694' + (time / 60000) + '\u5206\u949F\u4EE5\u4E0A');
            }
            return false;
        }
    addCookie(cookieName, curTime.getTime(), 3600, '/', 'http://js.kuwo.cn/kuwo.cn');//1 hour
    return true;
}

/*
xiyun
logout user session
*/
function logoutSession(url){
	window.location.href='http://i.kuwo.cn/US/st/Logout?returnUrl=' + encodeURIComponent(url);
return false;
//	delCookie('userid');
//	delCookie('username');
//	delCookie('mlogdomain');
//	delCookie('uph');
//	delCookie('sid');
}
/*
xiyun
update user lastaccesstime
*/
function updateSession(){
	if(getCookie('userid')!='' && getCookie('sid')!='') {
		var ss = new Image();
		ss.src="http://i.kuwo.cn/US/st/UpdateAccessTime?t="+Math.random();
	} else {
		delCookie('userid');
		delCookie('username');
		delCookie('uph');
		delCookie('sid');
		delCookie('mlogdomain');
	}
}

function genHead(path, src){
				var uname = getCookie("username");
				var userid= getCookie("userid")
				//if(uname != "" && userid !='' ){
				//	document.write('<p class="left t_blue_12">\u60A8\u597D\uFF01 <a href="http://i.kuwo.cn/" class="l_blue_12 font_b">'+uname+'</a> <a href="#" class="l_blue_12" onclick="javascript:logoutSession(window.location.href);">[\u9000\u51FA]</a></p>');
				//}
				document.write('<div id="head_loginUserInfo" class="left"></div>');
				if(uname != ""  && userid !=''){
					postDataToUrl('head_loginUserInfo', path+'/st/HeadLoginUserInfo', '');
				} else {
					document.getElementById('head_loginUserInfo').innerHTML='<p class="left t_blue_12"><a id="login_button" href="#" class="l_blue_12" >\u767B\u5F55</a><span>&#149;</span><a href="http://i.kuwo.cn/US/reg.htm?src='+src+'" class="l_blue_12">\u6CE8\u518C</a></p>';
				}
}
updateSession();
