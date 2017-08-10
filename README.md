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


```
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    // loading:'/static/loading/loading-spinning-bubbles.svg'
    loading:'/static/img/ok-2.png'
});

```


# step4-database #

数据库的安装


## 服务器测试 ##

```
npm install express-generator -g

express server

cd server
cnpm i

// 启动方式

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
slave=true #声明从
source=192.168.0.4:27018 #规定从属于哪个ip  注意：ip是主服务器的  最好用内网ip
# bind_ip=127.0.0.1,192.168.0.4 #允许的地址 为了安全
nohttpinterface=true #禁止http访问
```

```

cd C:\project\myshop-vue\data

```


## 数据库操作 ##

mongoosee




## JSON-插件 ##

JSON-handle

