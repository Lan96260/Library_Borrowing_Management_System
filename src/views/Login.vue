<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

// 用户名输入框 / 登录中的状态
const username = ref('')
const loading = ref(false)

// 登录：调用接口拿 token/userInfo，写入 store 后跳转
async function handleLogin() {
  if (!username.value.trim()) return
  loading.value = true
  try {
    const { token, userInfo } = await login(username.value)
    userStore.token = token
    userStore.userInfo = userInfo
    router.push('/books')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- 左右分栏，非对称：左品牌面（深色渐变） + 右表单（居中） -->
  <div class="login">
    <!-- 左：品牌面，改用现代高级深色渐变 -->
    <aside class="login-aside">
      <div class="aside-inner">
        <div class="aside-brand">
          <span class="aside-mark">📚</span>
          <strong>图书借阅管理系统</strong>
        </div>
        <p class="aside-caption">
          管理馆藏图书<br />追踪每一本借出与归还
        </p>
      </div>
    </aside>

    <!-- 右：表单区，漂白背景，内容用 Flexbox 在整个右半屏水平垂直居中 -->
    <main class="login-main">
      <div class="login-form">
        <h1>登录</h1>
        <p class="form-hint">请登录后开始管理馆藏</p>

        <div class="form-row">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="请输入用户名"
          />
        </div>
        <div class="form-row">
          <label for="password">密码</label>
          <input id="password" type="password" placeholder="请输入密码" />
        </div>

        <button class="login-btn" :disabled="loading" @click="handleLogin">
          {{ loading ? '登录中…' : '模拟登录' }}
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 整页 flex 横排，左右各占一半（左侧品牌 / 右侧表单） */
.login {
  display: flex;
  min-height: 100vh;
}

/* ===== 左品牌面：现代高级深色渐变（沉稳深灰蓝渐变，替代原死板深绿） ===== */
.login-aside {
  flex: 1;
  /* 深灰蓝渐变：墨绿 → 深蓝灰，质感更现代 */
  background: linear-gradient(150deg, #0f172a 0%, #1e293b 55%, #334155 100%);
  color: var(--sidebar-ink, #e2e8f0);
  display: flex;
  align-items: flex-end; /* 品牌内容向下对齐 */
}
/* 包裹容器：调整 padding，让右下角文字不那么贴边 */
.aside-inner {
  padding: 0 56px 64px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.aside-brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.aside-mark {
  font-size: 22px;
}
.aside-brand strong {
  font-size: 18px;
  color: #f8fafc;
}
.aside-caption {
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.72;
  max-width: 24ch; /* 限制行宽，显得克制 */
}

/* ===== 右表单区：浅灰背景，整屏水平垂直居中 ===== */
.login-main {
  flex: 1;
  background: var(--bg, #f5f7fa); /* 浅灰底，衬托白色表单卡片 */
  display: flex;
  align-items: center;   /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 40px;
}
/* 白色卡片容器：承载表单，登录内容在其内居中 */
.login-form {
  width: 100%;
  max-width: 340px;
  background: var(--surface, #fff);
  padding: 36px 32px;
  border-radius: 12px;
  box-shadow: var(--shadow-card, 0 2px 12px rgba(0, 0, 0, 0.05));
}
h1 {
  font-size: 24px;
  color: var(--ink, #303133); /* 主信息加深 */
}
.form-hint {
  color: var(--muted, #909399); /* 次要说明减浅 */
  margin: 6px 0 28px;
}
.form-row {
  margin-bottom: 16px;
}
.form-row label {
  display: block;
  font-size: 13px;
  color: var(--ink, #303133);
  margin-bottom: 6px;
}
/* 输入框：加高到 44px、圆角 6px */
.form-row input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  font-size: 14px;
  color: var(--ink, #303133);
  border: 1px solid var(--border, #e4e7ed);
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-row input::placeholder {
  color: var(--muted, #909399);
}
.form-row input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px oklch(0.50 0.13 145 / 0.15);
}
/* 登录按钮：与输入框同宽同高（44px）、字体加粗、实心主色 */
.login-btn {
  width: 100%;
  height: 44px;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600; /* 加粗 */
  color: var(--primary-ink);
  background: var(--primary); /* 实心主色 */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.login-btn:hover {
  background: var(--primary-deep);
  box-shadow: 0 2px 8px oklch(0.42 0.12 145 / 0.35);
}
.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>