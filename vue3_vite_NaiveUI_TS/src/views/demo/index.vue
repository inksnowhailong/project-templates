<script lang="ts" setup>
// #region ********** 通用部分 start **************/
const allFiles = import.meta.glob('./**/index.vue', {
  eager: true
})
/** 读取第一子层级的index.vue，并作为顶部tabs加入 */

const demoOptionsCalc = computed(() => {
  return Object.entries(allFiles).map((mi) => {
    /** 这里一定有的，空字符串的处理仅用于ts校验 */
    const name = mi[0].match(/\.\/(\w+)/)?.[1] || ''
    return {
      name,
      component: (mi[1] as any).default
    }
  })
})
const currentDemoName = ref()
const currentDemoCalc = computed(() => {
  return demoOptionsCalc.value.find((fi) => fi.name === currentDemoName.value)
})
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 初始化相关 start **************/
/** 开始初始化 */
const startInit = () => {
  currentDemoName.value = demoOptionsCalc.value[0].name
}
onMounted(() => {
  startInit()
})
// #endregion ******* 初始化相关 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="demo">
    <n-tabs type="card" v-model:value="currentDemoName" size="small">
      <n-tab :name="tab.name" v-for="tab in demoOptionsCalc" :key="tab.name">
        {{ tab.name }}
      </n-tab>
    </n-tabs>
    <component :is="currentDemoCalc?.component"></component>
  </div>
</template>
<style lang="less" scoped>
.demo {
}
</style>
