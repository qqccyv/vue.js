import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
Vue.use(ElementUI)
Axios.defaults.baseURL = 'http://autumnfish.cn/api/'
Axios.defaults.withCredentials = true
Axios.defaults.crossDomain = true
Axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
})
Vue.prototype.$http = Axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
