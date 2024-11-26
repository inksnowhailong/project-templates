import { defineConfig } from "vite";
import postcssConfig from './postcss.config'
import uni from "@dcloudio/vite-plugin-uni";
import uvtw from '@uni-helper/vite-plugin-uni-tailwind'
import AutoImport from 'unplugin-auto-import/vite' //按需自动加载依赖包

// https://vitejs.dev/config/
export default defineConfig((env)=>{
  console.log(JSON.stringify(env));

 return  {
    css: {
      postcss: postcssConfig,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 修改api调用方式
        },
      },
    },
    plugins: [
      uni(),
      uvtw(),
       //需要按需自动引入的依赖包
       AutoImport({
        imports: [
          'vue',
          'pinia',

        ],
        dirs: ['src/components/**'],
        dts: true
      }),
    ],
  }
});

