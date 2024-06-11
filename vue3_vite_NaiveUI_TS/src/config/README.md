## IframeBus

方便的进行父子级、兄弟级的页面交互，在使用iframe嵌套网页的情况下，将以此作为标准规范

### 父传子情况

#### 父系统

```typescript
<script lang="ts" setup>
const tagretIframe = ref<HTMLIFrameElement>()
onMounted(() => {
  iframeBus.emit(
    {
      type: 'setIframe', //任务标识 用于双向识别
      data: 'xxxx', // 传递的数据
      desc: '测试用的' // 描述 只有第一次执行，才能正确设置setIframe的desc，但是建议在config中提前配置,不要传递这个参数
    },
    tagretIframe.value?.contentWindow as Window
  )
})
</script>
<template>
  <iframe src="xxxx" ref="tagretIframe" frameborder="0"></iframe>
</template>
```

#### 子系统

```typescript
<script lang="ts" setup>
// 根据标识 执行特定函数
iframeBus.on('setIframe', (event) => {
  console.log('event', event)
  console.log('data', event.data) //接收传递的数据
})
</script>
```

### 子传父

#### 子系统

```typescript
<script lang="ts" setup>
onMounted(() => {
/** 默认不写第二个参数，就是传给父级 */
  iframeBus.emit(
    {
      type: 'setIframe', //任务标识 用于双向识别
      data: 'xxxx', // 传递的数据
      desc: '测试用的' // 描述 只有第一次执行，才能正确设置setIframe的desc，但是建议在config中提前配置,不要传递这个参数
    }
  )
})
</script>
```

#### 父系统

同上父传子中的子系统

#### 监听全部变更来测试

所有发送的任务，都会同时发送一个 type 为 iframeTaskInfo 的任务，可以接收此type的任务，用于测试
