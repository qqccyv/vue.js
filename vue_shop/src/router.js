import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
import Welcome from './components/welcome.vue'
import Users from './components/user/users.vue'
import Rights from './components/power/rights.vue'
import Roles from './components/power/roles.vue'
import Cate from './components/goods/Cate.vue'
import Params from './components/goods/params.vue'
import Goods_list from './components/goods/goods_list.vue'
import Goods_add from './components/goods/goods_add.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/categories', component: Cate },
            { path: '/params', component: Params },
            { path: '/goods', component: Goods_list },
            { path: '/goods/add', component: Goods_add },
        ]
    }

]

const router = new VueRouter({

    routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router