<script lang="ts" setup>
const srcdata = [
  {
    label: 'AlertAndErrorLayer',
    key: 'AlertAndErrorLayer',
    suffix: () => '反馈和错误处理层，包含了反馈和错误处理的基础组件，以及反馈和错误处理的安装方法。',
    children: [
      {
        label: 'dialog',
        key: 'dialog',
        suffix: () => '弹窗组件，包含了弹窗的基础组件，以及弹窗的安装方法。'
      },
      {
        label: 'empty',
        key: 'empty',
        suffix: () => '空状态组件，包含了空状态的基础组件。'
      },
      {
        label: 'RequestError',
        key: 'RequestError',
        suffix: () => '请求错误处理，包含了请求错误处理的工具函数工具类，额外的请求成功的处理也在里面了。'
      },
      {
        label: 'Result',
        key: 'Result',
        suffix: () => '结果组件，包含了403,404页面。'
      },
      {
        label: 'skeleton',
        key: 'skeleton',
        suffix: () => '骨架屏组件，包含了骨架屏的基础组件。'
      },
      {
        label: 'AlertAndErrorLayerInstall',
        key: 'AlertAndErrorLayerInstall',
        suffix: () => '安装方法，将全部内容注册到了全局，其中empty，skeleton 注册了自定义指令'
      }
    ]
  },
  {
    label: 'api',
    key: 'api',
    suffix: () => 'api文件夹中用于存放各种接口文件，通常来说，使用我们的wingmate生成即可'
  },
  {
    label: 'assets',
    key: 'assets',
    suffix: () => '静态资源文件夹，但请只放各种图片、媒体文件其余的还是放在public中的好'
  },
  {
    label: 'components',
    key: 'components',
    suffix: () => '组件文件夹，用于存放各种基础组件，且已配置vite自动加载，使用时无需手动引入'
  },
  {
    label: 'config',
    key: 'config',
    suffix: () => '配置文件夹，用于存放各种配置内容，下方会细讲内置的一些配置'
  },
  {
    label: 'layout',
    key: 'layout',
    suffix: () => '布局文件夹，页面整体的基础布局 应当存放于此'
  },
  {
    label: 'router',
    key: 'router',
    suffix: () => '路由文件夹，用于存放路由配置文件'
  },
  {
    label: 'store',
    key: 'store',
    suffix: () => '状态管理文件夹，用于存放pinia的store文件'
  },
  {
    label: 'styles',
    key: 'styles',
    suffix: () => '全局基础样式'
  },
  {
    label: 'utils',
    key: 'utils',
    suffix: () => '工具文件夹，用于存放各种工具函数',
    children: [
      {
        label: 'workers',
        key: 'workers',
        suffix: () => 'web worker文件夹，已内置了一个http请求的web worker,可用于系统在另一个线程去做耗时，减少主线程的压力'
      },
      {
        label: 'request',
        key: 'request',
        suffix: () => 'axios 封装好的请求函数文件夹'
      }
    ]
  },
  {
    label: 'views',
    key: 'views',
    suffix: () => '页面文件夹，用于存放各种页面文件'
  }
]
</script>
<template>
  <n-scrollbar style="height: 100vh">
    <n-flex class="home" w-full h-full px-24 py-8 vertical align="center">
      <HomeTop></HomeTop>
      <n-h1 text="primary">文件目录</n-h1>
      <n-tree class="ntree w-[1000px]" :data="srcdata" default-expand-all block-line />
      <n-h1 text-primary>内置的config</n-h1>
      <n-ul align-text>
        <n-li>
          <n-space :size="[32, 0]">
            <n-h6>info</n-h6>
            <n-p>项目信息配置，为内置获取项目信息，请随时更新这里面的内容，访问请调用window.$info()，并输入config中的密钥</n-p>
          </n-space>
        </n-li>
        <n-li>
          <n-space :size="[32, 0]">
            <n-h6>iframeBus</n-h6>
            <n-p>iframe通信总线配置,配置当前项目与其他项目的iframe通信权限以及通信的所有事件，如有需求，请配置好</n-p>
          </n-space>
        </n-li>
        <n-li>
          <n-space :size="[32, 0]">
            <n-h6>safe</n-h6>
            <n-p>安全防护 前端解决和预防，若使用一些资源报错，请配置这里允许那个域名资源</n-p>
          </n-space>
        </n-li>
        <n-li>
          <n-space :size="[32, 0]">
            <n-h6>visual</n-h6>
            <n-p>可视化配置，内置了非正常浏览器情况的，移动端或者大屏的适配，如需求，请在这里配置尺寸</n-p>
          </n-space>
        </n-li>
        <n-li>
          <n-space :size="[32, 0]">
            <n-h6>mobile</n-h6>
            <n-p>移动端相关，已内置了一个移动端目前最优的测试插件，如需求，请打开</n-p>
          </n-space>
        </n-li>
      </n-ul>
    </n-flex>
  </n-scrollbar>
</template>
<style lang="less" scoped></style>
