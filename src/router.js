import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home')
    },
    {
      path: '/release/:node_id',
      name: 'release',
      component: () => import('./views/Release')
    }
  ]
})
