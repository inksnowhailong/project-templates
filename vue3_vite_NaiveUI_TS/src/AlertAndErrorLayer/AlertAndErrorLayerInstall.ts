import { DirectiveHook, App, render, Directive } from 'vue'
import baseEmptyVue from './empty/baseEmpty.vue'
import { Router } from 'vue-router'

/**
 * @description: 注册异常处理层相关内容
 * @param {*} app
 * @return {*}
 */
export default function (app: App<Element>, router: Router) {
  app.directive('empty', VEmpty)
  ErrorPage(router)
}

/**
 * @description: 缺省模块指令,判断内容满足任一条件时，显示empty组件
 * 可直接使用v-empty 不传递任何参数
 * 1.里面只剩被v-if隐藏的元素残骸<!--v-if-->或''
 * 2.v-empty绑定的值value===true 或者 value.show===true
 * @param {*} el
 * @param {*} binding
 * @param {*} vnode
 * @return {*}
 */
const VEmpty: DirectiveHook = (el: HTMLElement, binding, vnode) => {
  /** 初始化VEmpty */
  render(
    h(baseEmptyVue, {
      visible: false
    }),
    el
  )
  const emptyByVIf = el.innerHTML.replace(/<!--v-if-->/g, '') === '' // 此判断条件 只在dev模式有效，打包后就无效了,之后将被删除
  const value = binding.value
  // 判断内容满足1,2任一条件时，显示empty组件，就渲染缺省组件
  let emptyVisible = el.children.length === 0 || emptyByVIf || value === true
  if ('show' in value) {
    emptyVisible = value.show
  }
  render(
    h(baseEmptyVue, {
      ...binding.value,
      visible: emptyVisible
    }),
    el
  )
}

/**
 * @description: 错误页面
 * @param {Router} router
 * @return {*}
 */
const ErrorPage = (router: Router) => {
  // 404页面
  router.addRoute({
    path: '/404',
    name: '404',
    component: () => import('./Result/404.vue'),
    meta: {
      title: '404'
    }
  })
  router.addRoute({
    path: '/403',
    name: '403',
    component: () => import('./Result/403.vue'),
    meta: {
      title: '403'
    }
  })
}
