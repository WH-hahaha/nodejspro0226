var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");


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
// router.get('/', function(req, res, next) {
//   //判断用户是否登录，如果没登录跳转到login页面。
// 	if(req.session == null || req.session.username == null) {
// 		res.redirect("/login"); // 重定向
// 		return;
// 	}
//   res.render('store');
// });



module.exports = router;
