import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { AuthUser } from '@/types/interfaces/auth';
import localStorageService from '@/utils/localStorageService';
import { store } from '@/stores';

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<AuthUser>();
  const token = localStorageService.getAccessToken();

  const isAuthenticated = computed(() => authUser.value !== undefined);
  const isPasswordExpired = ref<boolean>(false);
  const handleRefreshToken = () => {
    // return refreshToken()
    //   .then((response) => {
    //     const { token } = AuthSchema.parse(response);
    //     localStorageService.setAccessToken(token);
    //     return { token };
    //   })
    //   .catch((error) => {
    //     clearAuthInfo();
    //     router.push('/login');

    //     return Promise.reject(error);
    //   });

    const clearAuthInfo = () => {
      authUser.value = undefined;
      localStorageService.clearAccessToken();
      // localStorageService.clearDisplayLanguage();
    };
  
    return {
      authUser,
      isAuthenticated,
      handleRefreshToken,
      clearAuthInfo
      // getAuthInfo
    }
  };

});


export function useAuthStoreHook() {
  return useAuthStore(store);
}