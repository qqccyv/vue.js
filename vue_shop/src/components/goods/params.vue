<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 警告栏 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon>
      </el-alert>
      <el-row class="showCate">
        <el-col>
          <span>选择商品分类：</span>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.showCate {
  margin-top: 15px;
}
</style>