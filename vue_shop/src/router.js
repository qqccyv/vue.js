import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from './components/login.vue'
// import Home from './components/home.vue'
// import Welcome from './components/welcome.vue'
// import Users from './components/user/users.vue'
// import Rights from './components/power/rights.vue'
// import Roles from './components/power/roles.vue'
// import Cate from './components/goods/Cate.vue'
// import Params from './components/goods/params.vue'
// import Goods_list from './components/goods/goods_list.vue'
// import Goods_add from './components/goods/goods_add.vue'
// import Order from './components/order/order.vue'
// import Report from './components/report/report.vue'
// import Login from './components/Login.vue'
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ './components/login.vue')
    // import Home from './components/Home.vue'
const Home = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ './components/home.vue')
    // import Welcome from './components/Welcome.vue'
const Welcome = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ './components/welcome.vue')

// import Users from './components/user/Users.vue'
const Users = () =>
    import ( /* webpackChunkName: "Users_Rights_Roles" */ './components/user/users.vue')
    // import Rights from './components/power/Rights.vue'
const Rights = () =>
    import ( /* webpackChunkName: "Users_Rights_Roles" */ './components/power/rights.vue')
    // import Roles from './components/power/Roles.vue'
const Roles = () =>
    import ( /* webpackChunkName: "Users_Rights_Roles" */ './components/power/roles.vue')

// import Cate from './components/goods/Cate.vue'
const Cate = () =>
    import ( /* webpackChunkName: "Cate_Params" */ './components/goods/Cate.vue')
    // import Params from './components/goods/Params.vue'
const Params = () =>
    import ( /* webpackChunkName: "Cate_Params" */ './components/goods/params.vue')

// import GoodsList from './components/goods/List.vue'
const Goods_list = () =>
    import ( /* webpackChunkName: "GoodsList_Add" */ './components/goods/goods_list.vue')
    // import Add from './components/goods/Add.vue'
const Goods_add = () =>
    import ( /* webpackChunkName: "GoodsList_Add" */ './components/goods/goods_add.vue')

// import Order from './components/order/Order.vue'
const Order = () =>
    import ( /* webpackChunkName: "Order_Report" */ './components/order/order.vue')
    // import Report from './components/report/Report.vue'
const Report = () =>
    import ( /* webpackChunkName: "Order_Report" */ './components/report/report.vue')

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
            { path: '/orders', component: Order },
            { path: '/reports', component: Report },
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