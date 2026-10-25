<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getBooks, addBook, updateBook, deleteBook, testError } from '@/api/book'

const router = useRouter()
const userStore = useUserStore()

// 图书列表 / 加载态
const books = ref([])
const loading = ref(false)

// 弹窗状态：是否打开、当前编辑 id（null 表示新增）、表单
const dialogOpen = ref(false)
const editingId = ref(null)
const form = ref({ title: '', author: '', status: '在馆' })

// 加载图书：调接口拿分页列表
async function loadBooks() {
  loading.value = true
  try {
    const { list } = await getBooks(1)
    books.value = list
  } finally {
    loading.value = false
  }
}

onMounted(loadBooks)

// 打开新增弹窗：清空表单
function openAdd() {
  editingId.value = null
  form.value = { title: '', author: '', status: '在馆' }
  dialogOpen.value = true
}

// 打开编辑弹窗：回填当前图书数据
function openEdit(book) {
  editingId.value = book.id
  form.value = { title: book.title, author: book.author, status: book.status }
  dialogOpen.value = true
}

// 提交：新增或编辑后刷新列表
async function submit() {
  if (!form.value.title.trim()) return
  if (editingId.value !== null) {
    await updateBook(editingId.value, form.value)
  } else {
    await addBook(form.value)
  }
  dialogOpen.value = false
  loadBooks()
}

// 删除：确认后调用接口并刷新列表
async function removeBook(book) {
  if (!confirm(`确认删除《${book.title}》？`)) return
  await deleteBook(book.id)
  loadBooks()
}

// 测试 500：调用 /api/error，由响应拦截器弹出"服务器错误"提示
async function triggerError() {
  await testError()
}

// 退出登录：清空 store 登录态，跳回登录页
function handleLogout() {
  userStore.logout()
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
      <div class="head-actions">
        <button class="test-btn" @click="triggerError">测试 500</button>
        <button class="add-btn" @click="openAdd">新增图书</button>
        <button class="logout" @click="handleLogout">退出登录</button>
      </div>
    </div>

    <!-- 加载中 -->
    <p v-if="loading" class="empty">加载中…</p>

    <!-- 空数据提示 -->
    <p v-else-if="books.length === 0" class="empty">暂无图书数据</p>

    <!-- 图书卡片列表：每本一张横排卡 -->
    <ul v-else class="book-list">
      <li v-for="book in books" :key="book.id ?? book.title" class="book-item">
        <div class="book-cover">📖</div>
        <div class="book-info">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">作者：{{ book.author }}</p>
        </div>
        <span class="book-status" :class="book.status === '在馆' ? 'in' : 'out'">
          {{ book.status }}
        </span>
        <div class="book-actions">
          <button class="link-btn" @click="openEdit(book)">编辑</button>
          <button class="link-btn danger" @click="removeBook(book)">删除</button>
        </div>
      </li>
    </ul>

    <!-- 新增 / 编辑弹窗 -->
    <div v-if="dialogOpen" class="overlay" @click.self="dialogOpen = false">
      <div class="dialog">
        <h2>{{ editingId !== null ? '编辑图书' : '新增图书' }}</h2>
        <label class="field">
          <span>书名</span>
          <input v-model="form.title" type="text" placeholder="请输入书名" />
        </label>
        <label class="field">
          <span>作者</span>
          <input v-model="form.author" type="text" placeholder="请输入作者" />
        </label>
        <label class="field">
          <span>状态</span>
          <select v-model="form.status">
            <option value="在馆">在馆</option>
            <option value="外借">外借</option>
          </select>
        </label>
        <div class="dialog-actions">
          <button class="dialog-btn" @click="dialogOpen = false">取消</button>
          <button class="dialog-btn primary" @click="submit">保存</button>
        </div>
      </div>
    </div>
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
.head-actions {
  display: flex;
  gap: 10px;
}
.add-btn {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--primary-ink);
  background: var(--primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: var(--primary-deep);
}
/* 测试 500 按钮：描边提示色，弱于主按钮 */
.test-btn {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--accent);
  background: transparent;
  border: 1px solid oklch(0.62 0.13 60 / 0.5);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.test-btn:hover {
  color: var(--primary-ink);
  background: var(--accent);
}

/* 加载中 / 空数据占位 */
.empty {
  color: var(--muted);
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
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
.book-actions {
  display: flex;
  gap: 8px;
}
.link-btn {
  padding: 4px 10px;
  font-size: 13px;
  color: var(--primary);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.link-btn:hover {
  border-color: var(--primary);
}
.link-btn.danger {
  color: var(--accent);
}
.link-btn.danger:hover {
  border-color: var(--accent);
}

/* 弹窗遮罩与面板 */
.overlay {
  position: fixed;
  inset: 0;
  background: oklch(0 0 0 / 0.4);
  display: grid;
  place-items: center;
  z-index: 10;
}
.dialog {
  width: 340px;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}
.dialog h2 {
  font-size: 18px;
  margin-bottom: 18px;
}
.field {
  display: block;
  margin-bottom: 14px;
}
.field span {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
}
.field input,
.field select {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}
.field input:focus,
.field select:focus {
  border-color: var(--primary);
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
.dialog-btn {
  padding: 9px 18px;
  font-size: 14px;
  color: var(--ink);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.dialog-btn:hover {
  border-color: var(--primary);
}
.dialog-btn.primary {
  color: var(--primary-ink);
  background: var(--primary);
  border: none;
}
.dialog-btn.primary:hover {
  background: var(--primary-deep);
}
</style>