<script lang="ts" setup>
// #region ********** 引入 start **************/

import { ref, useAttrs } from 'vue'
import { DialogProps, ModalProps } from 'naive-ui'
import { useFsDialog } from '@/AlertAndErrorLayer/dialog'
import { CSSProperties } from 'vue'
// #endregion ******* 引入 ~end~ **************/

// #region ********** define区域 start **************/
defineOptions({
  // 处理naive-ui源码部分组件集成attrs的问题
  inheritAttrs: false
})
const { visible, confirmDialog, cancelDialog, hmrId } = useFsDialog()

const state = reactive({
  /** 确认按钮的loading */
  loading: false
})

/**
 * @description: 目前由于vue官方问题，外部类型无法直接作用于在defineProps的根层级，即defineProps<{ModalProps}>()会报错。
 * https://github.com/vuejs/core/issues/8286
 * 解决步骤
 * 1.@vue-ignore（会导致withDefaults的外部类型ModalProps的默认值不生效）
 * 2.通过useAttrs手动模拟withDefaults
 * 存在问题
 * 1.attrs会存在于dom元素上
 */
interface BaseDialogSelf {
  showAction?: boolean
  width?: string
  maxHeight?: string
  minHeight?: string
  background?: string
}
interface Props extends /** @vue-ignore */ Omit<ModalProps & DialogProps, 'show'>, BaseDialogSelf {}

const attrs: ModalProps & DialogProps = useAttrs()
/** 此处写弹窗组件BaseDialog自己的默认值
 * 样式参数和控制参数打平写一起了，直观点（不是懒~）
 */
const props = withDefaults(defineProps<Props>(), {
  showAction: false,

  width: '1016px',
  maxHeight: '90vh',
  minHeight: 'initial',
  background: '#fff'
})

/** 此处写naive-ui ModalProps的默认值 */
const valueCalc = computed(() => {
  const attrsInner = { ...attrs }
  const { onPositiveClick, onNegativeClick } = attrsInner
  delete attrsInner.onPositiveClick
  delete attrsInner.onNegativeClick

  const defaultProps: ModalProps & DialogProps = {
    autoFocus: false,
    preset: 'dialog',
    closable: true,
    showIcon: false,
    title: '弹窗',
    // loading: false,
    loading: state.loading,
    negativeButtonProps: {
      size: 'medium'
    },
    positiveButtonProps: {
      size: 'medium'
    },
    maskClosable: true,
    // #tips 此处往下不建议修改
    to: `.base-dialog`, //
    // to: `#${hmrId}`, // 不设置这个会导致v-bind的css无效
    onPositiveClick() {
      if (onPositiveClick) {
        state.loading = true
        return Promise.resolve(onPositiveClick()).then((result) => {
          if (result === false) return
          confirmDialog(result)
        })
      } else {
        confirmDialog()
      }
    },
    onNegativeClick() {
      if (onNegativeClick) {
        return Promise.resolve(onNegativeClick()).then((result) => {
          if (result === false) return
          cancelDialog()
        })
      } else {
        cancelDialog()
      }
    },
    // 这俩click参数暂不支持传入，有需求再找我
    onMaskClick() {
      if (defaultProps.maskClosable) {
        cancelDialog()
      }
    },
    // 这俩click参数暂不支持传入，有需求再找我
    onClose() {
      cancelDialog()
    }
  }
  return {
    ...defaultProps,
    ...props,
    ...attrsInner
  }
})

// #endregion ******* define区域 ~end~ **************/

// #region ********** 样式处理中心 start **************/
/** 目前只支持亮色模式，下次一定配置双色
 * 有需求自己先改改
 */
const styleConfig = computed(() => {
  /** 哎，懒死了， */
  return props as BaseDialogSelf
  // return {
  //   width: props.width,
  //   minWidth: props.minWidth,
  //   maxHeight: props.maxHeight,
  //   minHeight: props.minHeight,
  //   background: props.background
  // }
})
// #endregion ******* 样式处理中心 ~end~ **************/

// #region ********** 缓存弹窗处理 start **************/
onActivated(() => {
  console.log('我燃起了')
})
// #endregion ******* 缓存弹窗处理 ~end~ **************/

// #region ********** 处理弹窗交互 start **************/
/** 处理cancel逻辑 */
const $slots = useSlots()
onMounted(() => {})
// #endregion ******* 处理弹窗交互 ~end~ **************/
</script>
<template>
  <div class="base-dialog" :id="hmrId">
    <n-modal v-model:show="visible" v-bind="valueCalc">
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #default>
        <slot name="default"></slot>
      </template>
      <template v-if="showAction" #action>
        <!-- <n-space>
        <slot name="action" v-bind="{ confirmDialog, cancelDialog, confirmLoading }">
          <n-button @click="handleCancel">取消</n-button>
          <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确认</n-button>
        </slot>
      </n-space> -->
      </template>
    </n-modal>
  </div>
</template>
<style lang="less">
.base-dialog {
  .n-modal {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: v-bind('styleConfig.width');
    max-height: v-bind('styleConfig.maxHeight');
    min-height: v-bind('styleConfig.minHeight');
    .n-dialog__title {
      font-weight: bold;
    }
    .n-dialog__content {
      overflow-y: auto;
      flex: 1;
    }
    .n-dialog__action {
      margin-top: 16px;
    }
  }
}
</style>
<style lang="less" scoped></style>
