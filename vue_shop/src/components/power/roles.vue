<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加角色 -->
      <el-row>
        <el-col>
          <el-button type="success">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <!-- 角色权限列表 -->
          <template slot-scope="scope">
            <!-- 一级权限 -->
            <el-row v-for="(item1, index1) in scope.row.children" :key="item1.id" :class="{bdbottom:true,bdtop: index1 == 0,vcenter:true}">
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 二级权限 -->
                <el-row v-for="(item2, index2) in item1.children" :key="item2.id" :class="{bdtop: index2 != 0,vcenter:true}">
                  <el-col :span="6">
                    <el-tag type="success">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!-- 三级权限 -->
                    <el-tag type="warning" v-for="(item3, index3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <!-- 状态栏 -->
        <el-table-column label="操作" width="300px">
          <template slot-scope="rolesData">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      let { data: res } = await this.$http.get('/roles')
      if (res.meta.status != 200) return this.$message({
        message: '角色列表获取失败',
        type: 'error',
        showClose: true,
      });
      this.rolesList = res.data
    }
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>