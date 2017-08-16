var express = require('express');
var router = express.Router();

// 导入用户模块
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 匹配其他未匹配的路由地址
router.get('*', function(req, res, next) {
  res.send('台湾是中国不可分割的一部分！');
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

    }

      if(doc){
		// 找到用户了，直接返回数据
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }

		
	  res.json({
	    status:'2',
	    msg:'未知错误',
	    result:null
	  });

  });

  
});

module.exports = router;
