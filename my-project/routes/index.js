var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login4ajax', function(req, res, next) {
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		code: 1,
		message: "登录成功"
	};
	// console.log(username,psw)
	UserModel.find({username: username, psw: psw}, (err, docs)=>{
		if(docs.length == 0) {
			result.code = -101;
			result.message = "您的账号或密码错误。请重新登录。"
		} else {
			// 登录成功的时候，生成session
			// req.session.username = username;
			
		}
		res.json(result);
	})
})

router.get('/', function(req, res, next) {
  //判断用户是否登录，如果没登录跳转到login页面。
	if(req.session == null || req.session.username == null) {
		res.redirect("/login"); // 重定向
		return;
	}
  res.render('index');
});

//货物清单
router.get('/goodslist', function(req, res, next) {
  res.render('goodslist', {});
  
});



//添加商品
router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', {});
});

router.post('/api/goods_upload', function(req, res, next) {
	var form = new multiparty.Form({
		uploadDir: "public/images"
	});
	var result = {
		code: 1,
		message: "商品信息保存成功"
	};
	GoodsModel.count({}, function(err, count){
		form.parse(req, function(err, body, files){
			if(err) {
				console.log(err);
			}
			var goods_Id =100 + count;
			var goods_name = body.goods_name[0];
			var price = body.price[0];
			var imgPath =" ";
			var goods_Number = body.goods_Number[0] || goods_Id;
			var putaway = body.putaway[0];
			var boutique = body.boutique[0];
			var goods_new = body.goods_new[0];
			var goods_hot = body.goods_hot[0];
			var repertory = body.repertory[0];
			var virtualsale = body.virtualsale[0];

			var gm = new GoodsModel();
			gm.goods_name = goods_name;
			gm.price = price;
			gm.imgPath = imgPath;
			gm.goods_Id = goods_Id;
			gm.goods_Number =goods_Number;
			gm.putaway = putaway ;
			gm.boutique = boutique;
			gm.goods_new = goods_new ;
			gm.goods_hot = goods_hot; 
			gm.goods_sort =100;
			gm.repertory = repertory ;
			gm.virtualsale =virtualsale;
			gm.indate = 1 ;
			gm.save(function(err){
				if(err) {
					result.code = -99;
					result.message = "商品保存失败";
				}
				res.json(result);
			})
		})
			
	})
		
});

module.exports = router;
