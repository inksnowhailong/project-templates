<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
//挂载在 window 在ts中直接使用
window.$loading = useLoadingBar()
</script>
<template>
  <slot></slot>
</template>
