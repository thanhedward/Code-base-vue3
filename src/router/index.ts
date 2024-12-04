import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoute from '@/router/modules/dashboard'
import authRoute from '@/router/modules/auth'
import homeRoute from '@/router/modules/home'
import userRoute from '@/router/modules/user'
import RouterGuard from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    dashboardRoute,
    authRoute,
    homeRoute,
    userRoute
  ]
})

RouterGuard.load(router)

export default router
