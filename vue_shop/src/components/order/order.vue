<template>
  <div v-if="ordersList != null">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryOrdersInfo.query" clearable @clear="getOrdersList">
            <el-button slot="append" icon="el-icon-search" @click="getOrdersList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表区 -->
      <el-table :data="ordersList" style="width: 100%">
        <el-table-column label="序号" type="index">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格">
        </el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay === '1'" type="primary">已付款</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货">
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showAdressDialog"></el-button>
            <el-button type="success" icon="el-icon-location" @click="logisticsDialogVisible = true"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryOrdersInfo.pagenum" :page-sizes="[10, 15, 20, 30]" :page-size="queryOrdersInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
    </el-card>
    <!-- 地址编辑修改 -->
    <el-dialog title="地址修改" :visible.sync="adressDialogVisible" width="50%">
      <el-form :model="adressData" :rules="adressRules" ref="adressRef" label-width="100px">
        <el-form-item label="省市/直辖市">
          <el-cascader v-model="adressData.princeAdress" :options="citydata" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="adressData.detailAdress"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="adressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 快递邮递进度 -->
    <el-dialog
  title="提示"
  :visible.sync="logisticsDialogVisible"
  width="50%">
   <el-timeline :reverse="true">
    <el-timeline-item
      v-for="(activity, index) in logisticsData"
      :key="index"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
  <span slot="footer" class="dialog-footer">
    <el-button @click="logisticsDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="logisticsDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
   
  </div>
</template>

<script>
import citydata from './citydata'
export default {
  data() {
    return {
      //查询参数
      queryOrdersInfo: {
        query: '',
        pagenum: 1,
        pagesize: 15
      },
      // 订单数组
      ordersList: [],
      //订单总数
      total: '',
      //省市数据
      citydata,
      adressDialogVisible: false,
      adressData: {
        princeAdress: [],
        detailAdress: ''
      },
      adressRules: {

      },
      logisticsDialogVisible: false,
      //物流信息
      logisticsData: [
    {
      "time": "2018-05-10 09:39:00",
      "ftime": "2018-05-10 09:39:00",
      "context": "已签收,感谢使用顺丰,期待再次为您服务",
      "location": ""
    },
    {
      "time": "2018-05-10 08:23:00",
      "ftime": "2018-05-10 08:23:00",
      "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
      "location": ""
    },
    {
      "time": "2018-05-10 07:32:00",
      "ftime": "2018-05-10 07:32:00",
      "context": "快件到达 [北京海淀育新小区营业点]",
      "location": ""
    },
    {
      "time": "2018-05-10 02:03:00",
      "ftime": "2018-05-10 02:03:00",
      "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
      "location": ""
    },
    {
      "time": "2018-05-09 23:05:00",
      "ftime": "2018-05-09 23:05:00",
      "context": "快件到达 [北京顺义集散中心]",
      "location": ""
    },
    {
      "time": "2018-05-09 21:21:00",
      "ftime": "2018-05-09 21:21:00",
      "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
      "location": ""
    },
    {
      "time": "2018-05-09 13:07:00",
      "ftime": "2018-05-09 13:07:00",
      "context": "顺丰速运 已收取快件",
      "location": ""
    },
    {
      "time": "2018-05-09 12:25:03",
      "ftime": "2018-05-09 12:25:03",
      "context": "卖家发货",
      "location": ""
    },
    {
      "time": "2018-05-09 12:22:24",
      "ftime": "2018-05-09 12:22:24",
      "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
      "location": ""
    },
    {
      "time": "2018-05-08 21:36:04",
      "ftime": "2018-05-08 21:36:04",
      "context": "商品已经下单",
      "location": ""
    }
  ]
    }
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    async getOrdersList() {
      const { data: res } = await this.$http.get('/orders', {
        params: this.queryOrdersInfo
      })
      if (res.meta.status != 200) return this.$message.error('获取数据失败')
      this.ordersList = res.data.goods
      this.total = res.data.total
    },
    //分页函数
    handleSizeChange(newSize) {
      this.queryOrdersInfo.pagesize = newSize
    },
    handleCurrentChange(newPage) {
      this.queryOrdersInfo.pagenum = newPage
    },
    //显示地址编辑框
    showAdressDialog() {
      this.adressDialogVisible = true
    },
    handleChange(){

    }
  },
}
</script>

<style lang="less" scoped>
</style>