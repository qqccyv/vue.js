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
    <el-aside :width="isCollapse? '64px':'200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
        <el-submenu :index="'/'+item.path" v-for="item in menuList" :key="item.id" unique-opened>
          <template slot="title">
            <i :class="iconsObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActive('/' + subItem.path)">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>


</template>

<script>
export default {
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      activePath: '',
      isCollapse: false,
      menuList: [],
       iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
    }
  },
  methods: {
    loginOut(){
      window.sessionStorage.clear()
      this.$router.push('login')
    },
   async getMenuList(){
     const {data: res} = await this.$http.get('/menus')
      if(res.meta.status != 200){
        return this.$message({
          message: res.meta.message,
          type: 'error',
          showClose: true,
        });    
      }
      this.menuList = res.data
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    saveActive(activePath){
      window.sessionStorage.setItem('activePath',activePath) //将当前路径保存在sessionStorage中，保证刷新后依然为当前选项
      this.activePath = activePath
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