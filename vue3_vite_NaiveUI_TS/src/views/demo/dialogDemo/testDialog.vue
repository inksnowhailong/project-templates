<script lang="ts" setup>
import { showDialog } from '@/AlertAndErrorLayer/dialog'

// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
defineProps<{
  content: string
}>()
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
function xjTestPositive() {
  // return false
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        label: '这是我要返回的数据',
        value: 1008611
      })
    }, 2000)
  })
}
const testValue = ref('1')
const testValue1 = ref('')
const testValue2 = ref('')
const testValue3 = ref('')
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <BaseDialog title="测试弹窗" showAction positiveText="测试正向按钮" negativeText="测试反向按钮" @positiveClick="xjTestPositive">
    <template #header>
      <div>我这里会是头部吗</div>
    </template>
    <div class="test">
      <span>测试缓存-关闭:</span>
      <n-input v-model:value="testValue" />
    </div>
    <div class="test">
      <span>我接受外部内容:</span>
      <span>{{ content }}</span>
    </div>
    <div class="test">
      <span>我在弹窗内再打开一个弹窗:</span>
      <n-button type="primary" @click="showDialog(() => import('./testDialogTwo.vue'))">点我~</n-button>
    </div>
  </BaseDialog>
</template>
<style lang="less" scoped>
.test {
  // height: 100px;
  // height: 800px;
  border: 1px solid #87ceeb;
}
</style>
