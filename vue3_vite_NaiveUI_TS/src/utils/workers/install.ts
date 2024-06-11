/**
 * @description: 创建一个类，用于处理http请求，页面中一些后续可能用到的数据，可以加入到这个类中，自带在后台闲暇请求，当页面需要时候，直接拿到数据，不用再等
 * @return {*}
 */
export class HttpDataWorker {
  /**worker实例 */
  httpDataWorker: Worker
  /**请求容器 */
  RequestContainer: Record<
    string,
    {
      Promise: Promise<any>
      resolve: (value: any) => void
    }
  > = {}
  constructor() {
    this.httpDataWorker = new Worker(new URL('./httpDataWorker.ts', import.meta.url), { type: 'module' })
    this.httpDataWorker.onmessage = (e) => {
      // 执行resolve返回这些数据给页面
      e.data.onlyKey && this.RequestContainer[e.data.onlyKey].resolve(e.data.data)
    }
  }
  workerTask<T>(path: string, data: any[], restart = false) {
    const onlyKey = JSON.stringify({
      path,
      data
    })
    if (this.RequestContainer[onlyKey] && !restart) {
      // 如果请求已经发送过了，直接返回promise
      return this.RequestContainer[onlyKey].Promise
    }

    // 向Worker发送消息
    this.httpDataWorker.postMessage({ path, data, onlyKey })
    // 储存一个Promise，当Worker返回数据时，执行resolve
    let customResolve: (value: T | PromiseLike<T>) => void = () => {}
    const customPromise = new Promise<T>((resolve) => {
      customResolve = resolve
    })
    // 向容器中添加这个promise 和其对应的完成函数
    this.RequestContainer[onlyKey] = {
      Promise: customPromise,
      resolve: customResolve
    }
    // 返回这个Promise
    return customPromise
  }
  close() {
    this.httpDataWorker.terminate()
    this.RequestContainer = {}
  }
}

const hworder = new HttpDataWorker()

export default hworder
/*

import hworder from '@/utils/workers/install'
hworder.workerTask('home', ['1123']).then((res) => {
  console.log('home', res)
})


*/
