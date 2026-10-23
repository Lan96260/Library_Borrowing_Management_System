
<script setup>
// 借阅记录：简单文本展示（后续接接口）
const records = [
  { title: '三国演义', borrow: '2026-10-01', due: '2026-10-31', state: '借阅中' },
  { title: '活着', borrow: '2026-10-15', due: '2026-11-14', state: '借阅中' },
]
</script>

<template>
  <div class="page">
    <!-- 页头：左对齐，信息型，不居中 -->
    <div class="page-head">
      <div>
        <h1>借阅记录</h1>
        <p class="page-sub">共 {{ records.length }} 条借阅记录</p>
      </div>
    </div>

    <!-- 记录卡片：每条一行 -->
    <ul class="record-list">
      <li v-for="record in records" :key="record.title" class="record-item">
        <div class="record-cover">📗</div>
        <div class="record-info">
          <h3 class="record-title">{{ record.title }}</h3>
          <p class="record-dates">
            借出 {{ record.borrow }} · 应还 {{ record.due }}
          </p>
        </div>
        <span class="record-state">借阅中</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px; /* 限制行宽，内容靠左 */
}

.page-head {
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

.record-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.record-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: box-shadow 0.2s;
}
.record-item:hover {
  box-shadow: var(--shadow);
}
.record-cover {
  font-size: 26px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--bg);
  border-radius: 8px;
  flex-shrink: 0;
}
.record-info {
  flex: 1;
}
.record-title {
  font-size: 16px;
}
.record-dates {
  color: var(--muted);
  font-size: 13px;
  margin-top: 3px;
}
.record-state {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--accent);
  background: oklch(0.62 0.13 60 / 0.14);
  flex-shrink: 0;
}
</style>