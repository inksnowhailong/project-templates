// 1、定义状态容器
// 2、修改容器中的状态
// 3、仓库中的action的使用
import { createPinia } from 'pinia'
import { App } from 'vue'
// 引入Store
// 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const modules = import.meta.glob('./modules/*.ts', {
  eager: true
})
export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export const piniaInstall = (app: App) => {
  app.use(pinia)
  // 初始化所有store
  for (const path in modules) {
    const module: any = modules[path]
    const storeKey = path.split('/').at(-1)?.replace('.ts', '')
    storeKey && module[storeKey]()
  }
}
