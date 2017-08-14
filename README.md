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

��װ�����
```
cnpm i -S vue-lazyload


ͼƬ����������������֮��Ĵ���Ա�
```
// ����ͨ��;������ʾ
<a href="#"><img  v-bind:src="'/static/img/' + item.productImage" alt=""></a>

// �����صķ�ʽʵ��  v-lazy
<a href="#"><img  v-lazy="'/static/img/' + item.productImage" alt=""></a>

```

����Ŀ�� main.js ����ʹ�ô˷�ʽ

```
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    // loading:'/static/loading/loading-spinning-bubbles.svg'
    loading:'/static/img/ok-2.png'
});

```


# step4-database #

mongodb ���ݿ�İ�װ


## �������Ĵ ##

���� express ��ܣ�ͨ������ express-generator �ķ�ʽ������

```
npm install express-generator -g

express server

cd server
cnpm i

// ������ʽ����Ȼ���ڿ���д�������Ľű���
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
slave=true #�������ӹ�ϵ
source=192.168.0.4:27018 #�涨�������ĸ�ip  ע�⣺ip������������  ���������ip
# bind_ip=127.0.0.1,192.168.0.4 #����ĵ�ַ Ϊ�˰�ȫ
nohttpinterface=true #��ֹhttp����
```

���� Windows ϵ�еĵ��ԣ���Ҫͨ����װ����ķ�ʽ��ʵ�֣����˼·�ǽ� �����ѡ�� ��װ�� �������ó��Զ���������

```

```

## ���ݿ���� ##

mongoosee


## JSON-��� ##

chrome ���

JSON-handle


## ����������� ##

config/index.js


```
proxyTable: {
    // ��������ĳ������ʱ�����Զ�ת��������
    '/goods': {
	    target: 'http://localhost:3000'
	},
    // * ����ǰ�ӿ��е���������
    '/goods/*': {
	    target: 'http://localhost:3000'
	}
}

```



## ����ʵ�� ##

��������

### ˼·1�� ͨ���޸ķ�����������ʽ��ʵ�� ###

```
// ��ȡ�ӿͻ��˴�������
let sort = req.param("sort");




// ��ȡ����
var goodModel = Goods.find(param);
// ���ռ۸�����
goodModel.sort({'salePrice':sort})

// ִ������
goodModel.exec({},function(err, docs) {
  console.log(docs);
  res.json({
	status:'0',
	result:docs
  });
});

```

### ˼·2�� ͨ��ǰ�˴�����ʵ�� ###


## �Զ����������� ##

```
// ʹ�÷�ʽ
npm install supervisor -g

// ʹ�÷�ʽ
supervisor bin/www

// ֱ�����node
```



# step5-dev-tools #

���ߵ�ʹ��

