import type { RouteRecordRaw } from 'vue-router';
import { useI18n } from 'vue-i18n'
import UserLayout from '@/pages/user/DemoUserComponent.vue';

// const { t } = useI18n()

const userRoute: RouteRecordRaw = {
  path: '/users',
  component: UserLayout,
  children: [
    {
      path: '',
      component: () => import('@/pages/user/DemoUserComponent.vue'),
      name: 'dashboard',
      meta: {
        requireAuth: true,
        title: "test dashboard",
      }
    }
  ]
};

export default userRoute;