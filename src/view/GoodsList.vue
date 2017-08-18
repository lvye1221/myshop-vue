<template>
  <div>
    <nav-bread>商品</nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default" :class="{'cur':sortOption == 0}">Default</a>
          <a href="javascript:void(0)" class="price" :class="{'cur':sortOption == 1}"  @click="sortGoods()" >Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)"  @click="setPriceFilter('all')" :class="{'cur':priceChecked == 'all'}">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                 <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">
		    {{price.startPrice}} - {{price.endPrice}}
		 </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in GoodsList">
                  <div class="pic">
                    <a href="#"><img  v-lazy="'/static/img/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">￥{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>

	    <!-- 正在加载提示框
		v-infinite-scroll 代表 一滚动对应的距离，就自动调用 loadMore 方法
		infinite-scroll-disabled true代表禁用此控件
		infinite-scroll-distance 代表多少距离触发此控件
	    -->
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" v-show="!busy">
              正在加载 ...
            </div>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 在未登录的情况下 -->
    <modal :mdShow="mdShow">
      <p slot="message">请先登录否则无法加入购物车</p>
      <div slot="btnGroup">
          <a href="javascript:;" class="btn-login" @click="mdShow = false">关闭</a>
      </div>
    </modal>


    <!-- 登录成功的情况下 -->

    <modal :mdShow="mdShowCart">
      <p slot="message">加入购物车成功</p>
      <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn-m"  to="/cart"> 查看购物车</router-link>
      </div>
    </modal>

  </div>



</template>

<script>
  import axios from 'axios'
  import NavBread from '@/components/NavBread.vue'
  import Modal from '@/components/Modal'

  export default {
    name: 'GoodsList',
    data () {
      return {
	// 是否第一次加载数据
        isFirstLoad: true, 
        GoodsList: Array,

	// 下拉刷新的选项
        busy: false, // 是否正在加载
        page: 1, // 当前第几列
        pageSize: 8,  // 一页的数据量

	// 是否显示对话框
        mdShow:false,
        mdShowCart:false,

	// 排序的选项
	sortOption: 0,
        sortFlag: true,
        priceChecked: 'all',
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'100.00'
          },
          {
            startPrice:'100.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'5000.00'
          },
        ]
      }
    },
    components: {
      NavBread,
      Modal
    },
    mounted: function() {
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表
      getGoodsList() {
        let param = {
          sort:this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked, 
          page: this.page, 
          pageSize: this.pageSize
        }

      	axios.get('/goods/list', {params:param}).then((res) => {
      	  let result = res.data.result;
      	  
	  // 是否第一次加载
	  if (this.isFirstLoad) {
	     this.GoodsList = result;
	     this.isFirstLoad = false;

	     // 重新激活滚动控件
	     this.busy = false;
	     return ;
	  }

	  console.log("this.isFirstLoad: " + this.isFirstLoad); 

	  if (result && result.length == 0) {
	    // 没有数据了，直接禁用
	    this.busy = true; 

	  } else {
	    console.log(this.GoodsList);
      	    this.GoodsList = this.GoodsList.concat(result);

	    // 重新激活滚动控件
	    this.busy = false;
	  }

      	})
      },
      sortGoods() {
	this.sortOption = 1;
        this.sortFlag = !this.sortFlag;
        this.getGoodsList();
      },
      setPriceFilter(index) {
        this.priceChecked = index;
        this.getGoodsList();
      },
      loadMore() {

	  // 首先禁止滚动刷新
          this.busy = true;

	  // 延迟加载
          setTimeout(() => {
            this.page ++;
            this.getGoodsList();
          }, 500);
      },
      //添加购物车
      addCart(productId){
        // 调用添加购物车的接口
        axios.post("/goods/addCart",{
          productId:productId
        }).then((res) => {
            var res = res.data;
            if(res.status == 0){
              // alert('加入购物车成功')
              this.mdShowCart=true;
            }else{
              // alert('加入购物车失败')
              this.mdShow = true;
            }
        })
      },
      closeModal(){
        this.mdShow = false;
      }
    }
  }
</script>

<style>

</style>