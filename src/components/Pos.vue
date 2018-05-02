<template>
  <div class="pos">
    <el-col :span="7" class="pos-order" id="order-list">
       我是订单栏
    </el-col>
    <!--商品展示-->
    <el-col :span="17">
        我是产品栏
    </el-col>
  </div>
</template>


<script>
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    name:'pos',
    components: {ElCol},
    mounted:function () {
      var orderHeight=document.body.clientHeight;
      console.log(orderHeight);
      document.getElementById('order-list').style.height=orderHeight+"px";
    }
  };
</script>


<style>
  .pos-order{
    background-color: #f9fafc;
    border-right:1px solid #ddd;
  }

</style>

