// NOTE: 不同store 只需要改 这个文件内所有的  mainStore 名称 就变成了新的Store

let useStore = defineStore('mainStore', {
  state: () => {
    return {
      /**系统名称 */
      systemName: '基线-管理系统',
      /**主题 */
      theme: 'light' as 'dark' | 'light'
    }
  },
  getters: {},
  actions: {},
  persist: {
    storage: sessionStorage
  }
})
/**全局Store */
export let mainStore = function () {
  mainStore = useStore()
  // 释放内存
  ;(useStore as any) = null
} as unknown as ReturnType<typeof useStore>
