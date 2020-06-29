import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'exchanges'
    },
    {
      path: '/exchanges',
      name: 'exchanges',
      component: () => import('./views/Exchanges.vue')
    },
    {
      path: '/exchanges/:id',
      name: 'exchange',
      component: () => import('./views/Exchange.vue')
    },
    {
      path: '/markets/:exchangeId',
      name: 'markets',
      component: () => import('./views/Exchanges.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('./views/Chart.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ]
})
