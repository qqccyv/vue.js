<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容区 -->
    <el-card>
      <!-- 搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table :data="goodsList" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="100">
        </el-table-column>
        <el-table-column  label="创建时间" width="200">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryGoodsInfo.pagenum"
      :page-sizes="[15, 20, 25, 30]"
      :page-size="queryGoodsInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商品查询数据
      queryGoodsInfo: {
        query: '',
        pagenum: 1,
        pagesize: 15
      },
      total: 0,
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    //获取商品列表信息
    async getGoodsList() {
      const { data: res } = await this.$http.get('/goods', {
        params: this.queryGoodsInfo
      })
      if (res.meta.status != 200) return this.$message.error('数据获取失败')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    //分页所属方法
    handleSizeChange(newSize){
      this.queryGoodsInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage){
      this.queryGoodsInfo.pagenum = newPage
      this.getGoodsList()
    }
  },
}
</script>

<style lang="less" scoped>
</style>