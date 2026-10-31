import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 让 @ 指向 src 目录，路由里才能用 @/views/... 这种写法
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Vitest 测试配置：jsdom 模拟浏览器、全局 API、setup 前置脚本
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['src/**/*.test.js'],
  },
})