<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索和添加用户 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryUsers.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="usersList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <!-- 状态栏 -->
        <el-table-column label="状态">
          <template slot-scope="userData">
            <el-switch v-model="userData.row.mg_state" @change="changeUserState(userData.row)"></el-switch>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column label="操作" width="180px">
          <template slot-scope="userData">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false" >
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(userData.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(userData.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryUsers.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryUsers.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="resetAddForm">
      <!-- 表单区域 -->
       <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户表单 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="50%" @close="resetEditForm">
      <!-- 表单区域 -->
       <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" >
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
 //自定义表单验证规则
  data() {
     var checkEmail = (rule,value,cb)=>{
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regEmail.test(value)){
          return cb()
        }
      cb(new Error('请输入合法的邮箱地址'))
  }
  var checkMobile = (rule,value,cb)=>{
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
  }
    return {
      queryUsers: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      usersList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogVisible: false,
      editForm:{
         username: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 添加用户表单验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      //编辑用户表单验证规则
      editFormRules:{
         email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    //获取用户列表数据
    async getUsersList() {
      let { data: res } = await this.$http.get("/users", {
        params: this.queryUsers
      });
      if (res.meta.status != 200) {
        return this.$message.error("获取用户列表失败！");
      }
      
      this.usersList = res.data.users;
      this.total = res.data.total;
      // console.log(res);
    },
    //分页模块功能方法
    handleSizeChange(newSize) {
      this.queryUsers.pagesize = newSize;
      this.getUsersList();
    },
    handleCurrentChange(currentPage) {
      this.queryUsers.pagenum = currentPage;
      this.getUsersList();
    },
    //修改用户状态
    async changeUserState(userData) {
      let { data: res } = await this.$http.put(
        `users/${userData.id}/state/${userData.mg_state}`
      );
      if (res.meta.status != 200) {
        userData.mg_state = !userData.mg_state;
        this.$message({
          message: "用户状态修改失败",
          type: "error",
          showClose: true
        });
      }
      this.$message({
        message: res.meta.msg,
        type: "success",
        showClose: true
      });
    },
    //重置表单验证状态
    //多个重置函数不能放一起，不然会报错，应该是没有激活的表单会not found
    resetAddForm(){
      this.$refs.addFormRef.resetFields()
    },
    resetEditForm(){
      this.$refs.editFormRef.resetFields()
    },
    //添加用户信息
    addUser(){
       this.$refs.addFormRef.validate(async valid=>{
         if(!valid) return  this.$message.error('输入的信息不符合规则')
        let {data:res}= await this.$http.post('/users',this.addForm)
        if(res.meta.status != 201){
          return this.$message.error('用户添加失败')
        }
        this.$message.success('用户添加成功')
        this.addDialogVisible = false
        this.getUsersList()
       })
    },
    //显示用户信息编辑表单
    async showEditDialog(id){
      this.editDialogVisible = true
      const {data:res} = await this.$http.get('/users/'+id)
      // console.log(res);
      if(res.meta.status != 200) return
      this.editForm = res.data
      
    },
    //编辑用户信息
    editUser(){
      this.$refs.editFormRef.validate(async valid=>{
        if(!valid) return
      const {data: res} =  await this.$http.put('/users/'+this.editForm.id,this.editForm)
      if(res.meta.status != 200) return this.$message({
        message: '用户信息更新失败',
        type: 'error',
        showClose: true,
      });
      this.$message({
        message: res.meta.msg,
        type: 'success',
        showClose: true,
      });
      this.editDialogVisible = false
      this.getUsersList()
      
      })
    },
    //删除用户
   async deleteUser(id){
          console.log(id);
          
    let result = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(result != 'confirm') return

    let {data: res} =await  this.$http.delete('/users/'+id)
    console.log(res);
    if(res.meta.status !=200) return this.$message({
      message: '删除失败',
      type: 'error',
      showClose: true,
    });
    this.$message({
      message: res.meta.msg,
      type: 'success',
      showClose: true,
    });
    this.getUsersList()
    
    
    }
  },
  mounted() { 
    
  }
};
</script>

<style lang="less" scoped>
</style>