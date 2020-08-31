    var $o = new Object();
    $o.base = {
    e:function(a,f){
    for(var i=0,j=a.length;i<j;i++){f.call(a[i],i);}
    }
    }
    $o. slide = function (id,arg){
    var arg = arg||{},
    t = document.getElementById(id),
    a = t.getElementsByTagName("a"),
    lis = [],
    cl = arg.color||'#ccc',
    ctm = arg.time*1000||8000,
    w = t.clientWidth,
    h = t.clientHeight,
    b = ['<ul style="margin:0; padding:0; list-style:none; display:block; position:absolute; bottom:6px; right:10px;">'],
    index = 0,
    $$ = null,
    $ = null;
    function change(i){
    if(!!$$){clearTimeout($$);}
    index = !isNaN(i)?i:index+1;
    if(index >= a.length){index = 0;}
    $o.base.e(lis,function(k){if(k == index){c(1,this);}else{c(0,this)}});
    var to = - index*h;
    if(a[0].offsetTop == to){
    return;
    }else{
    if(!!$){clearInterval($);}
    $ = setInterval(function(){
    var ot = a[0].offsetTop;
    v = Math[to<ot?'floor':'ceil']((to - ot)*0.2);
    if(ot == to){clearInterval($);$=null;st();}
    ot += v;
    a[0].style.marginTop = ot + "px";
    },30)
    };
    }
    function c(b,o){
    o.style.backgroundColor = !!b?cl:"#fff";//默认背景
    o.style.color = !!b?"#333":"#333";//字体颜色
    }
    function st(){
    if(!!$$)clearTimeout($$);
    $$ = setTimeout(function(){change()},ctm);
    }
    with(t.style){overflow = 'hidden';position = 'relative';}
    $o.base.e(a,function(n){
    this.style.display = "block";
	
	var isIE=!!window.ActiveXObject;
	var isIE6=isIE&&!window.XMLHttpRequest;
	
	if(isIE6){
		h=148;
	}
	
    with(this.firstChild.style){borderWidth = '0';width = w + 'px';height = h + 'px';}
    b.push('<li style="width:17px; height:17px; line-height:17px; display:block; float:left; margin-left:5px; ' + cl + '; background-color:#fff; color:#333; ' + cl +'; font-size:11px; text-align:center; cursor:pointer;">' + (n+1) + '</li>');
    });
    b.push('</ul>');
    t.innerHTML += b.join("");
    lis = t.getElementsByTagName("li");
    $o.base.e(lis,function(n){
    if(n == index){c(1,this)}
    this.onmouseover = function(){
    if(n!=index)change(n);
    }
    });
    st();
    }
