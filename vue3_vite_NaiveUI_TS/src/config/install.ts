import { App } from 'vue'
import { Router } from 'vue-router'
import { IframeBus } from './iframeBus'
import { config } from './config'
// 创建一个 iframe 实例
export const iframeBus = new IframeBus(config.iframeBus, config.iframeBus.iframeTaskObj, config.iframeBus.iframeMethods)

export default function (app: App, router: Router) {
  /**项目信息 */
  window.$info = () => {
    const userInput = window.prompt('请输入内容访问key：')
    if (userInput === config.info.access) {
      console.log(config.info)
    }
  }
  /** iframe 事件总线 */
  if (config.iframeBus.enable) {
    iframeBus.iframeBusInstall()
  }
  /**安全防护 xss */
  if (config.safe.xss.csp.enable) {
    const meta = document.createElement('meta')
    meta.setAttribute('http-equiv', config.safe.xss.csp['http-equiv'])
    meta.setAttribute('content', config.safe.xss.csp['content'])
    document.head.appendChild(meta)
  }
  /**安全防护 点击劫持 */
  if (config.safe.clickjack.enable) {
    // 检查顶级窗口的源是否在白名单中
    const isWhitelisted = config.safe.clickjack.iframeWhitelist.some((domain) => window.top?.location.origin === domain)
    // 如果顶级窗口的源不是当前窗口的源，且也不在白名单中，则将页面重定向到顶级窗口
    if (window.top && window.top !== window.self && !isWhitelisted) {
      window.top.location = window.self.location
    }
  }
  /**可视化 */
  if (config.visual.enable) {
    const autoScale = reactive({
      wScale: 1,
      hScale: 1,
      orgin: '0% 0% 0'
    })
    app.provide('autoScale', autoScale)
    /**
     * @description: 适配终端
     * @return {*}
     */
    const getScale = () => {
      const nDefault_width = config.visual.width
      const nDefault_height = config.visual.height
      const nClient_width = document.documentElement.clientWidth
      const nClient_height = document.documentElement.clientHeight
      const nAuot_width = nClient_width / nDefault_width
      const nAuot_height = nClient_height / nDefault_height
      return {
        wScale: nAuot_width,
        hScale: nAuot_height
      }
    }
    const listener = () => {
      const { wScale, hScale } = getScale()
      autoScale.wScale = wScale
      autoScale.hScale = hScale
      /** app 的存在监测 */
      const app = document.getElementById('app')
      if (!app) return console.error('未找到app节点')
      /** 额外的节点处理 */
      // 创建一个新的 <style> 元素
      const style = document.createElement('style')
      const nodesCss = config.visual.ortherNodes.reduce((pre, cur) => {
        return (
          pre +
          `${cur.select} {
              transform-origin: ${cur.transformOrigin || autoScale.orgin};
              transform: scale(${autoScale.wScale},${autoScale.hScale});
            }`
        )
      }, '')
      // 设置 CSS 代码
      style.textContent = `
        body {
          #app{
            transform-origin: ${autoScale.orgin};
            transform: scale(${autoScale.wScale},${autoScale.hScale});
            width: ${config.visual.width}px;
            height: ${config.visual.height}px;
          }
           ${nodesCss}
        }`

      // 将 <style> 元素添加到 <head> 元素
      document.head.appendChild(style)
    }

    if (config.visual.onresize) window.addEventListener('resize', listener, false)
    if (config.visual.onload) window.addEventListener('load', listener, false)
  }
  /**eruda 移动端调试工具 */
  if (config.mobile.eruda) {
    const src = '//cdn.bootcdn.net/ajax/libs/eruda/3.0.1/eruda.min.js'

    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
      window.eruda.init()
    }
  }
}
