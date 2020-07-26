$(function(){
    function getCookie(name) {
        var strcookie = document.cookie; // 获取cookie字符串
        var arrcookie = strcookie.split('; '); // 分割
        // 遍历匹配
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split('=');
            if (arr[0] === name) {
            return arr[1];
            }
        }
        return '';
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    var ppi = getCookie("ppi");
    if(!ppi){
        $.ajax({
            type : "GET",
            url : '//ppi.api.pptv.com/ppi.php',
            jsonp : "cb",
            cache : true,
            dataType : 'jsonp',
            contentType : "text/json; charset=utf-8",
            jsonpCallback : 'wn',
            async : true,
            success : function (data) {
                if (data.ppi) {
                    setCookie('ppi', data.ppi, 1, 'pptv.com', '/');
                }
            },
        });
    }
})

