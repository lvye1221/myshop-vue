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

	var sort = req.param("sort");
	var priceLevel = req.param("priceLevel");
	var param = {};

	if (priceLevel == '') {
		priceLevel = 'all';
	}

	if (priceLevel != 'all') {
		var priceGt = '';
		var priceLte = '';

		switch (priceLevel) {
			case '0': priceGt = 0; priceLte = 100;break;
			case '1': priceGt = 100; priceLte = 500;break;
			case '2': priceGt = 500; priceLte = 1000;break;
			case '3': priceGt = 1000; priceLte = 5000;break;
		}

		param = {
		  salePrice:{
			$gt:priceGt,
			$lte:priceLte,
		  }
		}
	}

	// 获取数据
	var goodModel = Goods.find(param);
	// 按照价格排序
	goodModel.sort({'salePrice':sort})

	// 执行命令
	goodModel.exec({},function(err, docs) {
	  console.log(docs);
	  res.json({
		status:'0',
		result:docs
	  });
	});


    // 获取数据
	/*
	var result = Goods.find({}, function(err, goods) {
	
		// 返回JSON数据
		res.json({
			status: 0,
			result: goods
		});
	});
	//*/
});



module.exports = router;
