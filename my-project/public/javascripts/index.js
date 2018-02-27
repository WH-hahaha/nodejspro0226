$("#left-div>ul>li").click(function(){
	$(this).parent().toggleClass("current");
	$(this).parent().siblings().removeClass("current");
});