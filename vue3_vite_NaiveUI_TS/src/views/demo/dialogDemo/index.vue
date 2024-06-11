<script lang="ts" setup>
import { showDialog } from '@/AlertAndErrorLayer/dialog'

// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
const xjTest = async () => {
  const res = await showDialog(() => import('./testDialog.vue'), {
    keepAlive: false
  })
  console.log(res)
}
const xjTestAlive = async () => {
  const res = await showDialog(() => import('./testDialogAlive.vue'), {
    keepAlive: true
  })
}
const styleConfig = computed(() => {
  return {
    color: 'red',
    otherColor: 'orange'
  }
})
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="demo">
    我是demo页面
    <n-button @click="xjTest">点我出弹窗</n-button>
    <n-button @click="xjTestAlive">点我出弹窗（缓存版）</n-button>
  </div>
</template>
<style lang="less" scoped></style>
