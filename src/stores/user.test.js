import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './user'

describe('user store 登录状态', () => {
  // 每个用例前重置 pinia，隔离状态，避免用例互相影响
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始状态为未登录', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
    expect(store.username).toBe('')
    expect(store.token).toBe('')
  })

  it('login 后写入 token 与用户信息', () => {
    const store = useUserStore()
    store.login('张三')
    expect(store.isLoggedIn).toBe(true)
    expect(store.username).toBe('张三')
    expect(store.token).toBe('demo-token')
    expect(store.userInfo.role).toBe('管理员')
  })

  it('logout 清空登录状态', () => {
    const store = useUserStore()
    store.login('x')
    store.logout()
    expect(store.isLoggedIn).toBe(false)
    expect(store.username).toBe('')
  })
})