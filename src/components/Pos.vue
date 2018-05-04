<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div class="pos">
    <el-col :span="7" class="pos-order" id="order-list">
      <el-tabs>
        <el-tab-pane label="点餐">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="goodsName" label="商品"></el-table-column>
            <el-table-column prop="count" label="数量" ></el-table-column>
            <el-table-column prop="price" label="金额" ></el-table-column>
            <el-table-column prop="" label="操作" width="150" fixed="right">
               <template scope="scope">
                 <el-button type="text" size="small">删除</el-button>
                 <el-button type="text" size="small">增加</el-button>
               </template>
            </el-table-column>
          </el-table>
          <div class="totalDiv">
             <small>数量:</small>{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp;
             <small>金额:</small>{{totalMoney}} 元
          </div>
          <div class="btn">
            <el-button type="warning">挂单</el-button>
            <el-button type="danger">删除</el-button>
            <el-button type="success">结账</el-button>
          </div>
        </el-tab-pane>


        <el-tab-pane label="挂单">

        </el-tab-pane>


        <el-tab-pane label="外卖">

        </el-tab-pane>
      </el-tabs>
    </el-col>
    <!--商品展示-->
    <el-col :span="17">
      <div class="title">常用商品</div>
        <div class="often-goods-list">
         <ul>
           <li v-for="goods in oftenGoods"  @click="addOrderList(goods)">
             <span>{{goods.goodsName}}</span>
             <span class="o-price">￥{{goods.price}}</span>
           </li>
         </ul>
       </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class='cookList'>
                <li v-for="goods in type0Goods"   @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              小食
            </el-tab-pane>
            <el-tab-pane label="饮料">
              饮料
            </el-tab-pane>
            <el-tab-pane label="套餐">
              套餐
            </el-tab-pane>
          </el-tabs>
        </div>
    </el-col>
  </div>
</template>


<script>
  import ElCol from "element-ui/packages/col/src/col";
  import axios from 'axios';
  export default {
    name:'pos',
    components: {ElCol},
    data(){
      return{
        tableData: [],
        oftenGoods:[],
        totalMoney:0,
        totalCount:0,
        type0Goods:[
          {
            goodsId:1,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
            goodsName:'香辣鸡腿堡',
            price:18
          }, {
            goodsId:2,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
            goodsName:'田园鸡腿堡',
            price:15
          }, {
            goodsId:3,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
            goodsName:'和风汉堡',
            price:15
          }, {
            goodsId:4,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
            goodsName:'快乐全家桶',
            price:80
          }, {
            goodsId:5,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
            goodsName:'脆皮炸鸡腿',
            price:10
          }, {
            goodsId:6,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
            goodsName:'魔法鸡块',
            price:20
          }, {
            goodsId:7,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
            goodsName:'可乐大杯',
            price:10
          }, {
            goodsId:8,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
            goodsName:'雪顶咖啡',
            price:18
          }, {
            goodsId:9,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
            goodsName:'大块鸡米花',
            price:15
          }, {
            goodsId:20,
            goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
            goodsName:'香脆鸡柳',
            price:17
          }

        ],
      }
    },
    mounted:function () {
      var orderHeight=document.documentElement.clientHeight;
      document.getElementById('order-list').style.height=orderHeight+"px";
    },
    created(){
      axios.get('http://jspang.com/DemoApi/oftenGoods.php').then((res)=>{
           this.oftenGoods=res.data;
      }).catch((error)=>{
         console.log(error);
         alert('网络错误，不可访问！')
      })
    },
    methods:{
      addOrderList(goods){
        //商品是否存在于商品列表中
        let isHave = false;
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].goodsId==goods.goodsId){
            isHave=true
          }
        }
        //根据判断的值编写业务逻辑
        if(isHave){
          //改变列表中商品数量
          let arr=this.tableData.filter((item)=>{
            return item.goodsId==goods.goodsId
          });
          arr[0].count++
        }else {
          let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
          //压入到tabs数组中
          this.tableData.push(newGoods);
        }

        this.tableData.forEach((item)=>{

          this.totalCount =this.totalCount+item.count;
          this.totalMoney=this.totalMoney+(item.price*item.count);
        })

      },
    },
  };
</script>


<style>
  .totalDiv{
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #D3dce6;
  }
  .often-goods-list{
    background: ghostwhite;
    overflow: hidden;
    padding-bottom: 30px;
  }
  .pos-order{
    background-color: #f9fafc;
    border-right:1px solid #ddd;
  }
  .btn{
    margin-top:20px;
  }
  .title{
    height: 20px;
    border-bottom: 1px solid #D3DCE6;
    background-color:#F9FAFC ;
    padding: 10px;
  }
  .often-goods-list{
    display: block;
  }
  .often-goods-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  .o-price{
    color: #58B7FF;
  }
  .cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
    cursor: pointer;
  }
  .cookList li span{
    display: block;
    float:left;
  }
  .foodImg{
    width: 40%;
  }
  .foodName{
    font-size: 18px;
    padding-left: 10px;
    color:brown;

  }
  .foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
  }
  .goods-type{
    clear: both;
    width: 100%;
  }
</style>

