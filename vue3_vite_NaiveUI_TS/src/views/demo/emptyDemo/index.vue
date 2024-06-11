<script lang="ts" setup>
import { NSwitch } from 'naive-ui'

const data = ref(true)
const xjTestValue = ref(false)
const arr = ref<any>(undefined)
watch(
  () => xjTestValue.value,
  (newV) => {
    if (newV) {
      arr.value = [1, 2, 3, 4]
    } else {
      arr.value = undefined
    }
    console.log(newV)
  }
)
</script>
<template>
  <div class="empty-demo">
    <div
      class="item"
      v-empty="{
        description: '我里面空的，所以自动v-empty'
      }"
    ></div>
    <div
      class="item"
      v-empty="{
        description: '我里面被v-if隐藏，所以自动v-empty'
      }"
    >
      <div class="xj-test" v-if="false">我上述看</div>
      <div class="xj-test" v-if="false">我上述看</div>
    </div>
    <NSpace>
      <span>我是show的值:{{ xjTestValue }}</span>
      <NSwitch v-model:value="xjTestValue"></NSwitch>
    </NSpace>
    <div
      class="item"
      v-empty="{
        description: '我被show属性强制启动v-empty',
        show: xjTestValue
      }"
    >
      里面的内容B
    </div>
  </div>
</template>
<style lang="less" scoped>
.item {
  padding: 24px;
}
</style>
