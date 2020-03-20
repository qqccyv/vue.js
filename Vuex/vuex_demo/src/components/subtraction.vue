<template>
  <div>
    <P>count的最新值为：{{count}}</P>
    <h3>{{showNum}}</h3>
    <button @click="handleChange">-2</button>
    <button @click="handleChangeAsync">-2</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['sub']),
    ...mapActions(['subAsync']),
    handleChange () {
      this.sub(2)
    },
    handleChangeAsync () {
      this.subAsync(2)
    }

  }
}
</script>

<style lang="less" scoped>

</style>
