$(function(){

    function menuTab(menu,wrap,cwrap) {
        $(menu).on("click", function(){
            console.log("======")
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(wrap).eq(index).addClass("active").siblings(cwrap).removeClass("active");
        })
    }

    menuTab(".menuTab span",".loginForm ul","ul");//登录

})