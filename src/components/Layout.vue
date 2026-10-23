<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 退出登录：调用 store 清空状态，跳回登录页
function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <!-- 左侧边栏：深绿品牌面 -->
    <aside class="sidebar">
      <!-- 顶部品牌区 -->
      <div class="brand">
        <span class="brand-mark">📚</span>
        <div class="brand-text">
          <strong>图书管理</strong>
          <small>Library System</small>
        </div>
      </div>

      <!-- 当前登录用户 -->
      <div class="user">
        <span class="user-avatar">👤</span>
        <div class="user-text">
          <strong>{{ userStore.username || '未登录' }}</strong>
          <small>{{ userStore.userInfo.role }}</small>
        </div>
      </div>

      <!-- 退出登录 -->
      <button class="logout" @click="handleLogout">退出登录</button>

      <!-- 菜单 -->
      <nav class="menu">
        <RouterLink to="/books" class="menu-item">图书列表</RouterLink>
        <RouterLink to="/borrow" class="menu-item">借阅记录</RouterLink>
      </nav>
    </aside>

    <!-- 右侧主区域 -->
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* 整体铺满视口，左右两栏 */
.layout {
  display: flex;
  min-height: 100vh;
}

/* 侧边栏：固定宽度的深绿品牌面 */
.sidebar {
  width: 224px;
  flex-shrink: 0;
  background: var(--primary-deep);
  color: var(--primary-ink);
  display: flex;
  flex-direction: column;
}

/* 品牌区：左上对齐，不居中 */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 20px;
}
.brand-mark {
  font-size: 24px;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.brand-text strong {
  font-size: 16px;
}
.brand-text small {
  font-size: 11px;
  opacity: 0.65;
}

/* 当前登录用户：头像 + 文字 */
.user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 20px 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid oklch(1 0 0 / 0.15);
}
.user-avatar {
  font-size: 20px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: oklch(1 0 0 / 0.1);
  border-radius: 50%;
  flex-shrink: 0;
}
.user-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.user-text strong {
  font-size: 14px;
}
.user-text small {
  font-size: 11px;
  opacity: 0.65;
}

/* 退出登录：陶土橙描边按钮 */
.logout {
  margin: 0 12px 8px;
  padding: 9px;
  font-size: 13px;
  color: var(--primary-ink);
  background: transparent;
  border: 1px solid oklch(0.62 0.13 60 / 0.55);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.logout:hover {
  color: var(--primary-deep);
  background: var(--accent);
}

/* 菜单：纵向、左对齐、整条色块高亮 */
.menu {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 4px;
}
.menu-item {
  display: block;
  padding: 11px 14px;
  color: var(--primary-ink);
  text-decoration: none;
  font-size: 15px;
  border-radius: 8px;
  transition: background 0.2s ease;
}
.menu-item:hover {
  background: oklch(1 0 0 / 0.1);
}
.menu-item.router-link-active {
  background: var(--primary-ink);
  color: var(--primary-deep);
  font-weight: 600;
}

/* 主区域：占据剩余宽度，背景浅色，左上对齐 */
.main {
  flex: 1;
  padding: 32px 40px;
}
</style>