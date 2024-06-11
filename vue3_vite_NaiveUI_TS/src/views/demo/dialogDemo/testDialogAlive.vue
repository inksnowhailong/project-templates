<script lang="ts" setup>
import { showDialog } from '@/AlertAndErrorLayer/dialog'

// #region ********** 通用部分 start **************/
defineProps<{
  content: string
}>()
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/

const testValue = ref('1')

// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <BaseDialog title="测试弹窗">
    <div class="test">
      <span>测试缓存-开启:</span>
      <n-input v-model:value="testValue" />
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
