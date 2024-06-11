// NOTE: 不同store 只需要改 这个文件内所有的  userStore 名称 就变成了新的Store

let useStore = defineStore('userStore', {
  state: () => {
    return {
      /**token */
      token: ''
    }
  },
  getters: {},
  actions: {},
  persist: {
    storage: sessionStorage
  }
})
/**用户Store */
export let userStore = function () {
  userStore = useStore()
  // 释放内存
  ;(useStore as any) = null
} as unknown as ReturnType<typeof useStore>
