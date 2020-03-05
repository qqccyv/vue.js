import $ from 'jquery'
import './css/1.css'
import './css/1.less'
import './css/1.scss'
$(function() {
    $('li:odd').css('backgroundColor', 'red')
    $('li:even').css('backgroundColor', 'pink')
})

class person {
    static name = "邓宇"
}
console.log(person.name);

import Vue from 'vue'
import App from './components/App.vue'
const vm = new Vue({
    el: '#app',
    render: h => h(App)
})