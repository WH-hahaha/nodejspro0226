$("#addGood .nav li" ).click(function(){
	$(this).addClass("current").siblings().removeClass("current");
	$(".follow>div").eq($(this).index()).css("display","block").siblings().css("display","none");
})
var putaway = true;
var boutique = false;
var goods_new = false;
var goods_hot = false;
$("#putaway").click(function(){
	if(putaway == true){
		putaway = false;
	}else{
		putaway = true ;
	}
})

$("#boutique").click(function(){
	if(boutique == true){
		boutique = false;
	}else{
		boutique = true ;
	}
	
})
$("#goods_new").click(function(){
	if(goods_new == true){
		goods_new = false;
	}else{
		goods_new = true ;
	}
})
$("#goods_hot").click(function(){
	if(goods_hot == true){
		goods_hot = false;
	}else{
		goods_hot = true ;
	}
})
$("#addpro").click(function(){
	upload();
	
})
$("#reset").click(function(){
	if(confirm("是否清楚已经填写的数据")){
		$("input[type='text']").val("");
	}
})
//添加商品
function upload() {
	var form = new FormData(); // FormData是H5新特性
	form.append("goods_name", document.getElementById("goodname").value);
	form.append("goods_Number", document.getElementById("goodCode").value);
	form.append("putaway", putaway);
	form.append("boutique", boutique);
	form.append("goods_new", goods_new);
	form.append("goods_hot", goods_hot);
	form.append("price",document.getElementById("good-price").value || 0);
	form.append("imgPath", document.getElementById("goods_img").files[0] || " ");
	form.append("repertory",document.getElementById("repertory").value || 0);
	form.append("virtualsale",document.getElementById("virtualsale").value || 0);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/goods_upload");
	xhr.send(form);
	xhr.onreadystatechange = function(res){
		if (xhr.readyState==4 && xhr.status==200) {
			console.log(xhr.responseText);
			var res = JSON.parse(xhr.responseText);
			alert(res.message);
			location.href = "/goodslist";
		}
	}
	
}
$(".head b").click(function(){
	location.href = "/goodslist";
})