<script setup lang="ts">
import { SkeletonProps } from './baseSkeleton'

const props: SkeletonProps = withDefaults(defineProps<SkeletonProps>(), {
  animated: true,
  repeat: 2,
  text: false,
  sharp: true,
  height: '20px'
})
/**
 * 加载骨架屏
 */
</script>

<template>
  <div class="vSkeleton">
    <n-space vertical>
      <n-skeleton v-for="(item, index) in repeat" :key="index" v-bind="{ ...props, repeat: 1 }"></n-skeleton>
    </n-space>
  </div>
</template>

<style scoped lang="less">
.vSkeleton {
  width: 100%;
  height: 100%;
}
</style>
