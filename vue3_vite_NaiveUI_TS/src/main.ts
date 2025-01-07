import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { piniaInstall } from '@/store'
import '@/router/permission'
import '@/styles/index.less'
import AlertAndErrorLayerInstall from './AlertAndErrorLayer/AlertAndErrorLayerInstall'
import config from '@/config/install'
import 'virtual:uno.css'

const app = createApp(App)
app.provide('theme', 'dark')
app.config.warnHandler = () => null
/**此处顺序不能乱改 */
app
  .use(config, router) // 配置与预处理
  .use(AlertAndErrorLayerInstall, router) // 消息与异常处理
  .use(piniaInstall) // 状态管理
  .use(router)
  .mount('#app')
