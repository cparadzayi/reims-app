import Engineering from '@/pages/engineering/engineering'
import Civils from '@/pages/engineering/civil-engineering'
import WaterInfrastructure from '@/pages/engineering/water-infrastructure'
import SewerInfrastructure from '@/pages/engineering/sewer-infrastructure'
import WasteManagement from '@/pages/engineering/waste-management'
import TownPlanning from '@/pages/engineering/town-planning'
import Surveying from '@/pages/engineering/survey'
import Electrical from '@/pages/engineering/electrical'
import FireAndAmbulance from '@/pages/engineering/fire-and-ambulance'

import Finance from '@/pages/finance/finance'
import BillingAnalysis from '@/pages/finance/billing-analysis'

import { checkAuth } from './auth-guard'

export default {
  path: '/engineering',
  component: Engineering,
  children: [
    {
      path: '',
      redirect: 'water-infrastructure'
    },
    {
      path: 'water-infrastructure',
      name: 'water-infrastructure',
      component: WaterInfrastructure,
      beforeEnter: checkAuth
    },
    {
      path: 'sewer-infrastructure',
      name: 'sewer-infrastructure',
      component: SewerInfrastructure,
      beforeEnter: checkAuth
    },
    {
      path: 'waste-management',
      name: 'waste-management',
      component: WasteManagement
    },
    {
      path: 'town-planning',
      name: 'town-planning',
      component: TownPlanning,
      beforeEnter: checkAuth
    },
    {
      path: 'surveying',
      name: 'surveying',
      component: Surveying,
      beforeEnter: checkAuth
    },
    {
      path: 'electrical',
      name: 'electrical',
      component: Electrical,
      beforeEnter: checkAuth
    },
    {
      path: 'fire-and-ambulance',
      name: 'fire-and-ambulance',
      component: FireAndAmbulance,
      beforeEnter: checkAuth
    },
    {
      path: 'civil-engineering',
      name: 'civil-engineering',
      component: Civils,
      beforeEnter: checkAuth
    }
  ]
}