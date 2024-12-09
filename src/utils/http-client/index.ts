import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
  type Method
} from 'axios';
import { stringify } from 'qs';
import { useAuthStore } from '@/stores/auth.store';
import localStorageService from '@/utils/localStorageService';
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue';
import router from '@/router';
import { useAuthStoreHook } from '@/stores/auth.store';
import { responseErrorMessage } from '@/utils';
import { sleep } from '@/utils/index'

const { t } = useI18n()


interface HttpClientRequestConfig extends AxiosRequestConfig {
  url: string;
}

type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>;

let currentDate = new Date();
const timeExpires = 60 * 60 * 1000;
currentDate.setTime(currentDate.getTime() + timeExpires);
// try {
//   const result = await Axios.get('https://api.ipify.org?format=json');
//   IP = result.data.ip;
// } catch (error) {
//   IP = '';
// }
const defaultConfig: AxiosRequestConfig = {
  // timeout: 20000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Expires': currentDate.toUTCString(),
    'Pragma': 'no-cache',
    'Cache-Control': 'no-store'
  },
  baseURL: import.meta.env.VUE_APP_DOMAIN_API,
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  },
  withCredentials: false
};

class HttpClient {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static requests: Function[] = [];
  private static isRefreshing = false;
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
  private static readonly whiteList: string[] = ['/token', '/login'];

  private httpInterceptorsRequest(): void {
    HttpClient.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorageService.getAccessToken();
        config.headers['x-access-token'] = `${token}`;
        config.headers['locale'] = localStorageService.getDisplayLanguage();
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private httpInterceptorsResponse(): void {
    HttpClient.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const { response, config } = error;
        if (
          error.response &&
          error.response.data &&
          error.response.data.statusCode === 403 &&
          error.response.data.message === t('common.ip_address_not_permission')
        ) {
          responseErrorMessage(error.response.data.message);
          useAuthStore().clearAuthInfo();
          window.location.replace('/ip-not-permission');
          return;
        }
        if (response?.status === 401) {
          /***
           * await here and show message for user before redirect
           */
          responseErrorMessage(response?.data?.message)
          await sleep(3000);
          let pathLogin = 'login';
          useAuthStore().clearAuthInfo();
          window.location.replace(pathLogin);
          return Promise.reject(error);
        } else if(error && error.code === 'ERR_NETWORK') {
          if (useAuthStore().authUser) {
            responseErrorMessage(t('common.network_disconnect'));
          } else {
            responseErrorMessage(t('login.errors.errorLogin'));
            window.location.reload();
          }
          return Promise.reject(error);
        } else if (response?.status === 503) {
          useAuthStore().clearAuthInfo();
          return window.location.replace('/out-of-service');
        } else {
          const $error = error;
          $error.isCancelRequest = Axios.isCancel($error);
          return Promise.reject($error);
        }
      }
    );
  }
  private subscribeTokenRefresh(cb: Function) {
    HttpClient.requests.push(cb);
  }

  private onRefreshed(token: string) {
    HttpClient.requests.map((cb) => cb(token));
    HttpClient.requests = [];
  }

  private getNewToken() {
    useAuthStore()
      .handleRefreshToken()
      .then(({ token }) => {
        this.onRefreshed(token);
      })
      .catch(() => {
        HttpClient.requests = [];
        window.location.href = '/login';
      })
      .finally(() => {
        HttpClient.isRefreshing = false;
      });
  }

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpClientRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as HttpClientRequestConfig;

    return HttpClient.axiosInstance.request(config);
  }

  public post<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('post', url, params, config);
  }

  public get<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('get', url, params, config);
  }

  public upload<T>(url: string, params?: AxiosRequestConfig) {
    const uploadConfig: HttpClientRequestConfig = {
      url: import.meta.env.VUE_APP_DOMAIN_API + url,
      timeout: 60000 * 10,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    return this.request<T>('post', url, params, uploadConfig);
  }
}

export const http = new HttpClient();
