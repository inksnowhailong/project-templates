export type IframeMessageType = {
  /**任务类型  用于接收放，判定要执行的任务*/
  type: string
  /**任务介绍 只有首次设置有效 */
  desc?: string
  /**任务数据 */
  data: any
}

/**
 * @description: 要触发的任务函数类型
 * @param {MessageEvent} event
 * @return {*}
 */
export type IframeMethodType = (event: MessageEvent<IframeMessageType>) => void

/**
 * @description: iframe通信总线
 * @return {*}
 */
export class IframeBus {
  /**读取到的配置信息 */
  config: Record<string, any> = {}
  /**
   * @description: 容器，用于记录iframe要发送的任务,开发者可以提前写入一些任务，
   * @return {*}
   */
  iframeTaskObj: Record<string, string> = {
    iframeTaskInfo: '当前window内iframe任务信息'
  }

  /**
   * @description: 事件容器，用于储存，监听iframe要执行的任务
   * @param {any} data
   * @return {*}
   */
  iframeMethods: Record<string, IframeMethodType> = {}

  /**
   * @description: 初始化
   * @param {Record} config 一些配置信息
   * @param {Record} iframeTaskObj  发出任务容器，用于记录iframe将会发送的任务信息,开发者可以提前写入一些预制任务
   * @param {Record} iframeMethods 事件容器，用于储存，监听iframe要执行的任务
   * @return {*}
   */
  constructor(config?: Record<string, any>, iframeTaskObj?: Record<string, string>, iframeMethods?: Record<string, IframeMethodType>) {
    if (iframeTaskObj) {
      this.iframeTaskObj = Object.assign(this.iframeTaskObj, iframeTaskObj)
    }
    if (iframeMethods) {
      this.iframeMethods = Object.assign(this.iframeMethods, iframeMethods)
    }
    if (config) {
      this.config = Object.assign(this.config, config)
    }

    this.ListenerHandler = this.ListenerHandler.bind(this)
  }

  /**
   * @description: 向指定window 发送信息，用于iframe通信
   * @param {IframeMessageType} data 要发送的任务类型，和数据
   * @param {*} targetWindow 目标窗口，默认是window.parent,也就是父级窗口
   * @param {*} targetOrigin 目标窗口的源，可以是字符串'*'，也可以是具体的url，当需要发送给父级的另一个子级iframe时候会有用,为了安全，最好指定它
   * @return {*}
   */
  emit(data: IframeMessageType, targetWindow = window.parent, targetOrigin = '*') {
    if (!this.iframeTaskObj[data.type]) {
      this.iframeTaskObj[data.type] = data.desc || '暂未配置相关信息'
    }
    targetWindow.postMessage(
      {
        type: 'iframeTaskInfo',
        desc: `${origin}内iframe任务信息 `,
        data: {
          iframeTaskObj: this.iframeTaskObj,
          currentTask: data.type
        }
      },
      '*'
    )
    targetWindow.postMessage(data, targetOrigin)
  }

  /**
   * @description: 注册监听函数，用于bus去处理指定类型的任务
   * @param {string} type 任务类型
   * @param {function} callback 任务函数
   * @return {*}
   */
  on(type: string, callback: (event: MessageEvent<IframeMessageType>) => void) {
    this.iframeMethods[type] = callback
  }

  /**
   * @description: 全局的message事件，用于监听iframe发送的任务，并进行处理
   * @param {MessageEvent} event
   * @return {*}
   */
  protected ListenerHandler(event: MessageEvent<IframeMessageType>) {
    const type = event.data?.type
    if (!type) {
      if (this.config.listen === 'all') {
        console.log('接收到无任务类型的信息', event)
      }
      return
    }
    this.iframeMethods[type]?.(event)
  }

  /**
   * @description: 初始化安装此bus
   * @param {*} IframeMethodType
   * @return {*}
   */
  iframeBusInstall() {
    window.addEventListener('message', this.ListenerHandler)
  }

  /**
   * @description: 卸载bus
   * @return {*}
   */
  iframeBusUninstall() {
    if (this.config.clear) {
      this.iframeTaskObj = {
        iframeTaskInfo: '当前window内iframe任务信息'
      }
      this.iframeMethods = {}
    }
    window.removeEventListener('message', this.ListenerHandler)
  }
}
