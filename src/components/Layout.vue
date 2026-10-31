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
    <!-- 左侧边栏：深灰蓝现代品牌面 -->
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
        <RouterLink to="/book/new" class="menu-item">新增图书</RouterLink>
        <RouterLink to="/borrow" class="menu-item">借阅记录</RouterLink>
        <RouterLink to="/calendar" class="menu-item">借阅日历</RouterLink>
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

/* 侧边栏：固定宽度的深灰蓝现代品牌面（替代原刺眼深绿） */
.sidebar {
  width: 224px;
  flex-shrink: 0;
  background: var(--sidebar-bg);
  color: var(--sidebar-ink);
  display: flex;
  flex-direction: column;
}

/* 品牌区：左上对齐 */
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
  color: #f8fafc;
}
.brand-text small {
  font-size: 11px;
  opacity: 0.6;
}

/* 当前登录用户：头像 + 文字 */
.user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 20px 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.user-avatar {
  font-size: 20px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.1);
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
  color: #f8fafc;
}
.user-text small {
  font-size: 11px;
  opacity: 0.6;
}

/* 退出登录：柔和描边，悬停填充更淡（减少视觉噪音） */
.logout {
  margin: 0 16px 8px;
  padding: 9px;
  font-size: 13px;
  color: var(--sidebar-ink);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.logout:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

/* 菜单：纵向、左对齐，选中用白色圆角背景高亮 */
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
  color: var(--sidebar-ink);
  text-decoration: none;
  font-size: 15px;
  border-radius: 8px;
  transition: background 0.2s ease;
}
.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}
.menu-item.router-link-active {
  background: #ffffff;      /* 白色圆角高亮 */
  color: var(--sidebar-bg); /* 深字 */
  font-weight: 600;
}

/* 主区域：占据剩余宽度，浅灰背景 + 内边距 */
.main {
  flex: 1;
  padding: 32px 40px;
  background: var(--bg);
}
</style>