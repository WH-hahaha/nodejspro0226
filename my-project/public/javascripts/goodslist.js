

function loadpro(keywords,page,cont){
	$.ajax({
		type:"get",
		url:"/loadpro",
		data:{
			keywords:keywords,//商品名
			pageNO:page, //页数
			perPageCnt:cont  //每页显示数
		},
		success:function(res){
			//console.log(res);
			if(res.total == 0){
				$(".list").css("display","none");
				$(".hidden").css("display","table-row");
			}else{
				$(".list").css("display","table-row-group");
				$(".hidden").css("display","none");
			}
			$("#totalRecords").html(res.total);
			var totalPages = Math.ceil(res.total/$("#pageSize").val());
			var opt = "";
			for(var i = 0; i<totalPages;i++){
				 opt += '<option value="'+(i+1)+'">'+(i+1)+'</option>';
			}
			$("#gotoPage").html(opt);
			
			$("#totalPages").html(totalPages);
			$("#pageCurrent").html(res.pageNO);
			$("#gotoPage").val(res.pageNO);
			var str ="";
			for(var i in res.data){
				var goods_Id =res.data[i].goods_Id;
				var goods_name =res.data[i].goods_name ;
				var price = res.data[i].price;
				var imgPath =res.data[i].imgPath;
			  	var goods_Number = res.data[i].goods_Number;
				var putaway = res.data[i].putaway;
				var boutique = res.data[i].boutique;
				var goods_new = res.data[i].goods_new;
				var goods_hot = res.data[i].goods_hot;
				var goods_sort = res.data[i].goods_sort;
				var repertory = res.data[i].repertory;
				var virtualsale = res.data[i].virtualsale;
				var img1 = '<img src="/images/yes.gif">';
				var img2 = '<img src="/images/yes.gif">';
				var img3 = '<img src="/images/yes.gif">';
				var img4 = '<img src="/images/yes.gif">';
				if(!putaway){
					img1 = '<img src="/images/no.gif">'
				}
				if(!boutique){
					img2 = '<img src="/images/no.gif">'
				}
				if(!goods_new){
					img3 = '<img src="/images/no.gif">'
				}
				if(!goods_hot){
					img4 = '<img src="/images/no.gif">'
				}
				 str += `<tr>
						<td><input type="checkbox" name="checkboxes[]" value="155"><span>${goods_Id}</span></td>
						<td ><span title="点击修改内容">${goods_name}</span></td>
						<td ><span >${goods_Number}</span></td>
						<td ><span  title="点击修改内容" >${price}</span></td>
						<td putaway="${putaway}">${img1}</td>
						<td boutique="${boutique}">${img2}</td>
						<td goods_new="${goods_new}">${img3}</td>
						<td goods_new="${goods_hot}">${img4}</td>
						<td ><span>${goods_sort}</span></td>
						<td ><span>${repertory}</span></td>
						<td ><span>${virtualsale}</span></td>
						<td>
						  <a href="javascript:;" title="查看" ><img src="/images/bg17.gif" ></a>
						  <a href="javascript:;" title="编辑"><img src="/images/bg14.gif" ></a>
						  <a href="javascript:;" title="复制"><img src="/images/bg13.gif" ></a>
						  <a class="update" href="javascript:;" title="回收站" goodId ="${goods_Id}" onclick="update(${goods_Id})"><img src="/images/bg16.gif"></a>
						</td>
					</tr>`
				
			}
			$(".list").html(str);
		}
	})
}
loadpro();
$(".head b").click(function(){
	window.location = "/addgood";
})
$("#btn").click(function(){
	var keywords = $("#keyword").val();
	loadpro(keywords);
})
$("#pageSize").keypress(function(e){
	if(e.which ==13){
		var keywords = $("#keyword").val();
		var page = $("#pageCurrent").html();
		var cont = $("#pageSize").val();
		$("#pageSize").val(cont);
		loadpro(keywords,page,cont);
	}
})
$("#firstPage").click(function(){
	var keywords = $("#keyword").val();
	var page = 1;
	var cont = $("#pageSize").val();
	loadpro(keywords,page,cont);
})
$("#upPage").click(function(){
	var keywords = $("#keyword").val();
	var page = parseInt($("#pageCurrent").html())- 1 ;
	if(page < 1){
		page =1 ;
	}
	var cont = $("#pageSize").val();
	loadpro(keywords,page,cont);
})
$("#downPage").click(function(){
	var keywords = $("#keyword").val();
	var page = parseInt($("#pageCurrent").html())+ 1 ;
	if(page > $("#totalPages").html()){
		page = $("#totalPages").html();
	}
	var cont = $("#pageSize").val();
	loadpro(keywords,page,cont);
})
$("#endPage").click(function(){
	var keywords = $("#keyword").val();
	var page = $("#totalPages").html();
	var cont = $("#pageSize").val();
	loadpro(keywords,page,cont);
})
$("#gotoPage").change(function(){
	var keywords = $("#keyword").val();
	var page = $(this).val();
	
	var cont = $("#pageSize").val();
	loadpro(keywords,page,cont);
})
function update(goods_Id){
	
	if(confirm("确定删除这件商品吗")){
		$.ajax({
			type:"get",
			url:"/update",
			data:{
			goods_Id:goods_Id
			},
			success:function(res){
				alert(res);
				loadpro();
			}
		})
	}
}
//$(".list").delegate("","click",function(){
//	var text =this.innerHTML;
//})
