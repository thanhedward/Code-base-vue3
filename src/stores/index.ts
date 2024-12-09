import type { App } from 'vue';
import { createPinia } from 'pinia';
const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}
export { store };
export { useCounterStore } from './counter'
export { useUserStore } from './user'
export { useAppStore } from './app';
