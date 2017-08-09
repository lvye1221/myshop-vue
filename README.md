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
