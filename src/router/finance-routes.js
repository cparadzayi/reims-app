import Finance from '@/pages/finance/finance'
import MeterReading from '@/pages/finance/meter-reading'
import BillingAnalysis from '@/pages/finance/billing-analysis'
import Audit from '@/pages/finance/audit'
import Billboards from '@/pages/finance/billboards'

import { checkAuth } from './auth-guard'

export default {
  path: '/finance',
  component: Finance,
  children: [
    {
      path: '',
      redirect: 'meter-reading'
    },
    {
      path: 'meter-reading',
      name: 'meter-reading',
      component: MeterReading,
      beforeEnter: checkAuth
    },
    {
      path: 'billing-analysis',
      name: 'billing-analysis',
      component: BillingAnalysis,
      beforeEnter: checkAuth
    },
    {
      path: 'audit',
      name: 'audit',
      component: Audit,
      beforeEnter: checkAuth
    },
    {
      path: 'billboards',
      name: 'billboards',
      component: Billboards,
      beforeEnter: checkAuth
    }
  ]
}
