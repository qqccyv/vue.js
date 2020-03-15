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
          <!-- 级联选择商品分类 -->
          <span>选择商品分类：</span>
          <el-cascader v-model="selectCateList" :options="cateList" :props="cateProps" @change="cateChange"></el-cascader>
        </el-col>
      </el-row>
      <!-- tab区域 -->
      <el-row>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <!-- 动态参数 -->
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" :disabled="isDisabled" @click="showDialogVisible=true">添加动态参数</el-button>
            <el-table :data="manyTabParams" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <!-- 可选择参数区 -->
                  <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="deleteTag(index,scope.row)">{{item}}</el-tag>
                  <!-- 动态添加参数区 -->
                  <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号">
              </el-table-column>
              <el-table-column prop="attr_name" label="参数名称">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" @click="showEditForm(scope.row)">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteCateParams(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 静态属性 -->
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" :disabled="isDisabled" @click="showDialogVisible=true">添加静态属性</el-button>
            <el-table :data="onlyTabParams" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <!-- 可选择参数区 -->
                  <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="deleteTag(index,scope.row)">{{item}}</el-tag>
                  <!-- 动态添加参数区 -->
                  <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号">
              </el-table-column>
              <el-table-column prop="attr_name" label="属性名称">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" @click="showEditForm(scope.row)">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteCateParams(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
    <!-- 添加分类参数弹出框，公用 -->
    <el-dialog :title="'添加'+addDialogTitle" :visible.sync="showDialogVisible" width="50%" @close="resetAddCateForm">
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item :label="addDialogTitle" prop="attr_name">
          <el-input v-model="addCateForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改分类参数弹出框，公用 -->
    <el-dialog :title="'修改'+addDialogTitle" :visible.sync="showEditDialogVisible" width="50%" @close="resetEditCateForm">
      <el-form :model="editCateForm" :rules="editCateFormRules" ref="editCateFormRef" label-width="100px">
        <el-form-item :label="addDialogTitle" prop="attr_name">
          <el-input v-model="editCateForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCateData">确 定</el-button>
      </span>
    </el-dialog>
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
      onlyTabParams: [],
      //添加数据弹出框数据
      showDialogVisible: false,
      addCateForm: {
        attr_name: ''
      },
      addCateFormRules: {
        attr_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
      //修改数据弹出框数据
      showEditDialogVisible: false,
      editCateForm: {

      },
      editCateFormRules: {
        attr_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
      flag: false
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
        this.manyTabParams = []
        this.onlyTabParams = []
        return
      }
      //获取分类信息
      const { data: res } = await this.$http.get(`categories/${this.thirdCateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      })
      if (res.meta.status != 200) return this.$message.error('获取分类数据失败')
      //对参数可选项数据进行处理,转换数组和添加单独的单独的标签开关
      // console.log(res.data);
      //需要在给data数据赋值之前处理，不然数据不是响应式的
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        //动态添加参数数据
        item.inputVisible = false,
          item.inputValue = ''
      })
      console.log(res.data);
      if (this.activeName == 'many') {
        this.manyTabParams = res.data
      } else {
        this.onlyTabParams = res.data
      }

    },
    //重置添加分类参数表单
    resetAddCateForm() {
      this.$refs.addCateFormRef.resetFields()
    },
    resetEditCateForm() {
      this.$refs.editCateFormRef.resetFields()
    },
    //添加分类参数
    addCateData() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.thirdCateId}/attributes`, {
          attr_name: this.addCateForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status != 201) return this.$message.error('信息添加失败')
        this.getParamsData()
        this.showDialogVisible = false
        this.$message.success('信息添加成功')
      })
    },
    //显示编辑表单
    async showEditForm(params) {
      const { data: res } = await this.$http.get(`categories/${this.thirdCateId}/attributes/${params.attr_id}`)
      if (res.meta.status != 200) return this.$message.error('获取信息失败')
      this.editCateForm = res.data
      this.showEditDialogVisible = true
    },
    //编辑分类参数
    editCateData() {
      this.$refs.editCateFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.thirdCateId}/attributes/${this.editCateForm.attr_id}`, {
          attr_name: this.editCateForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status != 200) return this.$message.error('更新失败')
        this.getParamsData()
        this.showEditDialogVisible = false
      })
    },
    //删除分类参数
    async deleteCateParams(params) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult != 'confirm') return
      const { data: res } = await this.$http.delete(`categories/${this.thirdCateId}/attributes/${params.attr_id}`)
      if (res.meta.status != 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getParamsData()
      this.showEditDialogVisible = false
    },
    //动态添加可选参数
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length == 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      if (this.flag) {
        this.flag = false
        row.attr_vals.push(row.inputValue)
        this.saveTag(row)
        this.$message.success('参数添加成功')
      }
      return
    },
    //显示添加可选参数输入框
    showInput(row) {
      this.flag = true
      row.inputValue = ''
      row.inputVisible = true
      //页面元素更新后才能触发该函数，所以需要定义在 显示输入框语句的后面
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //删除可选参数标签
    deleteTag(i, row) {
      row.attr_vals.splice(i, 1)
      this.saveTag(row)
      this.$message.success('删除成功')
    },
    //保存修改后的可选参数
    async saveTag(row) {
      const { data: res } = await this.$http.put(`categories/${this.thirdCateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(',')
      })
      if (res.meta.status != 200) return this.$message.error('参数添加失败')
      // this.getParamsData()
      // console.log(res.data);
      row.attr_vals = res.data.attr_vals.split(',')
      row.inputVisible = false
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
    //动态显示，添加弹出框标题
    addDialogTitle() {
      if (this.activeName == 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    },

  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 15px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>