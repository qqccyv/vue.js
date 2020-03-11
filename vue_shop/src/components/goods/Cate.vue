<template>
  <div>
        <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
            <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="success">添加商品分类</el-button>
        </el-col>
      </el-row>
      <tree-table :data="catesList" :columns="columns" border :show-index="true" :selection-type="false" :expand-type="false"></tree-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catesList:[],
      queryCates: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }]
    }
  },
  created() {
    this.getCatesList()
  },
  methods: {
   async getCatesList(){
    const {data:res} =  await this.$http.get('/categories',{
        params:this.queryCates
      })
      if(res.meta.status != 200){
        return this.$message({
          message: res.meta.msg,
          type: 'error',
          showClose: true,
        });
        
      }
      console.log(res);
      this.catesList = res.data.result
      
    }
  },
}
</script>

<style lang="less" scoped>
  
</style>