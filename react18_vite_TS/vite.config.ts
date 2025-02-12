import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    react()
  ],
   resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },
  server:{
    port: 1202
  }
})
