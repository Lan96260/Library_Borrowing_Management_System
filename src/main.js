import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// use(router)：把路由实例注册进应用，让 <router-view> 生效
createApp(App).use(router).mount('#app')