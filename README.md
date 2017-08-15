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

## ��ҳ���ܵ�ʵ�� ##


��ȡ����ҳ�Ĳ���
```
var page = req.param("page"); //�ڼ�ҳ

var pageSize = req.param("pageSize"); //ÿҳ�ж���������
pageSize = parseInt(pageSize); // ת��������

var skip = (page-1) * pagesize; // ��Ҫ����������




// ע�� pageSize Ҫ���� ���� ����
var goodModel = Goods.find(param).limit(pageSize).skip(skip);

```


## ����ˢ�¿ؼ� ##




main.js

```
// ȫ��ע��������
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)





<!-- ���ڼ�����ʾ��
v-infinite-scroll ���� һ������Ӧ�ľ��룬���Զ����� loadMore ����
infinite-scroll-disabled true������ô˿ؼ�
infinite-scroll-distance ������پ��봥���˿ؼ�
-->
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
  ���ڼ��� ...
</div>




loadMore() {

    // ���Ƚ�ֹ����ˢ��
    this.busy = true;

    // �ӳټ���
    setTimeout(() => {
      this.page ++;
      this.getGoodsList();
    }, 500);
}




// ��ȡ��Ʒ�б�
getGoodsList() {
    let param = {
      sort:this.sortFlag ? 1 : -1,
      priceLevel: this.priceChecked, 
      page: this.page, 
      pageSize: this.pageSize
    }

  	axios.get('/goods/list', {params:param}).then((res) => {
  	  let result = res.data.result;
  	  
  // �Ƿ��һ�μ���
  if (this.isFirstLoad) {
     this.GoodsList = result;
     this.isFirstLoad = false;

     // ���¼�������ؼ�
     this.busy = false;
     return ;
  }

  console.log("this.isFirstLoad: " + this.isFirstLoad); 

  if (result && result.length == 0) {
    // û�������ˣ�ֱ�ӽ���
    this.busy = true; 

  } else {
    console.log(this.GoodsList);
  	    this.GoodsList = this.GoodsList.concat(result);

    // ���¼�������ؼ�
    this.busy = false;
  }
})


```

��װ����
```
cnpm i -S vue-infinite-scroll
```


# step6-shopping-cart #

���ﳵ��Ŀ



## ˼· ##

  ������빺�ﳵ���ѵ���������Ʒ��id���뵽���ݿ⵱��

  ˭�����Ʒ������˭�ı�������
  ����������й�ϵ

    �����ͬ����Ʒ����Ʒֻ���һ�Σ�������1

    �������Ʒ��ʱ����ȥ���ݿ������ѯһ�£������Ʒ�Ƿ���ڣ�������ڣ���������productNum ��1����������ڣ�����������Ʒ��


## �޸����ݿ�ṹ ##


