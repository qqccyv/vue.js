<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 步骤条 -->
      <el-steps align-center :active="activeIndex-0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 表单 和 tabs栏 -->
      <el-form :model="addGoodsForm" :rules="addGoodsFormRules" ref="addGoodsFormRef" label-width="100px">
        <el-tabs v-model="activeIndex" tab-position="left" :before-leave="beforeLeave" @tab-click="tabClick">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="addGoodsForm.goods_cat" :options="cateList" :props="cateProps" @change="handleChange" clearable></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品分类 -->
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="(item, index) in manyGoodsData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="item" v-for="(item, index) in item.attr_vals" :key="index" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="(item, index) in onlyGoodsData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="uploadSuccess" list-type="picture" :headers="headersObj">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addGoodsForm.goods_introduce">

            </quill-editor>
            <el-button class="addbtn" type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog class="previewImg" title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeIndex: '0',
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      //级联分类信息列表
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //商品参数与，商品属性
      manyGoodsData: [],
      onlyGoodsData: [],
      //图片上传地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      //图片预览
      previewVisible: false,
      previewUrl: '',
      //表单验证规则
      addGoodsFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    //获取分类列表
    this.getCateList()
  },
  methods: {
    //获取商品分类信息
    async getCateList() {
      const { data: res } = await this.$http.get('/categories')
      // console.log(res);
      this.cateList = res.data
    },
    //分类选择器触发
    handleChange() {
      console.log(this.addGoodsForm.goods_cat);
      if (this.addGoodsForm.goods_cat.length < 3) {
        this.addGoodsForm.goods_cat = []
        return
      }
    },
    //阻止tab栏切换条件
    beforeLeave(activeName, oldActiveName) {
      // console.log(activeName);
      // console.log(oldActiveName);
      if (oldActiveName == 0 && this.addGoodsForm.goods_cat.length < 3) {
        this.$message.error('请选择商品分类')
        return false
      }

    },
    //切换tab栏事件，获取各tab栏数据
    async tabClick() {
      // console.log(this);
      if (this.activeIndex == '1') {
        // console.log(111);
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: {
            sel: 'many'
          }
        })
        if (res.meta.status != 200) return this.$message.error('获取数据失败')
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyGoodsData = res.data

      } else if (this.activeIndex == '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: {
            sel: 'only'
          }
        })
        if (res.meta.status != 200) return this.$message.error('获取数据失败')
        this.onlyGoodsData = res.data
        // console.log( this.onlyGoodsData);

      }

    },
    //图片上传预览
    handlePreview(file) {
      this.previewUrl = file.response.data.url
      this.previewVisible = true

    },
    //删除将要上传的图片
    handleRemove(file) {
      const i = this.addGoodsForm.pics.findIndex(item => {
        return item.pic = file.response.data.tmp_path
      })
      // console.log(i);
      this.addGoodsForm.pics.splice(i, 1)
    },
    //图片上传成功后
    uploadSuccess(response) {
      const picObj = {
        pic: response.data.tmp_path
      }
      this.addGoodsForm.pics.push(picObj)
      // console.log(this.addGoodsForm.pics);

    },
    //添加商品，并对商品数据进行格式处理
    addGoods() {
      // console.log(this.addGoodsForm.goods_introduce);
      // 预验证
      this.$refs.addGoodsFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写商品必要选项')
        const form = _.cloneDeep(this.addGoodsForm)
        form.goods_cat = form.goods_cat.join(',')
        this.manyGoodsData.forEach(item => {
          let newGoodsObj = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          form.attrs.push(newGoodsObj)
        })
        this.onlyGoodsData.forEach(item=>{
           let newGoodsObj = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          form.attrs.push(newGoodsObj)
        })
        // console.log(form);
        const {data: res} = await this.$http.post('/goods',form)
        if(res.meta.status !=201) return this.$message.error('添加商品失败')
        this.$message.success('商品添加成功')
        this.$router.push('/goods')
      })

    }
  },
  computed: {
    cateId() {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[2]
      }
      return null
    }
  },
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 15px 0 0 !important;
}
.previewImg img {
  width: 100%;
}
.addbtn {
  margin-top: 20px;
}
</style>