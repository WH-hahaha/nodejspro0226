
$("#left>ul>li>a").click(function(){
	$(this).parent().toggleClass("current");
	$(this).parent().siblings().removeClass("current");
});
