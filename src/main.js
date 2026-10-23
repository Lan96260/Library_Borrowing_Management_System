import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// 注册持久化插件：让开启 persist 的 store 自动同步到 localStorage
pinia.use(piniaPluginPersistedstate)

// use(router)：把路由实例注册进应用，让 <router-view> 生效
// use(pinia)：注册 Pinia 状态管理，让所有组件可通过 useStore 访问状态
app.use(pinia)
app.use(router)

app.mount('#app')