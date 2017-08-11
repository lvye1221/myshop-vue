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
                <a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}">All</a>
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
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import NavBread from '@/components/NavBread.vue'

  export default {
    name: 'GoodsList',
    data () {
      return {
        GoodsList: Array,
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
      NavBread
    },
    mounted: function() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        let param = {
          sort:this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }

      	axios.get('/goods/list', {params:param}).then((res) => {
      	  let result = res.data.result;
      	  
      	  this.GoodsList = result
      	})
      },
      sortGoods(){
	this.sortOption = 1;
        this.sortFlag = !this.sortFlag;
        this.getGoodsList();
      },
      setPriceFilter(index){
        this.priceChecked = index;
        this.getGoodsList();
      }
    }
  }
</script>

<style>

</style>