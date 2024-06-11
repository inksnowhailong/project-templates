<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="ErrorPage">
    <n-result status="403" title="403 禁止访问" description="联系管理员添加权限">
      <template #footer>
        <n-button @click="router.push('/')">返回首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped lang="less">
.ErrorPage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
