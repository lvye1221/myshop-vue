# myshop-vue

������վ��Ŀչʾ

# �½���Ŀ #

```
// ��ʼ����Ŀ
vue init webpack vuex-demo

// ������ĿĿ¼
cd vuex-demo

// ��װ����
cnpm i

// ��װ��Ŀ����
cnpm i -S vuex

```

# step2-mock #

ģ������


## json�ļ� ##

�ڵ�ǰĿ¼�½�
mock/goods.json

```
{
  "status": "0",
  "result": [
    {
      "productId": "1001",
      "productName": "С��6",
      "productPrice": "2499",
      "productImg": "mi6.jpg"
    },
...
```



## ����������ӿ� ##

build/dev-server.js

�ҵ�����λ�ã���֮����ӽӿڴ��룺
```
var app = express()
var compiler = webpack(webpackConfig)




// ������������ӿ�
var persons = require("../mock/goods.json");

app.get("/persons", function(req, res) {
	res.json(persons);	
});


```


## ���ʵ�ַ ##

```
http://localhost:8080/persons
```

���Կ������ص� json ����



# step3-page-display #

ҳ�����ʾ


��װ����
```
cnpm i -S axios
cnpm i -S vue-axios
```

## ajax �������� ##

```
npm i axios -D

import axios from 'axios'

axios.get("/goods").then((result) => {
    let res = result.data.result;
    console.log(result);
    this.GoodsList = res;
})


```

## ͼƬ�������� ##


```
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    // loading:'/static/loading/loading-spinning-bubbles.svg'
    loading:'/static/img/ok-2.png'
});

```


# step4-database #

���ݿ�İ�װ


## ���������� ##

```
npm install express-generator -g

express server

cd server
cnpm i

// ������ʽ

node bin/www

// ����localhost:3000
```


## �������ݿ� ##

����linux�ĵ��Ի���������ͨ������ļ� mongo.conf ������

```
port=27018 #ָ���˿�
fork=true #��̨����
dbpath=/home/map/mongodb/mongo #�涨���ݿ��λ��
logpath=/home/map/mongodb/mlog/mongodb.log #�涨���ݿ����־�ļ�
slave=true #������
source=192.168.0.4:27018 #�涨�������ĸ�ip  ע�⣺ip������������  ���������ip
# bind_ip=127.0.0.1,192.168.0.4 #����ĵ�ַ Ϊ�˰�ȫ
nohttpinterface=true #��ֹhttp����
```

```

cd C:\project\myshop-vue\data

```


## ���ݿ���� ##

mongoosee




## JSON-��� ##

JSON-handle

