import { defineConfig, presetAttributify, presetUno,transformerDirectives } from 'unocss'
import presetWind from '@unocss/preset-wind'
export default defineConfig({
  theme:{
    colors:{
      primary:'rgb(255, 123, 32)'
    }
  },
  presets: [
    presetUno(),
    presetAttributify({ /* preset options */}),
    presetWind()
    // ...custom presets
  ],
  transformers: [
    transformerDirectives(),
  ],
})
