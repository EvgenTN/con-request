import Vue from 'vue'
import Router from 'vue-router'
import MapPage from './views/MapPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: MapPage
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/FormPage.vue')
    }
  ]
})
