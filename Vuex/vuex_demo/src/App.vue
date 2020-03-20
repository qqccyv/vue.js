<template>
  <div>
    <add-item></add-item>
    <sub-item></sub-item>
  </div>
</template>

<script>
import Addition from './components/addition'
import Subtraction from './components/subtraction'
export default {
  data () {
    return {

    }
  },
  components: {
    'add-item': Addition,
    'sub-item': Subtraction
  }
}
</script>
<style lang="less" scoped>

</style>
