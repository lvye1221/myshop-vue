# myshop-vue

电商网站项目展示

# 新建项目 #

```
// 初始化项目
vue init webpack vuex-demo

// 进入项目目录
cd vuex-demo

// 安装依赖
cnpm i

// 安装项目依赖
cnpm i -S vuex

```

# step2-mock #

模拟数据


## json文件 ##

在当前目录新建
mock/goods.json

```
{
  "status": "0",
  "result": [
    {
      "productId": "1001",
      "productName": "小米6",
      "productPrice": "2499",
      "productImg": "mi6.jpg"
    },
...
```



## 服务器定义接口 ##

build/dev-server.js

找到如下位置，在之后添加接口代码：
```
var app = express()
var compiler = webpack(webpackConfig)




// 在这里来定义接口
var persons = require("../mock/goods.json");

app.get("/persons", function(req, res) {
	res.json(persons);	
});


```


## 访问地址 ##

```
http://localhost:8080/persons
```

可以看到返回的 json 数据



# step3-page-display #

页面的显示


安装依赖
```
cnpm i -S axios
cnpm i -S vue-axios
```

## ajax 请求数据 ##

```
npm i axios -D

import axios from 'axios'

axios.get("/goods").then((result) => {
    let res = result.data.result;
    console.log(result);
    this.GoodsList = res;
})


```

## 图片的懒加载 ##

安装依赖项：
```
cnpm i -S vue-lazyload


图片正常加载与懒加载之间的代码对比
```
// 正常通过途径来显示
<a href="#"><img  v-bind:src="'/static/img/' + item.productImage" alt=""></a>

// 懒加载的方式实现  v-lazy
<a href="#"><img  v-lazy="'/static/img/' + item.productImage" alt=""></a>

```

在项目的 main.js 中来使用此方式

```
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    // loading:'/static/loading/loading-spinning-bubbles.svg'
    loading:'/static/img/ok-2.png'
});

```


# step4-database #

mongodb 数据库的安装


## 服务器的搭建 ##

采用 express 框架，通过工具 express-generator 的方式来创建

```
npm install express-generator -g

express server

cd server
cnpm i

// 启动方式，当然后期可以写在启动的脚本中
node bin/www

// 访问localhost:3000
```


## 启动数据库 ##

对于linux的电脑环境，可以通过这个文件 mongo.conf 来配置

```
port=27018 #指定端口
fork=true #后台运行
dbpath=/home/map/mongodb/mongo #规定数据库的位置
logpath=/home/map/mongodb/mlog/mongodb.log #规定数据库的日志文件
slave=true #声明主从关系
source=192.168.0.4:27018 #规定从属于哪个ip  注意：ip是主服务器的  最好用内网ip
# bind_ip=127.0.0.1,192.168.0.4 #允许的地址 为了安全
nohttpinterface=true #禁止http访问
```

对于 Windows 系列的电脑，需要通过安装服务的方式来实现，大概思路是将 命令及其选项 安装称 服务，设置成自动启动即可

```

```

## 数据库操作 ##

mongoosee


## JSON-插件 ##

chrome 插件

JSON-handle


## 跨域的问题解决 ##

config/index.js


```
proxyTable: {
    // 代表请求某个数据时，就自动转发服务器
    '/goods': {
	    target: 'http://localhost:3000'
	},
    // * 代表当前接口中的所有数据
    '/goods/*': {
	    target: 'http://localhost:3000'
	}
}

```



## 排序实现 ##

请求数据

### 思路1： 通过修改服务器的排序方式来实现 ###

```
// 获取从客户端传的数据
let sort = req.param("sort");




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

```

### 思路2： 通过前端代码来实现 ###


## 自动启动服务器 ##

```
// 使用方式
npm install supervisor -g

// 使用方式
supervisor bin/www

// 直接替代node
```



# step5-dev-tools #

工具的使用

