import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import Discovery from '../components/discovery.vue'
import Playlists from '../components/playlists.vue'
import Songs from '../components/songs.vue'
import MVs from '../components/mvs.vue'
import Search from '../components/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home,
    redirect: '/discovery',
    children: [
      {
        path: '/discovery',
        component: Discovery
      },
      {
        path: '/playlists',
        component: Playlists
      },
      {
        path: '/songs',
        component: Songs
      },
      {
        path: '/mvs',
        component: MVs
      },
      {
        path: '/search/:keyWords',
        component: Search,
        props: route => Object.assign({}, route.query, route.params)
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
