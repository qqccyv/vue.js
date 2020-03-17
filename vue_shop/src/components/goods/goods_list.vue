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
          <el-input placeholder="请输入内容" v-model="queryGoodsInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
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
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" @click="deleteGoods(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryGoodsInfo.pagenum" :page-sizes="[15, 20, 25, 30]" :page-size="queryGoodsInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
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
    handleSizeChange(newSize) {
      this.queryGoodsInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryGoodsInfo.pagenum = newPage
      this.getGoodsList()
    },
    //删除商品
   async deleteGoods(row){
    //  console.log(row)
     
   const confirmResult =   await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(confirmResult!="confirm") return
     const {data:res} = await this.$http.delete(`/goods/${row.goods_id}`)
     if(res.meta.status!=200) this.$message.error('删除失败')
     this.$message.success('删除成功')
     this.getGoodsList()
    },
    //跳转添加商品页面
    goAddPage(){
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style lang="less" scoped>
</style>