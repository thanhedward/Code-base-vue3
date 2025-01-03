import type { RouteRecordRaw } from 'vue-router';
import { useI18n } from 'vue-i18n'
import AppLayout from '@/pages/dashboard/DashboardComponent.vue';


// const { t } = useI18n()

const dashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  component: AppLayout,
  children: [
    {
      path: '',
      component: () => import('@/pages/dashboard/DashboardComponent.vue'),
      name: 'dashboard',
      meta: {
        requireAuth: true,
        title: "test dashboard",
      }
    }
  ]
};

export default dashboardRoute;