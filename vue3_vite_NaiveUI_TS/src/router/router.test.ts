import Home from '@/views/home.vue'
import { render, waitFor } from '@testing-library/vue'
import router from '@/router'
import { createApp } from 'vue'

test('第一个页面，是否是首页', async () => {
  const app = createApp({
    setup() {
      router.isReady().then(() => {
        setTimeout(() => {
          expect(router.currentRoute.value.path).toBe('/home')
        }, 1000)
      })
    }
  })
  app.use(router)
})
