var express = require('express');
var router = express.Router();

// 导入用户模块
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 用户登录接口
router.post('/login',function(req,res,next){
  // 接收的参数
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  // 把用户名，去数据库查询，看看是否存在
  User.findOne(param,function(err,doc){
    if(err){

      res.json({
        status:'1',
        msg:'用户名或密码错误'
      });

	  return ;

    }

      if(doc){

		  res.cookie('userId',doc.userId,{
			path:'/',
			maxAge:1000*60*60
		  });

		  res.cookie('userName',doc.userName,{
			path:'/',
			maxAge:1000*60*60
		  });

		// 找到用户了，直接返回数据
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        })

		return ;
      }

		
	  res.json({
	    status:'2',
	    msg:'未知错误',
	    result:null
	  });

  });

  
});


// 退出接口
router.post('/logout',function(req,res,next){
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:'0',
    msg:'',
    result:'退出成功',
  })
});



// 判断当前用户是否登录
router.get("/checkLogin",function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
})


// 查询购物车列表
router.get("/cartList",function(req,res,next){
  let userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})

// 购物车数量操作
router.post('/cartEdit',function(req,res,next){
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;

  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum" : productNum,
    "cartList.$.checked" : checked,
  },function(err,doc){
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else{
        res.json({
          status:'0',
          msg:'',
          result:'商品更新成功'
        })
      }
  })
})

router.post("/cartDel",function(req,res,next){
  var userId = req.cookies.userId,productId = req.body.productId;
  console.log(userId,productId)
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },function(err,doc){
    if(err){
      res.json({status:'1',msg:err.message,result:''})
    }else{
      res.json({status:'0',msg:'',result:'商品删除成功'})
    }
  })
})

// 全选的接口
router.post('/editCheckAll',function(req,res,next){
  let userId = req.cookies.userId,
      checkAll = req.body.checkAll ? '1': '0';
      
      User.findOne({'userId':userId},function(err,user){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          user.cartList.forEach((item) => {
            item.checked = checkAll;
          })
          user.save(function(err1,doc){
            if(err1){ 
              res.json({status:'1',msg:err.message,result:''});
            }else{
              res.json({status:'0',msg:'',result:'操作成功'});
            }
          })
        }
      })
})

// 匹配其他未匹配的路由地址
router.get('*', function(req, res, next) {
  res.send('台湾是中国不可分割的一部分！');
});


module.exports = router;
