<template>
  <div>
    <p>当前count值为：{{$store.state.count}}</p>
    <h3>{{$store.getters.showNum}}</h3>
    <button @click="handleChange">+2</button>
    <button @click="handleChangeAsync">+2</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange () {
      this.$store.commit('add', 2)
    },
    handleChangeAsync () {
      this.$store.dispatch('addAsync', 2)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
