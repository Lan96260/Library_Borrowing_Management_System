// 认证相关接口
import request from '@/utils/request'

// 登录：传用户名，POST /api/login
export const login = (username) => request.post('/login', { username })