import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 让 @ 指向 src 目录，路由里才能用 @/views/... 这种写法
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})