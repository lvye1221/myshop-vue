var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../model/goods');

// 连接数据库
// mongoose.connect("mongodb://127.0.0.1:27017/shop");
// mongoose.connect('mongodb://120.27.245.209:27019/shop');
// mongoose.connect('mongodb://67.216.223.7:27017/shop');
mongoose.connect("mongodb://127.0.0.1:27018/shop");


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



/*
 * @brief 添加到购物车接口
 */
router.post('/addCart', function(req, res, next) {
	// 用户id
	var userId = '100000077';
	// 产品ID
	var productId = req.body.productId;

	var User = require('../model/user');

	User.findOne({userId: userId}, function(err,userDoc){
		// console.log(userDoc);
		// 当添加商品的时候，先去数据库里面查询一下，这个商品是否存在，
		// 如果存在，就让它的productNum 加1，如果不存在，就添加这个商品。

		var goodItem = '';
		// 先去数据库里面查询一下
		userDoc.cartList.forEach(function(item){
		  // 如果购物车里面的id 和现在要添加的商品id一样就让它productNum 加1
		  if(item.productId == productId) {
			// 此时把相同的产品赋值一个变量
			goodItem = item;
			item.productNum ++;
		  }
		})

		if(goodItem){
		  // 说明你购物车里面存在这个商品
		  userDoc.save(function(err3,doc3){
			if(err3){
			  res.json({
				status:"1",
				msg:err.message
			  })
			}else{
			  res.json({
				status:"0",
				result:"商品数量添加成功！"
			  })
			}
		  });
		}else{
		  // 此时的逻辑是当商品第一次添加到购物车里面

		  // 通过productId查询出一条商品，然后把这一条商品，存入到user的cartList里面。
			Goods.findOne({productId:productId},function(err1,goodsDoc){
			  // 添加相同的商品，商品只添加一次，数量加1
				goodsDoc.productNum = 1;
                goodsDoc.checked = 1;

				userDoc.cartList.push(goodsDoc);
				userDoc.save(function(err2,doc2){
				  if(err2){
					res.json({
					  status:"1",
					  msg:err.message
					})
				  }else{
					res.json({
					  status:0,
					  msg:'',
					  result:"此商品第一次加入购物车！"
					})
				  }
				})
			})

		  }
	  })
});




module.exports = router;
