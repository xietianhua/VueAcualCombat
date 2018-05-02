<template>
  <div class="pos">
    <el-col :span="7">
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
    components: {ElCol}

  };
</script>


<style>

</style>

