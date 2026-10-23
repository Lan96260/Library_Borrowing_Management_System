<script setup>
import { useRouter } from 'vue-router'

// 图书列表：简单文本展示（后续接接口）
const books = [
  { title: '三国演义', author: '罗贯中', status: '在馆' },
  { title: '红楼梦', author: '曹雪芹', status: '在馆' },
  { title: '活着', author: '余华', status: '外借' },
]

const router = useRouter()

// 退出登录：删除 token，跳回登录页
function handleLogout() {
  localStorage.removeItem('library_token')
  router.push('/login')
}
</script>

<template>
  <div class="page">
    <!-- 页头：左对齐，信息型，不居中 -->
    <div class="page-head">
      <div>
        <h1>图书列表</h1>
        <p class="page-sub">共 {{ books.length }} 本图书</p>
      </div>
      <!-- 退出按钮：靠右，陶土橙描边提示色 -->
      <button class="logout" @click="handleLogout">退出登录</button>
    </div>

    <!-- 图书卡片列表：每本一张横排卡 -->
    <ul class="book-list">
      <li v-for="book in books" :key="book.title" class="book-item">
        <div class="book-cover">📖</div>
        <div class="book-info">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">作者：{{ book.author }}</p>
        </div>
        <span class="book-status" :class="book.status === '在馆' ? 'in' : 'out'">
          {{ book.status }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px; /* 限制行宽，内容靠左 */
}

/* 页头：flex，标题区与按钮分居两端 */
.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
h1 {
  font-size: 24px;
}
.page-sub {
  color: var(--muted);
  margin-top: 4px;
  font-size: 13px;
}
.logout {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--accent);
  background: transparent;
  border: 1px solid oklch(0.62 0.13 60 / 0.5);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.logout:hover {
  color: var(--primary-ink);
  background: var(--accent);
}

/* 图书卡片：横排一行，封面 + 信息 + 状态 */
.book-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.book-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: box-shadow 0.2s;
}
.book-item:hover {
  box-shadow: var(--shadow);
}
.book-cover {
  font-size: 26px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--bg);
  border-radius: 8px;
  flex-shrink: 0;
}
.book-info {
  flex: 1;
}
.book-title {
  font-size: 16px;
}
.book-author {
  color: var(--muted);
  font-size: 13px;
  margin-top: 3px;
}
.book-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  flex-shrink: 0;
}
.book-status.in {
  color: var(--primary-deep);
  background: oklch(0.5 0.13 145 / 0.12);
}
.book-status.out {
  color: var(--accent);
  background: oklch(0.62 0.13 60 / 0.14);
}
</style>