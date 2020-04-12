<template>
  <div>
    发现音乐
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    // 获取轮播图数据
    this.getBanner()
  },
  methods: {
    async getBanner () {
      const res = await this.$http.post('v2/banner/get', { clientType: 'pc' })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
