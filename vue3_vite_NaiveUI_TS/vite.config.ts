/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite' // 按需自动加载UI组件
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite' //按需自动加载依赖包
import VueDevTools from 'vite-plugin-vue-devtools' //开发调试器
import { compression } from 'vite-plugin-compression2'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(), // 必须在使用的vue/react等框架之前，因为使用了presetAttributify
    vue(),
    eslintPlugin({
      cache: true,
      emitWarning: false //关闭vite控制台warning
    }),
    Components({
      dts: true,
      dirs: ['src/components'], // 按需加载的文件夹
      resolvers: [NaiveUiResolver()] // NaiveUi按需自动加载
    }),
    //需要按需自动引入的依赖包
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/config/install': ['iframeBus']
        }
      ],
      dirs: ['src/components/**'],
      dts: true
    }),
    //超过10kb的文件进行Gzip压缩
    compression({
      threshold: 10240
    }),
    // 开发调试器（虽然目前仅支持vue3 ）
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': `${__dirname}/src`
    }
  },
  server: {
    host: true,
    port: 7004,
    open: false,
    cors: true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 根据/进行分割
            const modulesSplitList = id.toString().split('/')
            // 寻找index.js位置,并进行按位操作，转换为真实可用坐标（  -1 >>> 0 === 4294967295 ）
            const index = modulesSplitList.reverse().indexOf('node_modules') >>> 0
            return modulesSplitList[index - 1] || null
          }
        }
      }
    }
  }
})
