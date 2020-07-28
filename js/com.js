window.HOSTname = "http://"+window.location.host;

$(function(){
    $(".left_wrap li").on("click", function(e){
        e.stopPropagation();
        $(this).addClass("active").siblings("li").removeClass("active");
    })

    $(".udon").on("click", "span", function(){
        $(".udon").hide();
    })
})