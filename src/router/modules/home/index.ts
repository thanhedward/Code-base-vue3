import type { RouteRecordRaw } from 'vue-router';
import { useI18n } from 'vue-i18n'
import HomeLayout from '@/pages/home/index.vue';

// const { t } = useI18n()

const homeRoute: RouteRecordRaw = {
  path: '/home',
  component: HomeLayout,
  children: [
    {
      path: '',
      component: () => import('@/pages/home/index.vue'),
      name: 'auth',
      meta: {
        requireAuth: true,
        title: "test home",
      }
    }
  ]
};

export default homeRoute;