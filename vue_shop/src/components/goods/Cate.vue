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
          <el-button type="success" @click="showGoodsDialog">添加商品分类</el-button>
        </el-col>
      </el-row>
      <tree-table class="treeTable" :data="catesList" :columns="columns" border :show-index="true" :selection-type="false" :expand-type="false">
        <!-- 自定义模板 -->
        <!-- 是否有效 -->
        <template slot-scope="scope" slot="isOk">
          <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot-scope="scope" slot="sort">
          <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot-scope="scope" slot="handle">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页功能 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryCates.pagenum" :page-sizes="[3, 5, 10, 15]" :page-size="queryCates.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加商品分类表单 -->
    <el-dialog title="添加商品分类" :visible.sync="categoriesDialogVisible" width="50%" @close="resetCategoriesForm">
      <el-form label-width="100px" :model="categoriesForm" :rules="categoriesFormRules" ref="categoriesFormRef" >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="categoriesForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader v-model="categoriesId" :options="parentCatesList" :props="parentCatesProps" @change="categoriesChange" style="width: 100%" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="categoriesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catesList: [],
      queryCates: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          template: 'sort'
        },
        {
          label: '操作',
          type: 'template',
          template: 'handle'
        },
      ],
      categoriesDialogVisible: false,
      categoriesForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      //选择的分类id
      categoriesId: [],
      parentCatesList: [],
      parentCatesProps:{
         expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id',
          children: 'children',
           checkStrictly: true
      },
      categoriesFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getCatesList()
  },
  methods: {
    async getCatesList() {
      const { data: res } = await this.$http.get('/categories', {
        params: this.queryCates
      })
      if (res.meta.status != 200) {
        return this.$message({
          message: res.meta.msg,
          type: 'error',
          showClose: true,
        });

      }
      // console.log(res);
      this.total = res.data.total
      this.catesList = res.data.result

    },
    //页面显示条数变化后
    handleSizeChange(newSize) {
      this.queryCates.pagesize = newSize
      this.getCatesList()
    },
    //当前页码变化后
    handleCurrentChange(newPage) {
      this.queryCates.pagenum = newPage
      this.getCatesList()
    },
    //显示商品分类表单
    showGoodsDialog() {
     this.getParentCatesList()
      this.categoriesDialogVisible = true
    },
    //查询父级分类列表
   async getParentCatesList(){
    const {data:res}= await this.$http.get('/categories',{
        params: {
          type: 2
        }
      })
    if(res.meta.status !=200) return this.$message({
      message: res.meta.msg,
      type: 'error',
      showClose: true,
    });
    console.log(res);
    this.parentCatesList = res.data
    
    
    },
    //父级分类变更后
    categoriesChange(){
      console.log(this.categoriesId);
      if(this.categoriesId.length>0){
        this.categoriesForm.cat_pid = this.categoriesId[this.categoriesId.length-1]
        this.categoriesForm.cat_level = this.categoriesId.length
        return  
      }
      this.categoriesForm.cat_pid = 0
      this.categoriesForm.cat_level = 0
    },
    //重置resetCategoriesForm表单
    resetCategoriesForm(){
      this.$refs.categoriesFormRef.resetFields()
      this.categoriesId = []
       this.categoriesForm.cat_pid = 0
      this.categoriesForm.cat_level = 0

    },
    //提交新增分类信息
   async addCategory(){
      console.log(this.categoriesForm);
    const {data:res}= await this.$http.post('/categories',this.categoriesForm)
      if(res.meta.status !=201) return this.$message.error('添加分类失败')
      this.categoriesDialogVisible = false
      this.getCatesList()
      this.$message.success('添加分类成功')
    }
  },
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
</style>