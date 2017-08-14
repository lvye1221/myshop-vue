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
	
    var page = req.param("page"); //第几页
    var pageSize = req.param("pageSize"); //每页有多少条数据
	pageSize = parseInt(pageSize); // 转换成整数
	var skip = (page-1) * pageSize; // 需要跳过多少条


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
	// var goodModel = Goods.find(param);

	var goodModel = Goods.find(param).limit(pageSize).skip(skip);

	// 跳过多少条，限制为当前分页页面条数
	// var goodModel = Goods.find(param).limit(pageSize).skip(skip);

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
