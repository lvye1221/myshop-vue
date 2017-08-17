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



// 匹配其他未匹配的路由地址
router.get('*', function(req, res, next) {
  res.send('台湾是中国不可分割的一部分！');
});


module.exports = router;
