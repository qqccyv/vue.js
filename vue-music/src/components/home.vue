<template>
  <el-container class="homeBox">
    <!-- 头部区域 -->
    <el-header>
      <el-row :gutter="20" class="header">
        <el-col :span="6">
          千千静听
        </el-col>
        <el-col :span="6">
          <i class="el-icon-arrow-left"></i>
          <i class="el-icon-arrow-right"></i>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-input placeholder="请输入内容" v-model="searchValue" size="small">
            <el-button slot="append" icon="el-icon-search" @click="searchMusic"></el-button>
          </el-input>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <!-- 导航栏部分 -->
      <el-aside width="200px">
        <el-menu :default-active="activePath" active-text-color="#EA5E39" background-color="#eee" router>
          <el-menu-item :index="item.path" v-for="item in navList" :key="item.id" @click="saveActivePath(item.path)">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容部分 -->
      <el-main>
        <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      activePath: '/discovery',
      navList: [
        {
          id: 1,
          title: '发现音乐',
          icon: 'el-icon-view',
          path: '/discovery'
        },
        {
          id: 2,
          title: '推荐歌单',
          icon: 'el-icon-document',
          path: '/playlists'
        },
        {
          id: 3,
          title: '最新音乐',
          icon: 'el-icon-service',
          path: '/songs'
        },
        {
          id: 4,
          title: '最新MV',
          icon: 'el-icon-video-play',
          path: '/mvs'
        }
      ]
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 保存当前导航栏选中项
    saveActivePath (path) {
      window.sessionStorage.setItem('activePath', path)
    },
    // 搜索
    searchMusic () {
      if (this.searchValue.trim().length === 0) {
        return this.$message.warning('请输入要搜索的内容')
      }
      const keyWords = this.searchValue.trim()
      this.$router.push('/search/' + keyWords)
    }
  }
}
</script>

<style lang="less" scoped>
.homeBox {
  height: 100%;
}
.el-header {
  // display: flex;
  // align-items: center;
  background-color: #f4f4f4;
}
.el-aside {
  background-color: #eeeeee;
}
.el-main {
  background-color: #fff;
}
.header {
  margin: 15px 0;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  margin: 0 10px;
  font-size: 30px;
}
</style>
