var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../model/Goods');

// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/shop");


// 连接成功的时候调用
mongoose.connection.on("connected", function() {
	console.log("connected success");
});


// 连接出错的时候调用
mongoose.connection.on("error", function() {
	console.log("connected error");
});


// 连接断开的时候调用
mongoose.connection.on("disconnected", function() {
	console.log("connected disconnected");
});


// 获取商品的列表
router.get('/list', function(req, res, next) {
	var result = Goods.find({}, function(err, goods) {
	
		console.log(goods);

		res.json(goods);
	});

});



module.exports = router;
