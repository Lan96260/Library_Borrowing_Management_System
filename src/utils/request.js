// axios 请求封装：统一 baseURL、token 注入、响应/错误处理
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 创建实例：统一前缀与超时
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器：从 user store 读 token，注入 Authorization 头
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

// 响应拦截器：按业务 code 分流
request.interceptors.response.use(
  (response) => {
    // 约定后端统一返回 { code, data, message }，code 200 视为成功
    const { code, data } = response.data
    if (code === 200) return data
    return Promise.reject(response.data)
  },
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      // 未授权：清空登录态并跳登录页
      useUserStore().logout()
      router.push('/login')
    } else if (status === 500) {
      // 服务器错误：给用户提示
      alert('服务器繁忙，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default request