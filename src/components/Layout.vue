<script setup>
// 侧边栏布局：左侧是品牌绿色菜单区，右侧主区域渲染子页面
// 布局刻意非对称：侧边栏固定宽，内容区左上对齐，不用居中
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