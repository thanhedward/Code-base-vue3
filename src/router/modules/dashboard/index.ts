import type { RouteRecordRaw } from 'vue-router';
import { useI18n } from 'vue-i18n'
import AppLayout from '@/layouts/AppLayout/DashboardDemo.vue';

// const { t } = useI18n()

const dashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  component: AppLayout,
  children: [
    {
      path: '',
      component: () => import('@/layouts/AppLayout/DashboardDemo.vue'),
      name: 'dashboard',
      meta: {
        requireAuth: true,
        roles: [1],
        title: "test dashboard",
      }
    }
  ]
};

export default dashboardRoute;