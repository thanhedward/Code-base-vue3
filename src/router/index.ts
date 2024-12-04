import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoute from '@/router/modules/dashboard'
import RouterGuard from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    dashboardRoute
  ]
})

RouterGuard.load(router)

export default router
