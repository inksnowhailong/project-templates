import { VNodeTypes } from 'vue'

/**
 * @param {any} theComponent 被导入的组件
 * 1.可以以import的函数形式引入
 * 2.可以使用被import后的组件
 * 3.后续支持props的类型提示
 * @return {*}
 */
export const loadComponent = (theComponent: any) => {
  return new Promise<VNodeTypes>((resolve) => {
    if (typeof theComponent === 'function') {
      // 如注释1描述
      theComponent().then((resp: any) => {
        resolve(resp.default)
      })
    } else {
      // 如注释2描述
      return resolve(theComponent)
    }
  })
}

// #region ********** dialog全局变量存储 start **************/
/** 单个弹窗Item实例 */
interface DialogItem {
  resolve?: any
  reject?: any
  vNode?: any
  keepAlive?: boolean
  visbile?: Ref<boolean>
}
export const dialogMap = ref<Map<any, DialogItem>>(new Map())
// #endregion ******* dialog全局变量存储 ~end~ **************/

interface ShowDialogProps {
  keepAlive?: boolean
}
/** 开启弹窗 */
export const showDialog = (theComponent: any, props: ShowDialogProps = {}) => {
  return new Promise((resolve, reject) => {
    loadComponent(theComponent).then((theComponent) => {
      const theVNode = h(theComponent as any, { ...props }, {})
      const __hmrId = (theVNode.type as any).__hmrId
      const theDialog = dialogMap.value.get(__hmrId)
      if (props.keepAlive && theDialog) {
        // console.log('我已经缓存起来了',dialogMap)
        theDialog.visbile = true
        return
      }
      dialogMap.value.set(__hmrId, {
        vNode: theVNode,
        resolve,
        reject,
        keepAlive: props.keepAlive
      })
    })
  }).catch((err) => {
    const moreMessage = err ? JSON.stringify(err) : ''
    return Promise.reject(`弹窗已取消，后续执行中止${moreMessage}`)
  })
}

/** 睡眠 */
const fsSleep = (sleeptime = 1, unit = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('完成sleep')
    }, sleeptime * unit)
  })
}

/** 弹窗开启后需要的公共方法 */
export const useFsDialog = () => {
  /** 弹窗visible控制 */
  const visible = ref(false)
  nextTick(() => {
    visible.value = true
  })

  let dialogItem: DialogItem
  const { proxy }: any = getCurrentInstance()
  /** 取消弹窗 */
  const cancelDialog = async (data: any = null) => {
    giftCurrentItem()
    dialogItem.reject(data)
    preClose()
  }
  /** 弹窗的确认操作 */
  const confirmDialog = async (data: any = null) => {
    giftCurrentItem()
    dialogItem.resolve(data)
    preClose()
  }
  /** 弹窗关闭的前置操作--用户确认和取消 */
  const preClose = async () => {
    /** 删除并隐藏 */
    visible.value = false
    /** naive-ui的弹窗0.2s消失 */
    await fsSleep(0.2)
    const theDialog = dialogMap.value.get(hmrId)
    if (!theDialog?.keepAlive) {
      dialogMap.value.delete(hmrId)
    }
  }
  /** 找到当前dialogItem */
  const giftCurrentItem = () => {
    dialogItem = dialogMap.value.get(hmrId) as DialogItem
    dialogItem.visbile = visible
  }

  /** 获取hmrId
   * 这个id就是经常在dom元素上看到data-v-cf73e079结尾的cf73e079
   * 可以理解为一个vue文件的唯一标识（我瞎猜的）
   */
  const hmrIdGet = () => {
    //获取父组件的hmrId
    let id = proxy._.parent?.type.__hmrId
    //如果dialogMap中存在该id，则返回该id
    if (dialogMap.value.get(id)) {
      return id
    }
    //获取当前组件的hmrId
    id = proxy._?.type.__hmrId
    //如果dialogMap中存在该id，则返回该id
    if (dialogMap.value.get(id)) {
      return id
    }
    //否则返回空字符串
    return ''
  }
  const hmrId = hmrIdGet()

  return {
    visible,
    cancelDialog,
    confirmDialog,
    hmrId
  }
}
