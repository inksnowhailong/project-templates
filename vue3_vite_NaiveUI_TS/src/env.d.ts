/// <reference types="vite/client" />
/// <reference types="@xj-monorepo/prettier/types" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  [propName: string]: any
}
