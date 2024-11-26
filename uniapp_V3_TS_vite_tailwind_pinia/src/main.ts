import { createSSRApp } from "vue";
import { piniaInstall } from '@/store'
import * as Pinia from 'pinia';

import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(piniaInstall);
  return {
    app,
    Pinia
  };
}
