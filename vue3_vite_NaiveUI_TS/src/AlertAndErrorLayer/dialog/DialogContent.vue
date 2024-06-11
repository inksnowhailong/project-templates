<script lang="ts" setup>
import { dialogMap } from './index'
</script>
<template>
  <div class="dialog-content">
    <KeepAlive>
      <component :is="item[1].vNode" v-for="item in dialogMap" :key="item[0]"></component>
    </KeepAlive>
  </div>
</template>
<style lang="less" scoped></style>
