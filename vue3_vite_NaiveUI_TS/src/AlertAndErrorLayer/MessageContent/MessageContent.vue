<script setup lang="ts">
import { useMessage, MessageReactive, MessageOptions, MessageType } from 'naive-ui'
class AsyncQueue {
  public constructor(
    private queue: any[] = [],
    private running: boolean = false
  ) {}

  // 将任务添加到队列中
  public push(fun: any, duration: number, immediately = false) {
    return new Promise((resolve, reject) => {
      // 将传入的函数包装一层，添加到队列中
      if (this.queue.length === 0 && immediately) {
        this.queue.push(async () => {
          this.running = true
          try {
            const res = await fun()
            resolve(res)
          } catch (e) {
            reject(e)
          }
          this.running = false
          // 上一个任务完成后，移除队列中的第一个任务，并执行
          this.queue.shift()?.()
        })
      } else {
        this.queue.push(async () => {
          this.running = true
          await this.sleep(duration)
          try {
            const res = await fun()
            resolve(res)
          } catch (e) {
            reject(e)
          }
          this.running = false
          // 上一个任务完成后，移除队列中的第一个任务
          this.queue.shift()?.()
        })
      }
      // 如果当前没有任务在执行，则取出队列中的第一个任务执行
      if (!this.running) {
        this.queue.shift()?.()
      }
    })
  }

  // 延迟指定时间
  private sleep(t: number): Promise<any> {
    return new Promise((r) => setTimeout(r, t))
  }
}

/**
 * @description: window.$message(TMessageType, 显示内容, MessageOptions)
 * @param {*}
 * @return {*}
 */

// 在 window 对象上挂载 $message 方法，用于显示消息
const message: Message.MessageApiInjection = useMessage()
let msgReactive: MessageReactive | null = null
const removeMessage = () => {
  if (msgReactive) {
    msgReactive.destroy()
    msgReactive = null
  }
}
let timer: number | null = null
const notifyQueue = new AsyncQueue()
// messageFunc 的调用签名对应的方法
const messageFunc = (type: MessageType, content: Message.ContentType, options: MessageOptions = {}) => {
  const duration = options.duration || 3000
  notifyQueue
    .push(
      () => {
        if (msgReactive) {
          msgReactive.type = type
          msgReactive.content = content
        } else {
          options.duration = 0
          msgReactive = message[type as Message.TMessageType](content, options) as MessageReactive
        }
      },
      duration,
      true
    )
    .finally(() => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        removeMessage()
        timer = null
      }, duration)
      return msgReactive
    })
}
// 结合调用签名与对象签名
window.$message = Object.assign(messageFunc, message)
</script>
<template>
  <slot></slot>
</template>
