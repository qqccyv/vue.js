
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputChange" />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="filterItemList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="statueChange($event,item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="item===currentKey? 'primary':'default'" v-for="(item, index) in actionList" :key="index" @click="filterItem(item)">{{item}}</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      actionList: ['全部', '未完成', '已完成']
    }
  },
  created () {
    this.getList()
  },
  computed: {
    ...mapState(['inputValue', 'currentKey']),
    ...mapGetters(['unDoneLength', 'filterItemList'])
  },
  methods: {
    ...mapActions(['getList']),
    ...mapMutations(['setInputValue', 'addItemList', 'deleteItemList', 'changeStatus', 'clearDone', 'filterKeys']),
    inputChange (event) {
      if (event.target.value.trim().length <= 0) return
      this.setInputValue(event.target.value)
    },
    addItem () {
      if (this.inputValue.length <= 0) return this.$message.warning('请输入需要跟踪的事件')
      this.addItemList()
    },
    deleteItem (id) {
      this.deleteItemList(id)
    },
    statueChange (e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.changeStatus(param)
    },
    clear () {
      this.clearDone()
    },
    filterItem (item) {
      this.filterKeys(item)
    }

  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
