import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    currentKey: '全部'
  },
  mutations: {
    // 将获取的事件数据赋值给state中的list
    initList (state, list) {
      state.list = list
    },
    // 将添加事件输入框中的内容双向绑定至inputValue
    setInputValue (state, val) {
      state.inputValue = val
    },
    // 添加跟踪事件
    addItemList (state) {
      const obj = {
        id: state.list[state.list.length - 1] ? state.list[state.list.length - 1].id + 1 : 0,
        info: state.inputValue,
        done: false
      }
      console.log(obj)

      state.list.push(obj)
      state.inputValue = ''
    },
    // 删除跟踪事件
    deleteItemList (state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    // 事件状态改变
    changeStatus (state, param) {
      state.list.find(item => item.id === param.id).done = param.status
    },
    // 清除已完成事件
    clearDone (state) {
      state.list = state.list.filter(item => !item.done)
    },
    // 筛选条件变更
    filterKeys (state, key) {
      state.currentKey = key
    }
  },
  actions: {
    // 获取json文件中的事件数据
    async getList (context) {
      const data = await Axios.get('/list.json').catch(err => err)
      // console.log(data)
      context.commit('initList', data.data)
    }
  },
  modules: {
  },
  getters: {
    // 未完成事件数量
    unDoneLength (state) {
      return state.list.filter(item => !item.done).length
    },
    // 筛选事件数组
    filterItemList (state) {
      if (state.currentKey === '全部') {
        return state.list
      } else if (state.currentKey === '未完成') {
        return state.list.filter(item => !item.done)
      } else {
        return state.list.filter(item => item.done)
      }
    }
  }
})
