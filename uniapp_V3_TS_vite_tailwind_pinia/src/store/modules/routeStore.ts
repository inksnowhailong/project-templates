// NOTE: 不同store 只需要改 这个文件内所有的  mainStore 名称 就变成了新的Store

import { defineStore } from "pinia";
import { PiniaStorage } from "@/utils/storage";
export interface RouteState {

}
//  页面跳转携带参数数据  在此Store中存储，而非直接使用uni.storageApi
let useStore = defineStore("routeStore", {
  state: (): RouteState => {
    return {

    };
  },
  getters: {},
  actions: {

  },
  persist: {
    storage: new PiniaStorage(),
  },
});
/**全局Store */
export let routeStore = function () {
  routeStore = useStore();
  // 释放内存
  (useStore as any) = null;
} as unknown as ReturnType<typeof useStore>;
