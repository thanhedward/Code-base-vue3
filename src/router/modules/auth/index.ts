import type { RouteRecordRaw } from 'vue-router';
import { useI18n } from 'vue-i18n'
import AuthLayout from '@/pages/login/index.vue';

// const { t } = useI18n()

const authRoute: RouteRecordRaw = {
  path: '/auth/login',
  component: AuthLayout,
  children: [
    {
      path: '',
      component: () => import('@/pages/login/index.vue'),
      name: 'Login',
      meta: {
        requireAuth: true,
        title: "test auth",
      }
    }
  ]
};

export default authRoute;