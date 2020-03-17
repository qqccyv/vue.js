import Vue from 'vue'
import App from './App.vue'
import router from './router'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import Axios from 'axios'
//引入树形表格插件，并注册为全局组件
import ZkTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', ZkTable)
    //定义富文本编辑器插件
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */ )



//定义全局时间过滤器
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Axios.interceptors.request.use(config => {
    // Do something before request is sent
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});
Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')