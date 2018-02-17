import Vue from 'vue'
import Router from 'vue-router'
import ReimsCharts from '@/components/charts/Reimscharts'
import MunicipalPage from '@/pages/municipalgis/municipal-page'

import Landing from '@/pages/landing'
import engineeringRoutes from './engineering-routes'
import financeRoutes from './finance-routes'
import LoginUser from '@/pages/UserLogin'
import RegisterUser from '@/pages/RegisterUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/municipal-page',
      name: 'municipal-page',
      component: MunicipalPage
    },
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/',
      name: 'logout'
    },
    { ...engineeringRoutes },
    { ...financeRoutes }
  ]

})
