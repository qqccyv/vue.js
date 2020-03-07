<template>
<el-container class="home-container">
  <el-header>
    <div>
      <img src="../assets/heima.png" alt="">
      <span>电商后台信息管理系统</span>
    </div>
    <el-button type="primary" @click="loginOut">退出</el-button>
    </el-header>
  <el-container>
    <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
            <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>


</template>

<script>
export default {
  methods: {
    loginOut(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="less" scoped>
  .home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>