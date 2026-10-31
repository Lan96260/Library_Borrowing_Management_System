import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'

// 仅开发环境启用 MSW：mock 接口只能在 dev 下拦截，不污染生产构建
if (import.meta.env.DEV) {
  const { setupWorker } = await import('msw/browser')
  const { handlers } = await import('@/mock/handlers')
  await setupWorker(...handlers).start()
}

const app = createApp(App)
const pinia = createPinia()

// 注册持久化插件：让开启 persist 的 store 自动同步到 localStorage
pinia.use(piniaPluginPersistedstate)

// use(router)：把路由实例注册进应用，让 <router-view> 生效
// use(pinia)：注册 Pinia 状态管理，让所有组件可通过 useStore 访问状态
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')