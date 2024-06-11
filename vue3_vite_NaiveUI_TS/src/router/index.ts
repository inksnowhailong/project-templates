import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from 'vue-router'
import permission from './permission'
// 扩展hidden router受到RouteRecordRaw类型约束
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

/**
 *
 *  meta:{
 *    noCache: false   是否使用keep-alive缓存默认缓存 设置true时则不会缓存
 *  }
 */

/**
 * @description 公共路由
 */

const publicRoutes: any[] = []
/**
 * @description 私有路由表
 */
const privateRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/layout.vue'),
    meta: {
      title: 'layout'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/demo/index.vue'),
        meta: {
          title: 'demo页面'
        }
      }
    ]
  }
]
const router = createRouter(<RouterOptions>{
  history: createWebHistory(),
  routes: [...publicRoutes, ...privateRouter] as AppRouteRecordRaw[], // 扩展后的ts类型进行断言
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

router.onError((error) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.$message('error', '页面已发新版，请强刷页面或清空缓存', { duration: 5000 })
    // window.location.reload()
  }
})
//添加路由拦截器
permission(router)
export default router
