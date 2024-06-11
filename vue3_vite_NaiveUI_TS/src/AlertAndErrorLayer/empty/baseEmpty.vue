<script setup lang="ts">
import { NEmpty } from 'naive-ui'
import type { EmptyProps } from './empty'
const props = withDefaults(
  defineProps<
    {
      visible: boolean
    } & EmptyProps
  >(),
  {
    description: '暂无数据',
    showDescription: true,
    showIcon: true,
    size: 'medium'
  }
)
/*
这么做 很疑惑，像是完全让empty组件失去了意义
其实际目的，是在不同项目中，直接修改这个组件的插槽内容，来达到不同项目，不同缺省图的效果
*/
</script>

<template>
  <div class="empty" v-if="visible">
    <n-empty v-bind="props"></n-empty>
  </div>
</template>

<style scoped lang="less">
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
