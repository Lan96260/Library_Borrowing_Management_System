import { defineStore } from 'pinia'

// 用户状态管理：模拟登录与登出
// persist: 开启持久化，状态自动同步到 localStorage，刷新后登录态保持
export const useUserStore = defineStore('user', {
  // 状态
  state: () => ({
    token: '',
    userInfo: {
      name: '',
      role: '',
    },
  }),

  // 派生状态（getters）
  getters: {
    // 是否已登录：存在 token 即视为登录
    isLoggedIn: (state) => !!state.token,
    // 当前登录用户名
    username: (state) => state.userInfo.name,
  },

  // 动作（actions）
  actions: {
    // 模拟登录：写入 token 和用户信息（持久化插件自动存盘）
    login(username) {
      this.token = 'demo-token'
      this.userInfo = { name: username, role: '管理员' }
    },

    // 登出：清空状态（持久化插件自动同步删除）
    logout() {
      this.token = ''
      this.userInfo = { name: '', role: '' }
    },
  },

  // 持久化配置：默认 key 为 store id（'user'），存 localStorage
  persist: true,
})