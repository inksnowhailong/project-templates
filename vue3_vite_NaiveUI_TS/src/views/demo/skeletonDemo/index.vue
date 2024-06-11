<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const xjTestValue = ref(false)
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="skeleton-demo">
    <NSpace>
      <span>我是show的值:{{ xjTestValue }}</span>
      <NSwitch v-model:value="xjTestValue"></NSwitch>
    </NSpace>
    <div
      class="xj-test"
      v-skeleton="{
        show: xjTestValue
      }"
    >
      我测试下这个蒙层效果
    </div>
  </div>
</template>
<style lang="less" scoped>
.xj-test {
  height: 300px;
}
</style>
