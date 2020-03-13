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
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader v-model="selectCateList" :options="cateList" :props="cateProps" @change="cateChange"></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" :disabled="isDisabled">添加参数</el-button>
            <el-table :data="manyTabParams" style="width: 100%">
              <el-table-column  type="expand">
              </el-table-column>
              <el-table-column  type="index" label="序号">
              </el-table-column>
              <el-table-column prop="attr_name" label="参数名称" >
              </el-table-column>
              <el-table-column label="操作">
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" :disabled="isDisabled">添加参数</el-button>
              <el-table :data="onlyTabParams" style="width: 100%">
              <el-table-column  type="expand">
              </el-table-column>
              <el-table-column  type="index" label="序号">
              </el-table-column>
              <el-table-column prop="attr_name" label="属性名称" >
              </el-table-column>
               <el-table-column label="操作">
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      selectCateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //tab数据
      activeName: 'many',
      manyTabParams: [],
      onlyTabParams: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //获取商品分类信息
    async getCateList() {
      const { data: res } = await this.$http.get('/categories')
      // console.log(res);
      this.cateList = res.data

    },
    //商品分类变动以后
    async cateChange() {
      // console.log(this.selectCateList);
      this.getParamsData()

    },

    //tab标签点击后
    tabClick() {
      this.getParamsData()
    },
    //获取分类参数和属性
    async getParamsData() {
      if (this.selectCateList.length != 3) {
        this.selectCateList = []
        return
      }
      //获取分类信息
      const { data: res } = await this.$http.get(`categories/${this.thirdCateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      })
      if (res.meta.status != 200) return this.$message.error('获取分类数据失败')
      console.log(res.data);
      if (this.activeName == 'many') {
        this.manyTabParams = res.data
      } else {
        this.onlyTabParams = res.data
      }

    }

  },
  computed: {
    //通过被选择的商品分类数组长度判断按钮禁用
    isDisabled() {
      return this.selectCateList.length != 3
    },
    //获取选择的第三集分类id
    thirdCateId() {
      if (this.selectCateList.length == 3) {
        return this.selectCateList[2]
      }
    },
  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 15px;
}
</style>