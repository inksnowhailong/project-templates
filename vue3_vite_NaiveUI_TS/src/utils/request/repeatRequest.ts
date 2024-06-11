import axios, { AxiosRequestConfig } from 'axios'

/**
 * @description: 重复请求处理类
 * @return {*}
 */
export class RepeatRequest {
  // 用于存储每个请求的标识和取消函数
  pendingMap = new Map()

  /**
   * @description: 储存每个请求的唯一cancel回调, 以此为标识
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  addPending(config: AxiosRequestConfig) {
    const pendingKey = this.getPendingKey(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(pendingKey)) {
          this.pendingMap.set(pendingKey, cancel)
        }
      })
  }

  /**
   * @description: 删除重复的请求
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  removePending(config: AxiosRequestConfig) {
    const pendingKey = this.getPendingKey(config)
    if (this.pendingMap.has(pendingKey)) {
      const cancelToken = this.pendingMap.get(pendingKey)
      // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
      // error信息 === pendingKey
      cancelToken(pendingKey)
      this.pendingMap.delete(pendingKey)
    }
  }

  /**
   * @description: 生成唯一的每个请求的唯一key
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  getPendingKey(config: AxiosRequestConfig) {
    const { url, method, params } = config
    let { data } = config
    if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
  }
}
