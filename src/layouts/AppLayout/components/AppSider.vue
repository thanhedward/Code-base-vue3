<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
    class="sider"
  >
    <div class="sider__logo">
      <img class="sider__logo__image" src="../../../../src/assets/logo.svg" alt="logo" />
      <div class="sider__logo__text">Vue3 Base</div>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
    >
      <template v-for="config in menuConfig">
        <a-menu-item
          v-if="!config.children"
          :key="`item-${config.routeName}`"
          @click="navigate(config.routeName)"
        >
          <component :is="config.icon" />
          <span>{{ $t(config.title) }}</span>
        </a-menu-item>

        <a-sub-menu
          v-else
          :key="`submenu-${config.routeName}`"
        >
          <template #title>
            <span>
              <component :is="config.icon" />
              <span>{{ config.title }}</span>
            </span>
          </template>
          <a-menu-item
            v-for="subConfig in config.children"
            :key="subConfig.routeName"
            @click="navigate(subConfig.routeName)"
          >
            {{ subConfig.title }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import router from '@/router';
import { DashboardOutlined } from "@ant-design/icons-vue";
import { UserOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "AppSider",
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "global",
    });

    // State
    const collapsed = ref(false);
    const selectedKeys = ref(["1"]);
    const menuConfig = ref([
      {
        routeName: "/dashboard",
        title: "Dashboard",
        icon: DashboardOutlined,
      },
      {
        routeName: "/users",
        title: "User",
        icon: UserOutlined,
      },
    ]);

    // Methods
    const navigate = (routeName) => {
      router.push(routeName);
    };

    return {
      t,
      collapsed,
      selectedKeys,
      menuConfig,
      navigate,
    };
  },
});
</script>

<style scoped lang="less">
.sider {
  &__logo {
    // color: white;
    color: white;
    padding: 16px;
    display: flex;
    justify-content: center;
    &__image {
      width: 32px;
    }
    &__text {
      font-size: 20px;
      font-weight: bold;
      margin-left: 12px;
    }
  }
}
</style>