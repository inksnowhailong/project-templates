// NOTE: 不同store 只需要改 这个文件内所有的  mainStore 名称 就变成了新的Store

import { defineStore } from "pinia";
import { PiniaStorage } from "@/utils/storage";

export interface MainState {

}
let useStore = defineStore("mainStore", {
  state: (): MainState => {
    return {
      /**系统名称 */
      systemName: "系统",

    };
  },
  getters: {
  },
  actions: {

  },
  persist: {
    storage: new PiniaStorage(),
  },
});
/**全局Store */
export let mainStore = function () {
  mainStore = useStore();
  // 释放内存
  (useStore as any) = null;
} as unknown as ReturnType<typeof useStore>;
