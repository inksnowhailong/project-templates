import { mainStore } from '@/store/modules/mainStore'
import { Router } from 'vue-router'

/**
 * @description: 路由拦截器
 * @return {*}
 */
export default function permission(router: Router) {
  /**
   * @description: 路由拦截器
   * @param {*} async
   * @param {*} from
   * @param {*} next
   * @return {*}
   */
  router.beforeEach((to, from, next) => {
    if (!router.hasRoute(to.name as string)) {
      next('/404')
    } else {
      next()
    }
  })

  router.afterEach((to) => {
    if (to.meta && to.meta.title) {
      document.title = to.meta.title as string
    } else {
      document.title = mainStore.systemName
    }
  })
}
