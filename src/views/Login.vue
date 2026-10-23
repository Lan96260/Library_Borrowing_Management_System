<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟登录：写入 token，跳转到图书列表页
function handleLogin() {
  localStorage.setItem('library_token', 'demo-token')
  router.push('/books')
}
</script>

<template>
  <!-- 左右分栏，非对称：左品牌面（深绿） + 右表单 -->
  <div class="login">
    <!-- 左：品牌面，承载品牌绿与标语 -->
    <aside class="login-aside">
      <div class="aside-brand">
        <span class="aside-mark">📚</span>
        <strong>图书借阅管理系统</strong>
      </div>
      <p class="aside-caption">
        管理馆藏图书<br />追踪每一本借出与归还
      </p>
    </aside>

    <!-- 右：表单区，内容靠左、不居中 -->
    <main class="login-main">
      <div class="login-form">
        <h1>登录</h1>
        <p class="form-hint">请登录后开始管理馆藏</p>

        <div class="form-row">
          <label for="username">账号</label>
          <input id="username" type="text" placeholder="请输入账号" />
        </div>
        <div class="form-row">
          <label for="password">密码</label>
          <input id="password" type="password" placeholder="请输入密码" />
        </div>

        <button class="login-btn" @click="handleLogin">模拟登录</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 整页 flex 横排，左右各占一半，天然非对称（左侧固定绿面） */
.login {
  display: flex;
  min-height: 100vh;
}

/* 左品牌面 */
.login-aside {
  flex: 1;
  background: var(--primary-deep);
  color: var(--primary-ink);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 内容压到左下，不是居中 */
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
}
.aside-caption {
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.8;
  max-width: 24ch; /* 限制行宽，显得克制 */
}

/* 右表单区 */
.login-main {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 40px 56px;
}
.login-form {
  width: 100%;
  max-width: 340px;
}
h1 {
  font-size: 24px;
}
.form-hint {
  color: var(--muted);
  margin: 6px 0 28px;
}
.form-row {
  margin-bottom: 16px;
}
.form-row label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
}
.form-row input {
  width: 100%;
  padding: 11px 12px;
  font-size: 15px;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}
.form-row input:focus {
  border-color: var(--primary);
}
.login-btn {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  font-size: 15px;
  color: var(--primary-ink);
  background: var(--primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:hover {
  background: var(--primary-deep);
}
</style>